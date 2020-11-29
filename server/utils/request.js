const axios = require("axios").default;
const uniq = require("lodash/uniq");
const compact = require("lodash/compact");
const regex_hg = /hg[0-9][0-9]/gm;
const regex_grch = /grch[0-9][0-9]/gm;
const regex_grcm = /grcm[0-9][0-9]/gm;

async function makeRequest(url) {
  return await axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {});
}
async function obtainGenome(sample, type) {
  let url = "";
  let genome = [];
  if (type === "ncbi") {
    url = `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${sample.accession}`;
  } else {
    url = `https://www.ebi.ac.uk/arrayexpress/json/v3/experiments/${sample}/files/`;
  }
  const data = await makeRequest(url);
  let information = data;
  if (type === "array") {
    information = await makeRequest(data.files.experiment.file[0].url);
  }

  const hg = information.match(regex_hg);
  const grch = information.match(regex_grch);
  const grcm = information.match(regex_grcm);
  if (hg) {
    genome = genome.concat(hg);
  }
  if (grch) {
    genome = genome.concat(grch);
  }
  if (grcm) {
    genome = genome.concat(grcm);
  }
  genome = compact(genome);
  genome = uniq(genome);
  return genome;
}

async function mapRequest(samples, type) {
  const pendingUrls = [];
  let urls = samples;
  const limit = 100;
  let genome = "";
  if (type === "array") {
    urls = [samples];
  }
  while (urls.length) {
    const result = await Promise.allSettled(
      urls.splice(0, limit).map(async (sample) => {
        return await obtainGenome(sample, type);
      })
    );
    genome = result[0].value;
  }
  return genome;
}

export { makeRequest, mapRequest };
