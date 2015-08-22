/**
 * Created by Justin on 8/22/2015.
 */
angular.module('home').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'home/views/home.client.view.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);