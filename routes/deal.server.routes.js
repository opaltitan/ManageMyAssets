/**
 * Created by Justin on 9/5/2015.
 */
var assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller'),
    deals = require('../controllers/assets/deal.server.controller');

module.exports = function(app) {
    app.route('/api/assets/deal')
        .get(deals.list)
        .post(users.requiresLogin, assets.validateSave, deals.validateSave, assets.create, deals.create);
    app.route('/api/assets/deal/:assetId')
        .get(deals.dealById, deals.read)
        .put(users.requiresLogin, deals.dealById, deals.validateSave, deals.update);
    app.route('/api/assets/deal/create')
        .get(assets.list)
        .post(users.requiresLogin, assets.validateSave, deals.validateSave, assets.create, deals.create);
    app.param('assetId', assets.assetById);
};