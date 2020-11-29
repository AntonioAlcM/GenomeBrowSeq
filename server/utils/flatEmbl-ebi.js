const requestUtils = require('../utils/request')

class FlatEMBLData {
  static async generateEMBLDataset(data) {
    const arrayDocuments = [];
    const experiments = data.experiment;
    for (let i = 0, len = experiments.length; i < len; i += 1) {
      const url = `https://www.ebi.ac.uk/arrayexpress/json/v3/experiments/${experiments[i]["accession"]}/samples/`
      const samples = await requestUtils.makeRequest(url);
      const document = {
        'id': experiments[i]['id'] || 'Information not available',
        'accession': experiments[i]['accession'] || 'Information not available',
        'name': experiments[i].name || 'Information not available',
        'releasedate': experiments[i].releasedate || 'Information not available',
        'description': experiments[i].description[0].text || 'Information not available',
        'bd': 'arrayexpress',
        'url': `https://www.ebi.ac.uk/arrayexpress/json/v3/experiments/${experiments[i]["accession"]}/samples/`,
        'species': experiments[i].organism[0] || 'Information not available',
        'experiment_type': experiments[i].experimenttype || 'Information not available',
        'n_samples': experiments[i].samplecharacteristic.length || 'Information not available',
        'samples': samples.experiment.sample || 'Information not available',
        'raw_data': experiments[i] || 'Information not available',
        /* 'genome': await requestUtils.mapRequest(experiments[i]["accession"], 'array') */
      };
      arrayDocuments.push(document);
    }
    return arrayDocuments;
  }
}
module.exports = FlatEMBLData;
