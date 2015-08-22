/**
 * Created by Justin on 8/22/2015.
 */
angular.module('home').controller('HomeController', ['$scope', 'Authentication',
    function($scope, Authentication){
        $scope.authentication = Authentication;
    }
]);