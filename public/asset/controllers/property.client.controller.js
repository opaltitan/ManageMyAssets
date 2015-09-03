/**
 * Created by Justin on 8/29/2015.
 */
angular.module('property').controller('PropertyController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Assets_Update', 'Property_Select', 'Property_Update', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Assets_Update, Property_Select, Property_Update, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        $scope.properties = [];

        Socket.on('connect', function(){
            $scope.properties = Property_Select.query();
        });

        Socket.on('asset_addition', function(propertyId){
            //var asset = Assets.query(assetId);
            //$scope.assets.push(asset);
            $scope.properties = Property_Select.query();
        });

        $scope.$on('$destroy', function(){
            Socket.removeListener('connect');
        });

        $scope.find = function(data){
            Socket.emit('connect', data);
        };

        $scope.findOne = function(){
            $scope.property = Property_Select.get({
                propertyId: $stateParams.propertyId
            });
        };

        $scope.update = function(){
            var property = $scope.property;
            property.$update(function(response){
                Socket.emit('asset_addition', response._id);
                //$location.path('property/' + $scope.property._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.create = function(){
            var asset = new Assets_Update({
                assetTypeCode: this.assetTypeCode
            });
            var property = new Property_Select({
                propertyTypeCode: this.propertyTypeCode,
                propertyName: this.propertyName,
                propertyAddressStreet: this.propertyAddressStreet,
                propertyAddressCity: this.propertyAddressCity,
                propertyAddressState: this.propertyAddressState,
                propertyAddressZip: this.propertyAddressZip,
                asset: asset
            });
            property.$save(function(response){
                $state.go('app.asset');
                Socket.emit('asset_addition', response._id);
                //$location.path('/#!/');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);