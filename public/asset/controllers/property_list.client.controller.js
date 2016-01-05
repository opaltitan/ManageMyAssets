/**
 * Created by Justin on 9/10/2015.
 */
angular.module('asset').controller('PropertyListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Property_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Property_Select, Socket, Users){
        $scope.authentication = Authentication;

        // Initialize the scope items.
        $scope.assets = [];
        $scope.toggleProperty = {item: -1};

        // Destroys event listener
        $scope.$on('$destroy', function(){
            Socket.removeListener('properties_list');
        });

        // Called on open of the list view
        // Queries the API to pull in all Deal assets
        $scope.find = function(){
            $scope.assets = [];

            $scope.assets = Property_Select.query();
        };

        $scope.openList = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
        };

        // Listens for the 'properties_list' event.
        // Uses the API to pull in the updated record data.
        Socket.on('properties_list', function(message){
            // Resets the propertyIndex variable
            var propertyIndex = 0;
            // Queries the API to pull in the new asset data for the updated Property
            var property_update = new Property_Select.get({
                artifactId: message.artifact_id
            });
            // Checks if the message is an 'addition' or a 'refresh'
            if(message.type=='addition'){
                // If 'addition', push the new record to the end of the array.
                $scope.assets.push(property_update);
            } else {
                // If 'refresh', loop through the array and replace the old record with the new record
                angular.forEach($scope.assets, function(propertyObject, propertyKey){
                    if(propertyObject.artifact._id===message.artifact_id){
                        propertyIndex = propertyKey;
                    }
                });
                $scope.assets[propertyIndex] = property_update;
            }
        });
    }
]);