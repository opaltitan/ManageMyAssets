/**
 * Created by Justin on 8/22/2015.
 */

angular.module('header').controller('HeaderController', ['$scope', '$stateParams', 'Authentication',
    function($scope, $stateParams, Authentication){
        $scope.authentication = Authentication;
        $scope.selection = "";

    }
]);