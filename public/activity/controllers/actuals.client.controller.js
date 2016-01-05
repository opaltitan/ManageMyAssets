/**
 * Created by Justin on 9/20/2015.
 */
// This controller is used for the Actuals details screen
angular.module('activity').controller('ActualsController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Artifacts_Update', 'Properties_Update', 'Activity_Update', 'Actuals_Select', 'Financials_Update', 'LineItemEnums_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Artifacts_Update, Properties_Update, Activity_Update, Actuals_Select, Financials_Update, LineItemEnums_Select, Socket, Users){
        $scope.authentication = Authentication;

        // Called on open of the Actuals "details" screen.
        $scope.findOne = function(){
            var actuals;
            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            // Checks to see if the state parameters passed result in the page being displayed and populated.
            if($scope.subArtifactTypeCode=='Actuals' && $scope.artifactId != '0'){
                // Pass the artifactId from the state parameters to the API to pull in activity data.
                actuals = Financials_Update.get({
                    artifactId: $stateParams.artifactId
                });
                // Bind the scope variable to the API results for form population.
                $scope.actuals = actuals;
            }
        };

        // Called on open of the Actuals "create" screen.
        $scope.openCreate = function(){
            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            // Checks to see if the state parameters passed result in the page being displayed and populated.
            if($scope.subArtifactTypeCode=='Actuals' && $scope.artifactId == '0'){
                // Use the API to pull in all properties in the system.
                $scope.properties = Properties_Update.query();
                // Use the API to pull in all line item types.
                $scope.lineItems = LineItemEnums_Select.query();
            }

        };

        // Called on click of the submit button on the Actuals "details" screen.
        $scope.update = function(){
            var actuals_update = $scope.actuals;
            // Executes a "PUT" request on the API, passing the object to save and the artifactId in the URL.
            actuals_update.$update(function(response){
                // Uses Socket.IO to emit the activity to the 'actuals_list' room.
                // Every list or reporting screen should get updated immediately.
                Socket.emit('actuals_list', { artifact_id: $scope.actuals.artifact._id, type: 'refresh'});
            }, function(errorResponse){
                // Returns the error message if one is returned. (Response = 400)
                $scope.error = errorResponse.data.message;
            });
        };

        // Called on click of the submit button on the Actuals "create" screen
        $scope.create = function(){
            // statements array
            // For the actuals activity, this will only have 1 record.
            var qStatement = new Array();
            // Pushes the data into the statements array.
            qStatement.push({
                statementTypeCode: 'Actuals',
                statementDateBegin: this.statementDateBegin,
                statementDateEnd: this.statementDateEnd,
                statementLineItems: this.lineItems
            });
            // Data for the artifact record
            var artifact = new Artifacts_Update({
                artifactTypeCode: this.artifactTypeCode,
                subArtifactTypeCode: this.subArtifactTypeCode
            });
            // Object for the activity record.
            var activity = new Activity_Update({
                activityTypeCode: this.activityTypeCode,
                artifact: artifact,
                asset: this.asset._id,
                activityDetails: {
                    financial: {
                        effectiveDate: this.effectiveDate,
                        statements: qStatement
                    }
                }
            });

            // Executes a "POST" request on the API, passing the object to create and the artifactId in the URL.
            activity.$save(function(response){
                // Uses Socket.IO to emit the activity to the 'actuals_list' room.
                // Every list or reporting screen should get updated immediately with the new record.
                Socket.emit('actuals_list', { artifact_id: response.artifact, type: 'addition' });

            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);