/**
 * Created by Justin on 9/19/2015.
 */
var Activity = require('mongoose').model('Activity'),
    Financial = require('mongoose').model('Financial'),
    Asset = require('mongoose').model('Asset'),
    mongoose = require('mongoose');


var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Something already exists';
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
    var financial = new Financial(req.body);
    financial.activity = req.body.activity;

    financial.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            req.financial = financial;
            next();
            //financial.activity = req.body.activity;
            //financial.activity.artifact = req.body.activity.artifact;
            //res.json(financial);
        }
    });
};

exports.read = function(req, res){
    res.json(req.financial);
};

exports.update = function(req, res) {
    var financial = req.financial;
    financial.statements = req.body.statements;
    //financial.activity.asset = req.body.activity.asset;

    financial.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err),
                financial: financial
            });
        } else {
            res.json(financial);
        }
    });
};

exports.financialById = function(req, res, next) {

    var qActivity = req.activity;

    Financial.findOne()
        //.populate('createdUser', 'firstName lastName')
        //.populate('activity')
        .where('activity').equals(qActivity)
        .deepPopulate('activity activity.artifact activity.asset')
        .exec(function(err, financial){
            if(err) return next(err);
            if(!financial) return next(new Error('Failed to load asset ' + qActivity._id));
            req.financial = financial;

            //req.financial.activity = req.activity;
            //res.json(property);
            next();
        });
};

exports.validateSave = function(req, res, next) {
    var financial = new Financial(req.body);

    financial.validate(function(err){
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
    Financial.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
        .populate('activity')
        .exec(function(err, financials){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(financials);
            }
        });
};

exports.listActuals = function(req, res) {
    Financial.find()
        .sort('-created')
        //.populate('createdUser', 'firstName lastName')
        //.populate('activity', 'artifact activityTypeCode')
        .deepPopulate('activity activity.artifact activity.asset')
        .where('activity').in(req.activities)
        .exec(function(err, financials){
            if(err){
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(financials);
            }
        });
};

exports.listBudgets = function(req, res) {
    Financial.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
        .populate('activity')
        .where('activity').in(req.activities)
        .exec(function(err, financials){
            if(err){
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(financials);
            }
        });
};

exports.listForecasts = function(req, res) {
    Financial.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
        .populate('activity')
        .where('activity').in(req.activities)
        .exec(function(err, financials){
            if(err){
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(financials);
            }
        });
};