/**
 * Created by Justin on 8/29/2015.
 */
angular.module('asset').controller('DealController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Artifacts_Update', 'Assets_Update', 'Deal_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Artifacts_Update, Assets_Update, Deal_Select, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        $scope.deals = [];

        $scope.findOne = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Deal' && $scope.artifactId != '0') {
                $scope.asset = Deal_Select.get({
                    artifactId: $stateParams.artifactId
                });
            }
        };

        $scope.openCreate = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
        };

        $scope.update = function(){
            var asset = $scope.asset;
            asset.$update(function(response){
                Socket.emit('deals_list', { artifact_id: $scope.asset.artifact._id, type: 'refresh'});
                //$state.go('app.asset.list');
                //$location.path('property/' + $scope.property._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.create = function(){
            var artifact = new Artifacts_Update({
                artifactTypeCode: this.artifactTypeCode,
                subArtifactTypeCode: this.subArtifactTypeCode
            });
            var asset = new Assets_Update({
                assetTypeCode: this.assetTypeCode,
                artifact: artifact,
                assetDetails: {
                    deal: {
                        dealTypeCode: this.dealTypeCode,
                        dealName: this.dealName,
                        properties: []
                    }
                }
            });
            asset.$save(function(response){
                console.log('response: ' + response);
                Socket.emit('deals_list', { artifact_id: response.artifact._id, type: 'addition'});
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);