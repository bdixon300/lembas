var express = require('express');
var router = express.Router();

var searchBar_Controller = require('../controller/searchBarController');

router.get('/', searchBar_Controller.searchBar);
router.get('/URI', searchBar_Controller.searchURI);

module.exports = router;
