/**
 * Created by Justin on 8/22/2015.
 */

var assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller');;

module.exports = function(app) {
    app.route('/api/assets')
        .get(assets.list)
        .post(users.requiresLogin, assets.create);
};