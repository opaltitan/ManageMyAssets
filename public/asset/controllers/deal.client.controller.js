/**
 * Created by Justin on 8/29/2015.
 */
angular.module('deal').controller('DealController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Assets_Update', 'Deal_Select', 'Deal_Update', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Assets_Update, Deal_Select, Deal_Update, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        $scope.deals = [];

        //Socket.on('connect', function(){
            //$scope.deals = [];
            //$scope.deals = Deal_Select.query();
        //});

        //Socket.on('asset_addition', function(data){
            //var asset = Assets.query(assetId);
            //$scope.assets.push(asset);
            //$scope.deals = Deal_Select.query();
        //    $scope.deals = [];
        //    $scope.deals = Deal_Select.query();
            //Socket.emit('connect', data);
        //});

        //$scope.$on('$destroy', function(){
            //if($state.transition != 'app.asset.list' && $state.transition != 'app.asset.list.create' && $state.transition != 'app.asset.list.details') {
            //    Socket.removeListener('connect');
            //    Socket.removeListener('asset_addition');
           // }
        //});

        //$scope.find = function(data){
            //Socket.emit('connect', data);
        //};

        $scope.findOne = function(){
            $scope.assetTypeCode = $stateParams.assetTypeCode;
            if($scope.assetTypeCode=='Deal') {
                $scope.deal = Deal_Select.get({
                    assetId: $stateParams.assetId
                });
            }
        };

        $scope.openCreate = function(){
            $scope.assetTypeCode = $stateParams.assetTypeCode;
        };

        $scope.update = function(){
            var deal = $scope.deal;
            deal.$update(function(response){
                $scope.deals = [];
                Socket.emit('deals_list', { asset_id: $scope.deal.asset._id, type: 'refresh'});
                $scope.deal = "";
                $state.go('app.asset.list');
                //$location.path('property/' + $scope.property._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.create = function(){
            var asset = new Assets_Update({
                assetTypeCode: this.assetTypeCode
            });
            var deal = new Deal_Select({
                dealTypeCode: this.dealTypeCode,
                dealName: this.dealName,
                properties: [],
                asset: asset
            });
            deal.$save(function(response){
                console.log('response: ' + response);
                Socket.emit('deals_list', { asset_id: response.asset, type: 'addition'});
                $state.go('app.asset.list');
                //$location.path('/#!/');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);