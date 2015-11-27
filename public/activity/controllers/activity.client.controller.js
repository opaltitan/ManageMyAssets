/**
 * Created by Justin on 9/20/2015.
 */
angular.module('activity').controller('ActivityController', ['$scope', '$state', '$stateParams', '$routeParams', '$location', 'Authentication', 'Socket', 'Users',
    function($scope, $state, $stateParams, $routeParams, $location, Authentication, Socket, Users) {
        $scope.authentication = Authentication;



    }
]);