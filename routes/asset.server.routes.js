/**
 * Created by Justin on 8/22/2015.
 */

var artifacts = require('../controllers/artifact.server.controller'),
    //activities = require('../controllers/activity.server.controller'),
    assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/api/assets')
        .get(assets.list)
        .post(users.requiresLogin, artifacts.validateSaveAsset, assets.validateSaveAsset, artifacts.createAsset, assets.create, assets.assetById, assets.read);
    app.route('/api/assets/property')
        .get(assets.listProperties);
    app.route('/api/assets/property/:artifactId')
        .get(assets.assetById, assets.read)
        .put(users.requiresLogin, assets.assetById, assets.validateSaveAsset, assets.update);
    app.route('/api/assets/deal')
        .get(assets.listDeals);
    app.route('/api/assets/deal/:artifactId')
        .get(assets.assetById, assets.read)
        .put(users.requiresLogin, assets.assetById, assets.validateSaveAsset, assets.update);
    app.param('artifactId', artifacts.artifactById);
};