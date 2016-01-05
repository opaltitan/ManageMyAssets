/**
 * Created by Justin on 10/14/2015.
 */
var Artifact = require('mongoose').model('Artifact');

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

// Creates an artifact record for an asset.
exports.createAsset = function(req, res, next){
    var artifact = new Artifact(req.body.artifact);
    artifact.createdUser = req.user;

    artifact.save(function(err){
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            //res.json(asset);
            req.artifact = artifact;
            req.body.artifact = artifact;
            next();
        }
    });
};

// Creates an artifact record for an activity.
exports.createActivity = function(req, res, next){
    var artifact = new Artifact(req.body.artifact);
    artifact.createdUser = req.user;

    artifact.save(function(err){
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            //res.json(asset);
            req.body.artifact = artifact;
            next();
        }
    });
};

// Responds with a list of all artifacts.
exports.list = function(req, res) {

    Artifact.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
        .exec(function(err, artifacts){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(artifacts);
            }
        });
};

// Finds the artifact record for the passed id and sets req.artifact equal to the record.
// This is used by the asset and activity procedures to find the associated asset and activity records.
exports.artifactById = function(req, res, next, id) {
    console.log('Artifact Id: ' + id);
    Artifact.findById(id)
        .populate('createdUser', 'firstName lastName')
        //.populate('members._id', 'firstName lastName')
        .exec(function(err, artifact){
            if(err) return next(err);
            if(!artifact) return next(new Error('Failed to load artifact ' + id));
            req.artifact = artifact;
            next();
        });
};

// Updates the artifact record (never called).
exports.update = function(req, res) {
    var artifact = req.artifact;
    artifact.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(artifact);
        }
    });
};

// Deletes the artifact record (never used)
exports.delete = function(req, res){
    var artifact = req.artifact;
    artifact.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(artifact);
        }
    });
};

// Validates that the artifact can be saved for an asset.
exports.validateSaveAsset = function(req, res, next) {
    console.log('req.body.artifact.artifactTypeCode ' + req.body.artifact.artifactTypeCode);
    console.log('req.body.artifact.subArtifactTypeCode' + req.body.artifact.subArtifactTypeCode);
    //console.log('req.artifact.artifactTypeCode' + req.artifact.artifactTypeCode);
    //console.log('req.asset.artifact.artifactTypeCode' + req.asset.artifact.artifactTypeCode);
    //console.log('req.body.asset.artifact.artifactTypeCode' + req.body.asset.artifact.artifactTypeCode);
    var artifact = new Artifact(req.body.artifact);
    //artifact.artifactTypeCode = req.body.artifact.artifactTypeCode;
    //artifact.subArtifactTypeCode = req.body.artifact.subArtifactTypeCode;

    artifact.validate(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            next();
        }
    });
};

// Validates that the artifact can be saved for an activity.
exports.validateSaveActivity = function(req, res, next) {
    var artifact = new Artifact(req.body.artifact);
    console.log('artifact_beforeValidate ' + artifact.artifactTypeCode);

    artifact.validate(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log('artifact_afterValidate ' + artifact.artifactTypeCode);
            next();
        }
    });
};