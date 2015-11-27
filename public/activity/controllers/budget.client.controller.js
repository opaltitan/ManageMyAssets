/**
 * Created by Justin on 9/20/2015.
 */
angular.module('activity').controller('BudgetController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Artifacts_Update', 'Activity_Update', 'Budget_Select', 'Financials_Update', 'Properties_Update', 'LineItemEnums_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Artifacts_Update, Activity_Update, Budget_Select, Financials_Update, Properties_Update, LineItemEnums_Select, Socket, Users){
        $scope.authentication = Authentication;

        $scope.findOne = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Budget' && $scope.artifactId != '0'){
                $scope.budget = Financials_Update.get({
                    artifactId: $stateParams.artifactId
                });
            }
        };

        $scope.openCreate = function(){
            //console.log('artifactTypecode: ' + $stateParams.artifactTypeCode);
            //console.log('subArtifactTypeCode: ' + $stateParams.subArtifactTypeCode);
            //console.log('artifactId: ' + $stateParams.artifactId);
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Budget' && $scope.artifactId=='0'){
                var statements = new Array();
                $scope.properties = Properties_Update.query();
                //$scope.lineItems = LineItemEnums_Select.query();
                for(var i=1; i<13;i++){
                    statements.push({
                        statementDateBegin: new Date(2015,i-1,1),
                        statementDateEnd: new Date(2015,i,0),
                        statementTypeCode: 'Budget',
                        //statementLineItems: $scope.lineItems
                        statementLineItems: LineItemEnums_Select.query()
                    });
                }
                $scope.statements = statements;
            }
        };

        $scope.update = function(){
            var budget = $scope.budget;
            budget.$update(function(response){
                Socket.emit('budget_list', { artifact_id: $scope.budget.artifact._id, type: 'refresh'});
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.create = function(){
            var artifact = new Artifacts_Update({
                artifactTypeCode: this.artifactTypeCode,
                subArtifactTypeCode: this.subArtifactTypeCode
            });
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
                /*                asset: {
                 _id: this.asset.asset._id
                 }*/
            });
            /*var budget = new Budget_Update({
                activity: activity
            });*/
            activity.$save(function(response){
                Socket.emit('budget_list', { artifact_id: response.artifact, type: 'addition' });
                //$state.go('app.activity.list');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);