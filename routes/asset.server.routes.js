/**
 * Created by Justin on 8/22/2015.
 */

var assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller'),
    properties = require('../controllers/assets/property.server.controller');

module.exports = function(app) {
    app.route('/api/assets')
        .get(assets.list);
//        .post(users.requiresLogin, properties.validateSave, assets.create/*, properties.create*/);
//    app.route('/api/assets/property')
//        .get(properties.list);
//    app.route('/api/assets/property/:propertyId')
//        .get(properties.read);
//    app.route('/api/assets/deal')
//        .get(deals.list);
//    app.route('/api/assets/property/create')
//        .get(assets.list)
//        .post(users.requiresLogin, assets.validateSave, properties.validateSave, assets.create, properties.create);
//    app.route('/api/assets/:assetId/property')
//        .get(assets.list)
//        .post(users.requiresLogin, assets.create, properties.create);
    //app.param('assetId', assets.assetById);
//    app.param('propertyId', properties.propertyById);
};