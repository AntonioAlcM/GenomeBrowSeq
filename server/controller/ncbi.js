const FlatNcbiData = require("../utils/flatNcbiData");
const requestUtils = require("../utils/request");

async function generatePromise(url, socket) {
  let failsUrl = "notUrl";
  let result = {};
  let element = "";
  try {
    result = await requestUtils.makeRequest(url);
    if (result) {
      element = await FlatNcbiData.generateNcbiDataset(result);
      socket.emit("sendncbi", element);
    } else {
      failsUrl = url;
    }
  } catch (error) {
    failsUrl = url;
  }

  return failsUrl;
}

async function executeRequest(urls, socket) {
  const pendingUrls = [];
  const limit = 2;
  while (urls.length) {
    const failrequest = await Promise.allSettled(
      urls.splice(0, limit).map(async (url) => {
        return await generatePromise(url, socket);
      })
    );
    if (failrequest.length > 0) {
      for (let i = 0, len = failrequest.length; i < len; i += 1) {
        if (failrequest[i].value && failrequest[i].value !== "notUrl") {
          pendingUrls.push(failrequest[i].value);
        }
      }
    }
  }
  if (pendingUrls.length > 0) {
    await executeRequest(pendingUrls, socket);
  }
  return urls;
}
async function getInformationCache(numberOfResults, webenv, socket) {
  const numberOfRequest = 500;
  const urls = [];
  const numOfTry = 5;
  for (let i = 0; i < numberOfResults / numberOfRequest; i += 1) {
    const startIndex = i * numberOfRequest;
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gds&query_key=1&WebEnv=${webenv}&retstart=${startIndex}&retmax=${numberOfRequest}&rettype=json&retmode=json`;
    urls.push(url);
  }
  await executeRequest(urls, socket);
}
module.exports = {
  async startNCBI(query, socket) {
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gds&term=${query}&datetype=edat&retmax=10000000&usehistory=y&retmode=json`;
    const data = await requestUtils.makeRequest(url);
    if (data && data.esearchresult && !data.esearchresult["ERROR"]) {
      socket.emit("totalresultsncbi", data.esearchresult.count);
      await getInformationCache(
        data.esearchresult.count,
        data.esearchresult.webenv,
        socket
      );
    }
    socket.emit("finishncbi", { status: true });
  },
};
