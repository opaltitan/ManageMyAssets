/**
 * Created by Justin on 8/29/2015.
 */
angular.module('asset').controller('PropertyController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Property_Select', 'Artifacts_Update', 'Assets_Update', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Property_Select, Artifacts_Update, Assets_Update, Socket, Users){
        $scope.authentication = Authentication;
        $scope.assets = [];

        $scope.findOne = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            if($scope.subArtifactTypeCode=='Property' && $scope.artifactId != '0'){
                $scope.asset = Property_Select.get({
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
            var asset_update = $scope.asset;
            console.log('$scope.asset.artifact._id' + $scope.asset.artifact._id);

            //asset.artifact._id = $scope.asset.artifact._id;
            asset_update.$update(function(response){
                Socket.emit('properties_list', { artifact_id: $scope.asset.artifact._id, type: 'refresh'});
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
                    property: {
                        propertyTypeCode: this.propertyTypeCode,
                        propertyName: this.propertyName,
                        propertyAddressStreet: this.propertyAddressStreet,
                        propertyAddressCity: this.propertyAddressCity,
                        propertyAddressState: this.propertyAddressState,
                        propertyAddressZip: this.propertyAddressZip
                    }
                }
            });
            asset.$save(function(response){
                Socket.emit('properties_list', { artifact_id: response.artifact._id, type: 'addition' });
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);