/**
 * Created by Justin on 9/10/2015.
 */
/**
 * Created by Justin on 8/29/2015.
 */
angular.module('asset').controller('DealListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Deal_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Deal_Select, Socket, Users){
        $scope.authentication = Authentication;
        //$scope.users = Users.query();
        $scope.assets = [];
        $scope.toggleDeal = {item: -1};

        $scope.$on('$destroy', function(){
            Socket.removeListener('deals_list');
        });

        $scope.find = function() {
            $scope.assets = [];
            $scope.assets = Deal_Select.query();
        };

        $scope.openList = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
        };

        Socket.on('deals_list', function(message){
            var dealIndex = 0;
            var deal_update = new Deal_Select.get({
                artifactId: message.artifact_id
            });
            if(message.type=='addition'){
                $scope.assets.push(deal_update);
            } else {
                angular.forEach($scope.assets, function(dealObject, dealKey){
                    if(dealObject.artifact._id===message.artifact_id){
                        dealIndex = dealKey;
                    }
                });
                $scope.assets[dealIndex] = deal_update;
            }
        });

    }
]);