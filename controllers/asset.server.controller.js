/**
 * Created by Justin on 8/21/2015.
 */
var Asset = require('mongoose').model('Asset'),
    Artifact = require('mongoose').model('Artifact');

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'An error occurred.';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for(var errName in err.errors){
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

// Creates a new asset.
// Uses the artifact id created in the previous step for the DbRef
exports.create = function(req, res, next){
    var asset = new Asset(req.body);
    asset.artifact = req.body.artifact;
    asset.createdUser = req.user;

    asset.save(function(err){
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            //res.json(asset);
            req.body.asset = asset;
            req.asset = asset;
            next();
        }
    });
};

// Responds with the list of all assets (never used).
exports.list = function(req, res) {

    Asset.find()
        .sort('-created')
        .populate('artifact createdUser')
        .exec(function(err, assets){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(assets);
            }
        });
};

// Responds with the list of all assets of type 'Property'
exports.listProperties = function(req, res) {
    Asset.find()
        .sort('-created')
        .where('assetTypeCode').equals('Property')
        .populate('artifact createdUser')
        .exec(function(err, assets){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(assets);
            }
        });
};

// Responds with the list of all assets of type 'Deal'
exports.listDeals = function(req, res) {
    Asset.find()
        .sort('-created')
        .where('assetTypeCode').equals('Deal')
        .populate('artifact createdUser')
        .exec(function(err, assets){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(assets);
            }
        });
};

// Responds with the selected asset record.
exports.read = function(req, res){
    res.json(req.asset);
};

// Finds the asset record using the artifact id
exports.assetById = function(req, res, next) {
    var qArtifact = req.artifact;

    Asset.findOne()
        //.populate('createdUser', 'firstName lastName')
        //.populate('artifact')
        .deepPopulate('artifact createdUser')
        .where('artifact').equals(qArtifact)
        .exec(function(err, asset){
            if(err) return next(err);
            if(!asset) return next(new Error('Failed to load artifact' + qArtifact._id));
            req.asset = asset;
            next();
        });
};

// Updates the selected asset record.
exports.update = function(req, res) {
    var asset = req.asset;
    asset.assetDetails = req.body.assetDetails;

    //var property = req.property;
    //property.propertyName = req.body.propertyName;
    //property.propertyAddressStreet = req.body.propertyAddressStreet;
    //property.propertyAddressCity = req.body.propertyAddressCity;
    //property.propertyAddressState = req.body.propertyAddressState;
    //property.propertyAddressZip = req.body.propertyAddressZip;

    //property.save(function(err){

    asset.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(asset);
        }
    });
};

// Deletes the selected asset record.
exports.delete = function(req, res){
    var asset = req.asset;
    asset.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(asset);
        }
    });
};

// Validates that the asset data can be saved. (Old, not used anymore)
exports.validateSaveAsset = function(req, res, next) {
    var asset = new Asset(req.body);
    asset.artifact = req.body.artifact;

    //console.log('asset.artifact._id' + asset.artifact.artifactTypeCode);
    asset.validate(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            next();
        }
    });
};

// Validates that...this isn't actually used anymore.
exports.validateSaveActivity = function(req, res, next) {
    var asset = new Asset(req.body.activity.asset);

    asset.validate(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            next();
        }
    });
};
