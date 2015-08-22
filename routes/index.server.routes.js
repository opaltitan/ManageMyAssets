/**
 * Created by Justin on 8/22/2015.
 */

module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};