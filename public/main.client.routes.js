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
                        templateUrl: 'asset/views/asset_list.client.view.html',
                        controller: 'AssetController'
 /*                       views: {
                            'property': {
                                templateUrl: 'asset/views/property/property_list.client.view.html',
                                controller: 'PropertyController'
                            },
                            'deal': {
                                templateUrl: 'asset/views/deal/deal_list.client.view.html',
                                controller: 'DealController'
                            }
                        }*/
                    }
                }

                /*views: {
                    'property': {
                        templateUrl: 'asset/views/property/property_list.client.view.html',
                        controller: 'PropertyController'
                   },
                    'deal': {
                        templateUrl: 'asset/views/deal/deal_list.client.view.html',
                        controller: 'DealController'
                    }
                }*/
            })
            .state('app.asset.list', {
                views: {
                    'property': {
                        templateUrl: 'asset/views/property/property_list.client.view.html',
                        controller: 'PropertyListController'
                    },
                    'deal': {
                        templateUrl: 'asset/views/deal/deal_list.client.view.html',
                        controller: 'DealListController'
                    },
                    'details': {
                        templateUrl: 'asset/views/asset_details.client.view.html',
                        controller: 'PropertyController'
                    },
                    'create': {
                        templateUrl: 'asset/views/asset_create.client.view.html'
                    }
                }
            })
            .state('app.asset.list.details', {
                url: ':assetTypeCode/:assetId',
                //templateUrl: 'asset/views/property/property_details.client.view.html',
                //controller: 'AssetController',
                views: {
                    'property_details': {
                        templateUrl: 'asset/views/property/property_select.client.view.html'//,
                        //controller: 'PropertyController'
                    },
                    'deal_details': {
                        templateUrl: 'asset/views/deal/deal_select.client.view.html',
                        controller: 'DealController'
                    }
                }
            })
            .state('app.asset.list.create', {
                url: ':assetTypeCode',
                controller: 'AssetController',
                views: {
                    'property_create': {
                        templateUrl: 'asset/views/property/property_create.client.view.html',
                        controller: 'PropertyController'
                    },
                    'deal_create': {
                        templateUrl: 'asset/views/deal/deal_create.client.view.html',
                        controller: 'DealController'
                    }
                }
            })
/*            .state('app.asset.list.details', {
                url: ':assetTypeCode/:assetId',
                templateUrl: 'asset/views/asset_details.client.view.html',
                controller: 'AssetController'
            })
            .state('app.asset.property_details',{
                url: 'property/:propertyId',
                views: {
                    'details': {
                        templateUrl: 'asset/views/property/property_select.client.view.html',
                        controller: 'PropertyController'
                    }
                }
            })
            .state('app.asset.deal_details', {
                url: 'deal/:dealId',
                views: {

                }
            })
            .state('app.asset.create',{
                views: {
                    'details': {
                        templateUrl: 'asset/views/property/property_create.client.view.html',
                        controller: 'PropertyController'
                    }
                }
            })*/;
    }
]);