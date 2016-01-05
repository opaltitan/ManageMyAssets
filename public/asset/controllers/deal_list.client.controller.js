/**
 * Created by Justin on 9/10/2015.
 */
/**
 * Created by Justin on 8/29/2015.
 */
angular.module('asset').controller('DealListController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Deal_Select', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Deal_Select, Socket, Users){
        $scope.authentication = Authentication;

        // Initialize scope items.
        $scope.assets = [];
        $scope.toggleDeal = {item: -1};

        // Destroys event listener
        $scope.$on('$destroy', function(){
            Socket.removeListener('deals_list');
        });

        // Called on open of the list view
        // Queries the API to pull in all Deal assets
        $scope.find = function() {
            $scope.assets = [];
            $scope.assets = Deal_Select.query();
        };

        $scope.openList = function(){
            $scope.artifactTypeCode = $stateParams.artifactTypeCode;
        };

        // Listens for the 'deals_list' event.
        // Uses the API to pull in the updated record data.
        Socket.on('deals_list', function(message){
            // Resets the dealIndex variable
            var dealIndex = 0;
            // Queries the API to pull in the new asset data for the updated Deal
            var deal_update = new Deal_Select.get({
                artifactId: message.artifact_id
            });
            // Checks if the message is an 'addition' or a 'refresh'
            if(message.type=='addition'){
                // If 'addition', push the new record to the end of the array.
                $scope.assets.push(deal_update);
            } else {
                // If 'refresh', loop through the array and replace the old record with the new record
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