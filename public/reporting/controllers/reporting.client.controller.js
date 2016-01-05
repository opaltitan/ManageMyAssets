/**
 * Created by Justin on 11/27/2015.
 */
angular.module('reporting').controller('ReportingController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Actuals_Select', 'Budget_Select', 'Forecast_Select', 'Socket',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Actuals_Select, Budget_Select, Forecast_Select, Socket){
        $scope.authentication = Authentication;

        // Called on open of the Reporting "details" screen.
        $scope.findOne = function(){
            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            // Checks to see if the state parameters passed result in the page being displayed and populated.
            if($scope.subArtifactTypeCode=='Report' && $scope.artifactId != '0'){
                // Pass the artifactId from the state parameters to the API to pull in activity data.
                $scope.actuals = Actuals_Select.query();
            }
        };

        // Called on open of the Reporting "create" screen.
        // NOT YET IMPLEMENTED
        $scope.openCreate = function(){
            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;

            if($scope.subArtifactTypeCode=='Report' && $scope.artifactId == '0'){

                $scope.actuals = Actuals_Select.query();
            }
        };

        // Listens for the 'reporting_actuals' event.
        // Uses the API to pull in the updated record data.
        Socket.on('reporting_actuals', function(message){
            // Queries the API to pull in all actuals
            $scope.actuals = Actuals_Select.query();
        });


    }
]);