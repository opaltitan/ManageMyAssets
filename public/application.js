/**
 * Created by Justin on 8/22/2015.
 */
var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'home']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider){
        $locationProvider.hashPrefix('!');
    }
]);

if(window.location.hash === '#_=_') window.location.hash = "#!";

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});