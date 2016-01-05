/**
 * Created by Justin on 8/22/2015.
 */

var artifacts = require('../controllers/artifact.server.controller'),
    //activities = require('../controllers/activity.server.controller'),
    assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller');

module.exports = function(app) {

    app.route('/api/assets')
        // Returns a list of all assets
        .get(assets.list)
        // Creates a new asset (used by Property and Deal)
        .post(users.requiresLogin, artifacts.validateSaveAsset, assets.validateSaveAsset, artifacts.createAsset, assets.create, assets.assetById, assets.read);

    app.route('/api/assets/property')
        // Returns a list of all Property assets
        .get(assets.listProperties);

    app.route('/api/assets/property/:artifactId')
        // Returns the specified asset
        .get(assets.assetById, assets.read)
        // Updates the asset record specified
        .put(users.requiresLogin, assets.assetById, assets.validateSaveAsset, assets.update);

    app.route('/api/assets/deal')
        // Returns a list of all Deal assets
        .get(assets.listDeals);

    app.route('/api/assets/deal/:artifactId')
        // Returns the specified asset
        .get(assets.assetById, assets.read)
        // Updates the asset record specified
        .put(users.requiresLogin, assets.assetById, assets.validateSaveAsset, assets.update);

    app.param('artifactId', artifacts.artifactById);
};