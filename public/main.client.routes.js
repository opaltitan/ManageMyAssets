/**
 * Created by Justin on 8/22/2015.
 */
angular.module('main').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl: 'header/views/header.client.view.html',
                        controller: 'HeaderController'
                    },
                    'home': {
                        templateUrl: 'home/views/home.client.view.html',
                        controller: 'HomeController'
                    },
                    'asset': {
                        templateUrl: 'asset/views/asset.client.view.html'//,
                        //controller: 'PropertyController'
                    }
                }
            })
            .state('app.asset', {
                views: {
                    'list': {
                        templateUrl: 'asset/views/property/property_list.client.view.html',
                        controller: 'PropertyController'
                   }
                }
            })
            .state('app.asset.create',{
                views: {
                    'details': {
                        templateUrl: 'asset/views/property/property_create.client.view.html',
                        controller: 'PropertyController'
                    }
                }
            })
            .state('app.asset.details',{
                url: 'property/:propertyId',
                views: {
                    'details': {
                        templateUrl: 'asset/views/property/property_select.client.view.html',
                        controller: 'PropertyController'
                    }
                }
            });
    }
]);