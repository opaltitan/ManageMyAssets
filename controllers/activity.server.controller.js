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

// Creates a new activity
exports.create = function(req, res, next){

    try {

        var activity = new Activity(req.body);
        activity.artifact = req.body.artifact;

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
                res.json(activity);
            }
        });

    } catch(e){
        console.log('error occurred here.');
        return res.status(400).send({
            message: 'An error occurred when saving'
        });
    }

};

// Outputs all possible line item enumerations
// This is used to populate an array with every line item enumeration that exists, and prepopulates the amount with zero.
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

// Responds with the above line items as JSON
exports.readLineItems = function(req, res){
    res.json(req.lineItems);
};

// Loops through each statement and verifies that every single line item type is in each statement.
// If one isn't in a statement, it is pushed into that statement with lineItemAmount = 0.
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

// Finds the activity record tied to the specified artifact.
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

// Responds with the activity in JSON form
exports.read = function(req, res){
    res.json(req.activity);
};

// Updates the activity record and responds with the updated activity data in JSON form
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

// Deletes the specified activity record.
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

// Validates that the save is possible (comparing it to the model).
exports.validateSave = function(req, res, next) {

    var activity = new Activity(req.body);
    //activity.artifact = req.body.activity.artifact;
    activity.asset = mongoose.Types.ObjectId(req.body.asset._id);
    activity.createdUser = req.user;

    activity.validate(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            next();
        }
    });
};

// Returns a list of all actuals (in JSON form)
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

// Returns a list of all budgets (in JSON form)
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

// Returns a list of all forecasts (in JSON form)
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