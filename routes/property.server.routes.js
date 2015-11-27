/**
 * Created by Justin on 8/29/2015.
 */
/*
var artifacts = require('../controllers/artifact.server.controller'),
    assets = require('../controllers/asset.server.controller'),
    users = require('../controllers/users.server.controller'),
    properties = require('../controllers/assets/property.server.controller');

module.exports = function(app) {
    app.route('/api/assets/property')
        .get(properties.list)
        .post(users.requiresLogin, artifacts.validateSaveAsset, assets.validateSaveAsset, properties.validateSave, artifacts.createAsset, assets.create, properties.create, properties.propertyById, properties.read);
    app.route('/api/assets/property/:artifactId')
        .get(assets.assetById, properties.propertyById, properties.read)
        .put(users.requiresLogin, assets.assetById, properties.propertyById, properties.validateSave, properties.update);
    app.route('/api/assets/property/create')
        .get(assets.list)
        .post(users.requiresLogin, artifacts.validateSaveAsset, assets.validateSaveAsset, properties.validateSave, artifacts.createAsset, assets.create, properties.create, properties.propertyById, properties.read);
    app.param('artifactId', artifacts.artifactById);
};*/