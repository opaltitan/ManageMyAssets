/**
 * Created by Justin on 11/27/2015.
 */
angular.module('reporting').controller('ReportingListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Actuals_Select', 'Budget_Select', 'Forecast_Select', 'Socket',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Actuals_Select, Budget_Select, Forecast_Select, Socket){
        $scope.authentication = Authentication;

        $scope.openList = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
        };



        //$scope.actuals = Actuals_Select.query();

    }
]);