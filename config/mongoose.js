/**
 * Created by Justin on 8/20/2015.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    //db._maxListeners = 200;
    require('../models/user.server.model');
    require('../models/artifact.server.model');
    require('../models/asset.server.model');
    require('../models/activity.server.model');
    require('../models/assets/property.server.model');
    require('../models/assets/deal.server.model');
    return db;
};