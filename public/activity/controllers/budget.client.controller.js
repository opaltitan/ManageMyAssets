/**
 * Created by Justin on 9/20/2015.
 */
angular.module('activity').controller('BudgetController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Artifacts_Update', 'Activity_Update', 'Budget_Select', 'Financials_Update', 'Properties_Update', 'LineItemEnums_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Artifacts_Update, Activity_Update, Budget_Select, Financials_Update, Properties_Update, LineItemEnums_Select, Socket, Users){
        $scope.authentication = Authentication;

        // Called on open of the Budget "details" screen.
        $scope.findOne = function(){

            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            // Checks to see if the state parameters passed result in the page being displayed and populated.
            if($scope.subArtifactTypeCode=='Budget' && $scope.artifactId != '0'){
                // Pass the artifactId from the state parameters to the API to pull in activity data.
                $scope.budget = Financials_Update.get({
                    artifactId: $stateParams.artifactId
                });
            }
        };

        // Called on open of the Budget "create" screen.
        $scope.openCreate = function(){
            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;

            // Checks to see if the state parameters passed result in the page being displayed and populated.
            if($scope.subArtifactTypeCode=='Budget' && $scope.artifactId=='0'){
                var statements = new Array();

                // Use the API to pull in all properties in the system.
                $scope.properties = Properties_Update.query();

                // Loop should iterate 12 times (1 for each month)
                for(var i=1; i<13;i++){
                    // Pushes a new statement for each iteration.
                    statements.push({
                        // statementDateBegin == First Day of the Month
                        statementDateBegin: new Date(2015,i-1,1),
                        // statementDateEnd == Last Day of the Month
                        statementDateEnd: new Date(2015,i,0),
                        statementTypeCode: 'Budget',
                        // statementLineItems pulls in all line item types from the API
                        statementLineItems: LineItemEnums_Select.query()
                    });
                }
                $scope.statements = statements;
            }
        };

        // Called on click of the submit button on the Budget "details" screen.
        $scope.update = function(){
            var budget = $scope.budget;
            // Executes a "PUT" request on the API, passing the object to save and the artifactId in the URL.
            budget.$update(function(response){
                // Uses Socket.IO to emit the activity to the 'budget_list' room.
                // Every list or reporting screen should get updated immediately.
                Socket.emit('budget_list', { artifact_id: $scope.budget.artifact._id, type: 'refresh'});
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        // Called on click of the submit button on the Budget "create" screen
        $scope.create = function(){
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
                        statements: this.statements
                    }
                }
            });
            // Executes a "POST" request on the API, passing the object to create and the artifactId in the URL.
            activity.$save(function(response){
                // Uses Socket.IO to emit the activity to the 'budget_list' room.
                // Every list or reporting screen should get updated immediately with the new record.
                Socket.emit('budget_list', { artifact_id: response.artifact, type: 'addition' });

            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);