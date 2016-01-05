/**
 * Created by Justin on 9/20/2015.
 */
angular.module('activity').controller('FinancialListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Actuals_Select', 'Budget_Select', 'Forecast_Select', 'Financials_Update', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Actuals_Select, Budget_Select, Forecast_Select, Financials_Update, Socket, Users){
        $scope.authentication = Authentication;

        // Initialize the scope arrays.
        $scope.actuals = [];
        $scope.budgets = [];
        $scope.forecasts = [];

        // Initialize the scope list selection variables.
        $scope.togglePropertyActuals = {item: -1};
        $scope.togglePropertyBudget = {item: -1};
        $scope.togglePropertyForecast = {item: -1};

        // Destroys event listeners
        $scope.$on('$destroy', function(){
            Socket.removeListener('actuals_list');
            Socket.removeListener('budget_list');
            Socket.removeListener('forecast_list');
        });

        // Calls on open of the activity list
        $scope.openList = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
        };

        // Listens for the 'actuals_list' event.
        // Uses the API to pull in the updated record data.
        Socket.on('actuals_list', function(message){
            // Resets the actualsIndex variable
            var actualsIndex = 0;
            // Queries the API to pull in the new activity data to the list
            var actuals_update = new Financials_Update.get({
                artifactId: message.artifact_id
            });
            // Checks if the message is an 'addition' or a 'refresh'
            if(message.type=='addition'){
                // If 'addition', push the new record to the end of the array.
                $scope.actuals.push(actuals_update);
            } else {
                // If 'refresh', loop through the array and replace the old record with the new record
                angular.forEach($scope.actuals, function(actualsObject, actualsKey){
                    if(actualsObject.artifact._id===message.artifact_id){
                        actualsIndex = actualsKey;
                    }
                });
                // Replaces the old record in the array with the new record
                $scope.actuals[actualsIndex] = actuals_update;
            }
        });

        // Listens for the 'budget_list' event.
        // Uses the API to pull in the updated record data.
        Socket.on('budget_list', function(message){
            // Resets the budgetIndex variable
            var budgetsIndex = 0;
            // Queries the API to pull in the new activity data to the list
            var budgets_update = new Financials_Update.get({
                artifactId: message.artifact_id
            });
            // Checks if the message is an 'addition' or a 'refresh'
            if(message.type == 'addition'){
                // If 'addition', push the new record to the end of the array.
                $scope.budgets.push(budgets_update);
            } else {
                // If 'refresh', loop through the array and replace the old record with the new record
                angular.forEach($scope.budgets, function(budgetsObject, budgetsKey){
                    if(budgetsObject.artifact._id===message.artifact_id){
                        budgetsIndex = budgetsKey;
                    }
                });
                // Replaces the old record in the array with the new record
                $scope.budgets[budgetsIndex] = budgets_update;
            }
        });

        // Listens for the 'forecast_list' event.
        // Uses the API to pull in the updated record data.
        Socket.on('forecast_list', function(message){
            // Resets the forecastIndex variable
            var forecastsIndex = 0;
            // Queries the API to pull in the new activity data to the list
            var forecasts_update = new Financials_Update.get({
                artifactId: message.artifact_id
            });
            // Checks if the message is in 'addition' or a 'refresh'
            if(message.type == 'addition'){
                // If 'addition', push the new record to the end of the array.
                $scope.forecasts.push(forecasts_update);
            } else {
                // If 'refresh', loop through the array and replace the old record with the new record
                angular.forEach($scope.forecasts, function(forecastsObject, forecastsKey){
                    if(forecastsObject.artifact._id===message.artifact_id){
                        forecastsIndex = forecastsKey;
                    }
                });
                // Replaces the old record in the array with the new record
                $scope.forecasts[forecastsIndex] = forecasts_update;
            }
        });

        $scope.findActuals = function() {
            $scope.actuals = [];
            // Queries the API to pull in all Actuals
            $scope.actuals = Actuals_Select.query();
        };

        $scope.findBudgets = function() {
            $scope.budgets = [];
            // Queries the API to pull in all Budgets
            $scope.budgets = Budget_Select.query();
        };

        $scope.findForecasts = function() {
            $scope.forecasts = [];
            // Queries the API to pull in all Forecasts
            $scope.forecasts = Forecast_Select.query();
        };

    }
]);