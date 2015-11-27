/**
 * Created by Justin on 9/19/2015.
 */
var artifacts = require('../controllers/artifact.server.controller'),
    activities = require('../controllers/activity.server.controller'),
    users = require('../controllers/users.server.controller');
   // financials = require('../controllers/activities/financial.server.controller');

module.exports = function(app) {
    app.route('/api/activities/actuals')
        .get(activities.listActuals);
    app.route('/api/activities/budgets')
        .get(activities.listBudgets);
    app.route('/api/activities/forecasts')
        .get(activities.listForecasts);
    app.route('/api/activities/financials')
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, artifacts.createActivity, activities.create);
   //     .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, financials.validateSave, artifacts.createActivity, activities.create, financials.create, financials.financialById, financials.read);
    //app.route('/api/activities/financials')
        //.get(financials.list)
    //    .post(users.requiresLogin, activities.validateSave, activities.create);
    app.route('/api/activities/financials/lineItemEnums')
        .get(activities.financialLineItemEnums, activities.readLineItems);
    app.route('/api/activities/financials/:artifactId')
        .get(activities.activityById, activities.financialLineItemEnums, activities.populateEmptyLineItems, activities.read)
        .put(users.requiresLogin, activities.activityById, activities.validateSave, activities.update);
    //app.route('/api/activities/financials/create')
        //.get(activities.list)
        //.post(users.requiresLogin, activities.validateSave, financials.validateSave, activities.create, financials.create);
    app.param('artifactId', artifacts.artifactById);
};