/**
 * Created by Justin on 9/19/2015.
 */
var artifacts = require('../controllers/artifact.server.controller'),
    activities = require('../controllers/activity.server.controller'),
    users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/api/activities/actuals')
        // Returns the list of 'actuals' activities
        .get(activities.listActuals);

    app.route('/api/activities/budgets')
        // Returns the list of 'budget' activities
        .get(activities.listBudgets);

    app.route('/api/activities/forecasts')
        // Returns the list of 'forecast' activities
        .get(activities.listForecasts);

    app.route('/api/activities/financials')
        // Creates a new financial activity. All financial activities (actuals, budgets, and forecasts) all use this.
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, artifacts.createActivity, activities.create);

    app.route('/api/activities/financials/lineItemEnums')
        // Returns an array of line item types
        .get(activities.financialLineItemEnums, activities.readLineItems);

    app.route('/api/activities/financials/:artifactId')
        // Returns the activity specified by the browser
        .get(activities.activityById, activities.financialLineItemEnums, activities.populateEmptyLineItems, activities.read)
        // Updates the activity record specified.
        .put(users.requiresLogin, activities.activityById, activities.validateSave, activities.update);

    app.param('artifactId', artifacts.artifactById);
};