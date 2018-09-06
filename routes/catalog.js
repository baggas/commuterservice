var express = require('express');
var router = express.Router();

// Require controller modules.
var IFServiceController = require('../controllers/IFServiceController');
var ItemController = require('../controllers/ItemController');

/// IFService ROUTES ///
router.get('/IFService', IFServiceController.service_detail)


/// Item ROUTES ///
// GET request for list of all items.
router.get('/Item', ItemController.item_list);


module.exports = router;