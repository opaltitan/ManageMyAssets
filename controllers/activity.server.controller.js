/**
 * Created by Justin on 9/19/2015.
 */
var Activity = require('mongoose').model('Activity'),
    mongoose = require('mongoose'),
    LineItem = mongoose.model('LineItem');

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
    var activity = new Activity(req.body);
    activity.artifact = req.body.artifact;
    //activity.asset = mongoose.Types.ObjectId(req.body.activity.asset._id);
    activity.asset = mongoose.Types.ObjectId(req.body.asset);
    activity.createdUser = req.user;

    activity.save(function(err){
        if(err) {
            console.log(err.toString());
            console.log(getErrorMessage(err));
            return res.status(400).send({
                message: getErrorMessage(err),
                activity: activity
            });
        } else {
            //res.json(asset);
            res.json(activity);
            //req.body.activity = activity;
            //req.activity = activity;
            //next();
        }
    });
};
/*
exports.list = function(req, res) {

    Activity.find()
        .sort('-created')
        .populate('createdUser', 'firstName lastName')
        //.populate('asset')
        .exec(function(err, activities){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(activities);
            }
        });
};
*/

exports.financialLineItemEnums = function(req, res, next){
    var lineItemEnums = LineItem.schema.path('lineItemCode').enumValues;
    var lineItems = new Array();
    //lineItemEnums.forEach(function(item){ console.log(item); });

    lineItemEnums.forEach(
        function(item){
            lineItems.push(
                {
                    lineItemCode: item,
                    lineItemAmount: 0
                }
            )
        });

    req.lineItems = lineItems;
    next();
    //res.json(req.lineItems);
};

exports.readLineItems = function(req, res){
    res.json(req.lineItems);
};

exports.populateEmptyLineItems = function(req, res, next){
    var lineItems = req.lineItems;
    var statements = req.activity.activityDetails.financial.statements;
    var statementLineItems;
    var bln;

    statements.forEach(function(itemStatement){
        statementLineItems = itemStatement.statementLineItems;
        lineItems.forEach(function(itemLineItemEnum){
            bln = false;
            statementLineItems.forEach(function(itemStatementLineItem){
                if(itemStatementLineItem.lineItemCode==itemLineItemEnum.lineItemCode){
                    bln = true;
                }
            });
            if(!bln){
                statementLineItems.push(itemLineItemEnum);
            }
        });
    });

    next();

};


exports.activityById = function(req, res, next) {
    var qArtifact = req.artifact;

    Activity.findOne()
        .populate('createdUser', 'firstName lastName')
        .populate('artifact')
        //.populate('asset')
        .deepPopulate('asset artifact')
        .where('artifact').equals(qArtifact)
        //.populate('members._id', 'firstName lastName')
        .exec(function(err, activity){
            if(err) return next(err);
            if(!activity) return next(new Error('Failed to load asset ' + id));
            req.activity = activity;

            next();
        });
};

exports.read = function(req, res){
    res.json(req.activity);
};

exports.update = function(req, res) {
    var activity = req.activity;
    activity.activityDetails = req.body.activityDetails;

    activity.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(activity);
        }
    });
};

exports.delete = function(req, res){
    var activity = req.activity;
    activity.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(activity);
        }
    });
};

exports.validateSave = function(req, res, next) {
    var activity = new Activity(req.body);
    //activity.artifact = req.body.activity.artifact;
    activity.asset = mongoose.Types.ObjectId(req.body.asset._id);
    activity.createdUser = req.user;

    activity.validate(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            next();
        }
    });
};

exports.listActuals = function(req, res, next) {
    Activity.find()
        .sort('-created')
        //.populate('createdUser', 'firstName lastName')
        .deepPopulate('asset artifact')
        .where('activityTypeCode').equals('Actuals')
        .exec(function(err, activities){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(activities);
                //req.activities = activities;
                //next();
            }
        });
};

exports.listBudgets = function(req, res, next) {
    Activity.find()
        .sort('-created')
        //.populate('createdUser', 'firstName lastName')
        .deepPopulate('asset artifact')
        .where('activityTypeCode').equals('Budget')
        .exec(function(err, activities){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(activities);
                //req.activities = activities;
                //next();
            }
        });
};

exports.listForecasts = function(req, res, next) {
    Activity.find()
        .sort('-created')
        //.populate('createdUser', 'firstName lastName')
        .deepPopulate('asset artifact')
        .where('activityTypeCode').equals('Forecast')
        .exec(function(err, activities){
            if(err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(activities);
                //req.activities = activities;
                //next();
            }
        });
};