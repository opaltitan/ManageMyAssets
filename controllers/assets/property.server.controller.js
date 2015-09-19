/**
 * Created by Justin on 8/26/2015.
 */
var Asset = require('mongoose').model('Asset'),
    Property = require('mongoose').model('Property'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Property name already exists';
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

exports.create = function(req, res) {
    var property = new Property(req.body);
    property.asset = req.body.asset._id;

    property.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(property);
        }
    });
};

exports.read = function(req, res){
    res.json(req.property);
};

exports.update = function(req, res) {
    var property = req.property;
    property.propertyName = req.body.propertyName;
    property.propertyAddressStreet = req.body.propertyAddressStreet;
    property.propertyAddressCity = req.body.propertyAddressCity;
    property.propertyAddressState = req.body.propertyAddressState;
    property.propertyAddressZip = req.body.propertyAddressZip;

    property.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(property);
        }
    });
};

exports.propertyById = function(req, res, next) {
    var qAsset = req.asset;

    Property.findOne()
        .populate('createdUser', 'firstName lastName')
        .populate('asset')
        .where('asset').equals(qAsset)
        .exec(function(err, property){
            if(err) return next(err);
            if(!property) return next(new Error('Failed to load asset ' + qAsset._id));
            req.property = property;

            //res.json(property);
            next();
        });
  /*
    Property.findById(id)
        .populate('createdUser', 'firstName lastName')
        .populate('asset')
        //.populate('members._id', 'firstName lastName')
        .exec(function(err, property){
            if(err) return next(err);
            if(!property) return next(new Error('Failed to load asset ' + id));
            req.property = property;
            next();
        });
*/
};

exports.validateSave = function(req, res, next) {
    var property = new Property(req.body);

    property.validate(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            next();
        }
    });
};

exports.list = function(req, res) {
    Property.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
        .populate('asset', 'assetTypeCode')
        .exec(function(err, properties){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(properties);
            }
        });
};


