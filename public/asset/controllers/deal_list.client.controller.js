/**
 * Created by Justin on 9/10/2015.
 */
/**
 * Created by Justin on 8/29/2015.
 */
angular.module('deal').controller('DealListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Assets_Update', 'Deal_Select', 'Deal_Update', 'Socket', 'Users',
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

        $scope.$on('$destroy', function(){
            Socket.removeListener('deals_list');
        });

        $scope.find = function() {
            $scope.deals = [];
            $scope.deals = Deal_Select.query();
        };

        Socket.on('deals_list', function(message){
            var dealIndex = 0;
            var deal_update = new Deal_Select.get({
                assetId: message.asset_id
            });
            if(message.type=='addition'){
                $scope.deals.push(deal_update);
            } else {
                angular.forEach($scope.deals, function(dealObject, dealKey){
                    if(dealObject.asset._id===message.asset_id){
                        dealIndex = dealKey;
                    }
                });
                $scope.deals[dealIndex] = deal_update;
            }
        });

        //$scope.find = function(data){
        //Socket.emit('connect', data);
        //};

    }
]);