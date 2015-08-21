/**
 * Created by Justin on 8/20/2015.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    require('../models/user.server.model');
    return db;
}