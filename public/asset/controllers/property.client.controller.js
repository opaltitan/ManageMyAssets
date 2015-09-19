/**
 * Created by Justin on 8/29/2015.
 */
angular.module('property').controller('PropertyController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Property_Select', 'Assets_Update', 'Property_Update', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Property_Select, Assets_Update, Property_Update, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        //$scope.properties = [];

        //Socket.on('asset_addition', function(data){
        //    $scope.properties = [];
        //    $scope.properties = Property_Select.query();

            //Socket.emit('connect', data);
        //});

        //$scope.$on('$destroy', function(){
        //    if($state.transition != 'app.asset.list' && $state.transition != 'app.asset.list.create' && $state.transition != 'app.asset.list.details'){
        //        Socket.removeListener('connect');
        //        Socket.removeListener('asset_addition');
        //    }
        //});

        //$scope.find = function(data){
        //    Socket.emit('connect', data);
        //};

        //Socket.on('connect', function(){
        //    $scope.properties = [];
        //    $scope.properties = Property_Select.query();
        //});

        $scope.findOne = function(){
            $scope.assetTypeCode = $stateParams.assetTypeCode;
            if($scope.assetTypeCode=='Property'){
                $scope.property = Property_Select.get({
                    assetId: $stateParams.assetId
                });
            }
        };

        $scope.openCreate = function(){
            $scope.assetTypeCode = $stateParams.assetTypeCode;
        };

        $scope.update = function(){
            var property = $scope.property;
            property.$update(function(response){
                $scope.properties = [];
                Socket.emit('properties_list', { asset_id: $scope.property.asset._id, type: 'refresh'});
                //$location.path('property/' + $scope.property._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
            //Socket.emit('properties_list', { type: 'refresh'});
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
                Socket.emit('properties_list', { asset_id: response.asset, type: 'addition' });
                $state.go('app.asset.list');
                //$location.path('/#!/');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
            //Socket.emit('properties_list', { type:'refresh' });
        };
    }
]);