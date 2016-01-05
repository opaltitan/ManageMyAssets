/**
 * Created by Justin on 9/20/2015.
 */
// THIS CONTROLLER IS NOT USED
angular.module('activity').controller('ActivityController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Socket, Users) {
        $scope.authentication = Authentication;



    }
]);