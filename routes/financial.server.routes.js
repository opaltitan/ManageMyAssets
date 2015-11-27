/**
 * Created by Justin on 10/9/2015.
 */
    /*
var artifacts = require('../controllers/artifact.server.controller'),
    activities = require('../controllers/activity.server.controller'),
    users = require('../controllers/users.server.controller'),
    financials = require('../controllers/activities/financial.server.controller');

module.exports = function(app) {
    app.route('/api/activities/actuals')
        .get(activities.listActuals, financials.listActuals)
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, financials.validateSave, artifacts.createActivity, activities.create, financials.create, financials.financialById, financials.read);
    app.route('/api/activities/actuals/:artifactId')
        .get(activities.activityById, financials.financialById, financials.read)
        .put(users.requiresLogin, activities.activityById, financials.financialById, financials.validateSave, financials.update);
    app.route('/api/activities/actuals/create')
        .get(activities.list)
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, financials.validateSave, artifacts.createActivity, activities.create, financials.create, financials.financialById, financials.read);
    app.route('/api/activities/budget')
        .get(activities.listBudgets, financials.listBudgets)
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, financials.validateSave, artifacts.createActivity, activities.create, financials.create, financials.financialById, financials.read);
    app.route('/api/activities/budget/:artifactId')
        .get(activities.activityById, financials.financialById, financials.read)
        .put(users.requiresLogin, activities.activityById, financials.financialById, financials.validateSave, financials.update);
    app.route('/api/activities/budget/create')
        .get(activities.list)
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, financials.validateSave, artifacts.createActivity, activities.create, financials.create, financials.financialById, financials.read);
    app.route('/api/activities/forecast')
        .get(activities.listForecasts, financials.listForecasts)
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, financials.validateSave, artifacts.createActivity, activities.create, financials.create, financials.financialById, financials.read);
    app.route('/api/activities/forecast/:artifactId')
        .get(activities.activityById, financials.financialById, financials.read)
        .put(users.requiresLogin, activities.activityById, financials.financialById, financials.validateSave, financials.update);
    app.route('/api/activities/forecast/create')
        .get(activities.list)
        .post(users.requiresLogin, artifacts.validateSaveActivity, activities.validateSave, financials.validateSave, artifacts.createActivity, activities.create, financials.create, financials.financialById, financials.read);
    app.param('artifactId', artifacts.artifactById);
};*/