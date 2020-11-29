var express = require('express');
var router = express.Router();
const ncbiController = require('../controller/ncbi')

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Api for access whois database ' });
}); */
router.get('/ncbi/:query', ncbiController.getInformation);

module.exports = router;