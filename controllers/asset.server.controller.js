/**
 * Created by Justin on 8/21/2015.
 */
var Asset = require('mongoose').model('Asset');

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


exports.create = function(req, res, next){
    var asset = new Asset(req.body.asset);
    asset.createdUser = req.user;

    asset.save(function(err){
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            //res.json(asset);
            req.body.asset = asset;
            next();
        }
    });
};

exports.list = function(req, res) {

    Asset.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
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

exports.assetById = function(req, res, next, id) {
    Asset.findById(id)
        .populate('createdUser', 'firstName lastName')
        //.populate('members._id', 'firstName lastName')
        .exec(function(err, asset){
            if(err) return next(err);
            if(!asset) return next(new Error('Failed to load asset ' + id));
            req.asset = asset;
            next();
        });
};

exports.update = function(req, res) {
    var asset = req.asset;
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

exports.validateSave = function(req, res, next) {
    var asset = new Asset(req.body.asset);

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