const FlatEMBLData = require('../utils/flatEmbl-ebi');
const requestUtils = require('../utils/request')

module.exports = {  
  async startEMBL(query, socket) {
    try {
      const url = `https://www.ebi.ac.uk/arrayexpress/json/v3/experiments?assaycount=1&keywords=${query}`;
      const data = await requestUtils.makeRequest(url);
      let results = [];
      if (data && data.experiments && data.experiments.total > 0) {
      socket.emit('totalresultsarrayexpress', data.experiments.total);
        results = await FlatEMBLData.generateEMBLDataset(data.experiments)
      }
      socket.emit('sendarrayexpress', results);
      socket.emit('finisharrayexpress', {status: true});  
    } catch (error) {
      
    }
    
  }
}