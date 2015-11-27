/**
 * Created by Justin on 9/20/2015.
 */
angular.module('activity').controller('FinancialListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Actuals_Select', 'Budget_Select', 'Forecast_Select', 'Financials_Update', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Actuals_Select, Budget_Select, Forecast_Select, Financials_Update, Socket, Users){
        $scope.authentication = Authentication;
        $scope.actuals = [];
        $scope.budgets = [];
        $scope.forecasts = [];

        $scope.togglePropertyActuals = {item: -1};
        $scope.togglePropertyBudget = {item: -1};
        $scope.togglePropertyForecast = {item: -1};

        $scope.$on('$destroy', function(){
            Socket.removeListener('actuals_list');
            Socket.removeListener('budget_list');
            Socket.removeListener('forecast_list');
        });

        $scope.openList = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
        };

        Socket.on('actuals_list', function(message){
            var actualsIndex = 0;
            var actuals_update = new Financials_Update.get({
                artifactId: message.artifact_id
            });
            if(message.type=='addition'){
                $scope.actuals.push(actuals_update);
            } else {
                angular.forEach($scope.actuals, function(actualsObject, actualsKey){
                    if(actualsObject.artifact._id===message.artifact_id){
                        actualsIndex = actualsKey;
                    }
                });
                $scope.actuals[actualsIndex] = actuals_update;
            }
        });

        Socket.on('budget_list', function(message){
            var budgetsIndex = 0;
            var budgets_update = new Financials_Update.get({
                artifactId: message.artifact_id
            });
            if(message.type == 'addition'){
                $scope.budgets.push(budgets_update);
            } else {
                angular.forEach($scope.budgets, function(budgetsObject, budgetsKey){
                    if(budgetsObject.artifact._id===message.artifact_id){
                        budgetsIndex = budgetsKey;
                    }
                });
                $scope.budgets[budgetsIndex] = budgets_update;
            }
        });

        Socket.on('forecast_list', function(message){
            var forecastsIndex = 0;
            var forecasts_update = new Financials_Update.get({
                artifactId: message.artifact_id
            });
            if(message.type == 'addition'){
                $scope.forecasts.push(forecasts_update);
            } else {
                angular.forEach($scope.forecasts, function(forecastsObject, forecastsKey){
                    if(forecastsObject.artifact._id===message.artifact_id){
                        forecastsIndex = forecastsKey;
                    }
                });
                $scope.forecasts[forecastsIndex] = forecasts_update;
            }
        });

        $scope.findActuals = function() {
            $scope.actuals = [];
            $scope.actuals = Actuals_Select.query();
        };

        $scope.findBudgets = function() {
            $scope.budgets = [];
            $scope.budgets = Budget_Select.query();
        };

        $scope.findForecasts = function() {
            $scope.forecasts = [];
            $scope.forecasts = Forecast_Select.query();
        };

    }
]);