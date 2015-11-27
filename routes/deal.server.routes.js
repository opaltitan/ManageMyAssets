/**
 * Created by Justin on 9/5/2015.
 */
var artifacts = require('../controllers/artifact.server.controller'),
    assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller'),
    deals = require('../controllers/assets/deal.server.controller');

module.exports = function(app) {
    app.route('/api/assets/deal')
        .get(deals.list)
        .post(users.requiresLogin, artifacts.validateSaveAsset, assets.validateSaveAsset, deals.validateSave, artifacts.createAsset, assets.create, deals.create, deals.dealById, deals.read);
    app.route('/api/assets/deal/:artifactId')
        .get(assets.assetById, deals.dealById, deals.read)
        .put(users.requiresLogin, assets.assetById, deals.dealById, deals.validateSave, deals.update);
    app.route('/api/assets/deal/create')
        .get(assets.list)
        .post(users.requiresLogin, artifacts.validateSaveAsset, assets.validateSaveAsset, deals.validateSave, artifacts.createAsset, assets.create, deals.create, deals.dealById, deals.read);
    app.param('artifactId', artifacts.artifactById);
};