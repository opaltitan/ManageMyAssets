/**
 * Created by Justin on 8/29/2015.
 */
var Asset = require('mongoose').model('Asset'),
    Property = require('mongoose').model('Property'),
    Deal = require('mongoose').model('Deal');

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Deal name already exists';
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


exports.create = function(req, res, next) {
    var deal = new Deal(req.body);
    deal.asset = req.body.asset._id;

    deal.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            req.deal = deal;
            next();
            //res.json(deal);
        }
    });
};

exports.read = function(req, res){
    res.json(req.deal);
};

exports.update = function(req, res) {
    var deal = req.deal;
    deal.dealTypeCode = req.body.dealTypeCode;
    deal.dealName = req.body.dealName;
    deal.properties = req.body.properties;

    deal.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(deal);
        }
    });
};

exports.dealById = function(req, res, next) {

    var qAsset = req.asset;

    Deal.findOne()
        .populate('createdUser', 'firstName lastName')
        .populate('asset')
        .where('asset').equals(qAsset)
        .exec(function(err, deal){
            if(err) return next(err);
            if(!deal) return next(new Error('Failed to load asset ' + qAsset._id));
            req.deal = deal;
            next();
        });

/*
    Deal.findById(id)
        .populate('createdUser', 'firstName lastName')
        .populate('asset')
        //.populate('members._id', 'firstName lastName')
        .exec(function(err, deal){
            if(err) return next(err);
            if(!deal) return next(new Error('Failed to load asset ' + id));
            req.deal = deal;
            next();
        });*/
};

exports.validateSave = function(req, res, next) {
    var deal = new Deal(req.body);

    deal.validate(function(err){
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
    Deal.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
        .populate('asset')
        .exec(function(err, deals){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(deals);
            }
        });
};