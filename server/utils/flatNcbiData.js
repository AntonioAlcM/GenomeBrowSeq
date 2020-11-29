const requestUtils = require('../utils/request')
class FlatNcbiData {
  static async generateNcbiDataset(data) {
    const arrayDocuments = [];
    const keys = Object.keys(data.result);
    for (let i = 0, len = keys.length; i < len; i += 1) {
      if (keys[i] !== "uids") {
        const document = {
          id: data.result[keys[i]]["uid"] || 'Information not available',
          accession: data.result[keys[i]]["accession"] || 'Information not available',
          name: data.result[keys[i]]["title"] || 'Information not available',
          releasedate: data.result[keys[i]]["pdat"] || 'Information not available',
          description: data.result[keys[i]]["summary"] || 'Information not available',
          bd: "NCBI",
          url: data.result[keys[i]]["ftplink"],
          species: data.result[keys[i]]["taxon"] || 'Information not available',
          experiment_type: data.result[keys[i]]["gdstype"] || 'Information not available',
          n_samples: data.result[keys[i]]["n_samples"] || 'Information not available',
          samples: data.result[keys[i]]["samples"] || 'Information not available',
          raw_data: data.result[keys[i]] || 'Information not available',
          /* 'genome': await requestUtils.mapRequest(data.result[keys[i]]["samples"], 'ncbi') */
        };
        arrayDocuments.push(document);
      }
    }
    return arrayDocuments;
  }
}
module.exports = FlatNcbiData;
