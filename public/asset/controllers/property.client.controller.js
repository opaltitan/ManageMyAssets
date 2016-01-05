/**
 * Created by Justin on 8/29/2015.
 */
angular.module('asset').controller('PropertyController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Property_Select', 'Artifacts_Update', 'Assets_Update', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Property_Select, Artifacts_Update, Assets_Update, Socket, Users){
        $scope.authentication = Authentication;
        $scope.assets = [];

        // Called on open of the Property "details" screen.
        $scope.findOne = function(){
            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
            // Checks to see if the state parameters passed result in the page being displayed and populated.
            if($scope.subArtifactTypeCode=='Property' && $scope.artifactId != '0'){
                // Pass the artifactId from the state parameters to the API to pull in asset data.
                $scope.asset = Property_Select.get({
                    artifactId: $stateParams.artifactId
                });
            }
        };

        // Called on open of the Property "create" screen.
        $scope.openCreate = function(){
            // Pulls in the necessary variables from the state parameters into $scope.
            // These are used to check if the page should be displayed (and if the procedure to populate should be run).
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
            $scope.subArtifactTypeCode = $stateParams.subArtifactTypeCode;
            $scope.artifactId = $stateParams.artifactId;
        };

        // Called on click of the submit button on the Property "details" screen.
        $scope.update = function(){
            var asset_update = $scope.asset;
            // Executes a "PUT" request on the API, passing the object to save and the artifactId in the URL.
            asset_update.$update(function(response){
                // Uses Socket.IO to emit the activity to the 'properties_list' room.
                // Every list or reporting screen should get updated immediately.
                Socket.emit('properties_list', { artifact_id: $scope.asset.artifact._id, type: 'refresh'});
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        // Called on click of the submit button on the Property "create" screen
        $scope.create = function(){
            // Data for the artifact record
            var artifact = new Artifacts_Update({
                artifactTypeCode: this.artifactTypeCode,
                subArtifactTypeCode: this.subArtifactTypeCode
            });
            // Object for the asset record.
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
            // Executes a "POST" request on the API, passing the object to create and the artifactId in the URL.
            asset.$save(function(response){
                // Uses Socket.IO to emit the activity to the 'properties_list' room.
                // Every list or reporting screen should get updated immediately with the new record.
                Socket.emit('properties_list', { artifact_id: response.artifact._id, type: 'addition' });
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);