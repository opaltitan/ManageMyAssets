/**
 * Created by Justin on 11/27/2015.
 */
angular.module('reporting').controller('ReportingController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Actuals_Select', 'Budget_Select', 'Forecast_Select', 'Socket',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Actuals_Select, Budget_Select, Forecast_Select, Socket){
        $scope.authentication = Authentication;

        $scope.findOne = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Report' && $scope.artifactId != '0'){
                //$scope.properties = Property_Select.query();
                $scope.actuals = Actuals_Select.query();
            }
        };

        $scope.openCreate = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Report' && $scope.artifactId == '0'){
                //$scope.properties = Property_Select.query();
                $scope.actuals = Actuals_Select.query();
            }
        };

        Socket.on('reporting_actuals', function(message){
            $scope.actuals = Actuals_Select.query();
        });


    }
]);