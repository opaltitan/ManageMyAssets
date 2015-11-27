/**
 * Created by Justin on 9/20/2015.
 */
angular.module('activity').controller('ActualsController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Artifacts_Update', 'Properties_Update', 'Activity_Update', 'Actuals_Select', 'Financials_Update', 'LineItemEnums_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Artifacts_Update, Properties_Update, Activity_Update, Actuals_Select, Financials_Update, LineItemEnums_Select, Socket, Users){
        $scope.authentication = Authentication;

        $scope.findOne = function(){
            var actuals;
            var actualsStatement = new Array();
            var lineItems;
            var actualsLineItems;
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Actuals' && $scope.artifactId != '0'){
                //$scope.properties = Property_Select.query();
                actuals = Financials_Update.get({
                    artifactId: $stateParams.artifactId
                });
                $scope.actuals = actuals;
            }
        };

        $scope.openCreate = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Actuals' && $scope.artifactId == '0'){
                $scope.properties = Properties_Update.query();
                $scope.lineItems = LineItemEnums_Select.query();
            }

        };

        $scope.update = function(){
            var actuals_update = $scope.actuals;

            actuals_update.$update(function(response){
                Socket.emit('actuals_list', { artifact_id: $scope.actuals.artifact._id, type: 'refresh'});
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.create = function(){
            var qStatement = new Array();
            qStatement.push({
                statementTypeCode: 'Actuals',
                statementDateBegin: this.statementDateBegin,
                statementDateEnd: this.statementDateEnd,
                statementLineItems: this.lineItems
            });

            console.log('Asset: ' + this.asset._id);
            //console.log('Asset: ' + this.asset.asset);
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
                        statements: qStatement
                    }
                }
/*                asset: {
                    _id: this.asset.asset._id
                }*/
            });
            //var actuals = new Actuals_Update({
            //    activity: activity
            //});

            activity.$save(function(response){
                console.log('Artifact Id: ' + response.artifact);
                Socket.emit('actuals_list', { artifact_id: response.artifact, type: 'addition' });
                //$state.go('app.activity.list');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);