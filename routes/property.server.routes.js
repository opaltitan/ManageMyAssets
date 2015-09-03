/**
 * Created by Justin on 8/29/2015.
 */
var assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller'),
    properties = require('../controllers/assets/property.server.controller');

module.exports = function(app) {
    app.route('/api/assets/property')
        .get(properties.list)
        .post(users.requiresLogin, assets.validateSave, properties.validateSave, assets.create, properties.create);
    app.route('/api/assets/property/:propertyId')
        .get(properties.read)
        .put(users.requiresLogin, properties.validateSave, properties.update);
    app.route('/api/assets/property/create')
        .get(assets.list)
        .post(users.requiresLogin, assets.validateSave, properties.validateSave, assets.create, properties.create);
    app.param('propertyId', properties.propertyById);
};