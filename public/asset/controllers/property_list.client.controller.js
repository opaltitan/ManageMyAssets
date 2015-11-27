/**
 * Created by Justin on 9/10/2015.
 */
angular.module('asset').controller('PropertyListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Property_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Property_Select, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        $scope.assets = [];
        $scope.toggleProperty = {item: -1};

        $scope.$on('$destroy', function(){
            Socket.removeListener('properties_list');
        });

        $scope.find = function(){
            $scope.assets = [];
            $scope.assets = Property_Select.query();
        };

        $scope.openList = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
        };

        Socket.on('properties_list', function(message){
            var propertyIndex = 0;
            var property_update = new Property_Select.get({
                artifactId: message.artifact_id
            });
            if(message.type=='addition'){
                $scope.assets.push(property_update);
            } else {
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