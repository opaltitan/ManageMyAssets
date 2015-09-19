/**
 * Created by Justin on 9/10/2015.
 */
angular.module('property').controller('PropertyListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Property_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Property_Select, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        $scope.properties = [];

        $scope.$on('$destroy', function(){
            Socket.removeListener('properties_list');
        });

        $scope.find = function(){
            //Socket.emit('connect', data);
            $scope.properties = [];
            $scope.properties = Property_Select.query();
        };

        Socket.on('properties_list', function(message){
            //$scope.properties = [];
            //$scope.properties = Property_Select.query();

            var propertyIndex = 0;
            var property_update = new Property_Select.get({
                assetId: message.asset_id
            });
            if(message.type=='addition'){
                $scope.properties.push(property_update);
            } else {
                angular.forEach($scope.properties, function(propertyObject, propertyKey){
                    if(propertyObject.asset._id===message.asset_id){
                        propertyIndex = propertyKey;
                    }
                });
                $scope.properties[propertyIndex] = property_update;
            }
        });
    }
]);