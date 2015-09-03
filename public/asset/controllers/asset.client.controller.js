/**
 * Created by Justin on 8/22/2015.
 */
angular.module('asset').controller('AssetController', ['$scope', '$routeParams', '$location', 'Authentication', 'Assets_Select', 'Assets_Update', 'Property_Update', 'Socket', 'Users',
    function($scope, $routeParams, $location, Authentication, Assets_Select, Assets_Update, Property_Update, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        $scope.assets = [];

/*        Socket.on('connect', function(){
            $scope.assets = Assets_Select.query();
        });

        Socket.on('asset_addition', function(assetId){
            //var asset = Assets.query(assetId);
            //$scope.assets.push(asset);
            $scope.assets = Assets_Select.query();
        });

        $scope.$on('$destroy', function(){
            Socket.removeListener('connect');
        });

        $scope.find = function(data){
            Socket.emit('connect', data);
        };
*/
        /*
        $scope.create = function(){
            var asset = new Assets_Update({
                assetTypeCode: this.assetTypeCode
            });
            var property = new Property_Update({
                propertyTypeCode: this.propertyTypeCode,
                propertyName: this.propertyName,
                propertyAddressStreet: this.propertyAddressStreet,
                propertyAddressCity: this.propertyAddressCity,
                propertyAddressState: this.propertyAddressState,
                propertyAddressZip: this.propertyAddressZip,
                asset: asset
            });
            property.$save(function(response){
                Socket.emit('asset_addition', response._id);
                $location.path('/#!/');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });

        };*/
    }
]);