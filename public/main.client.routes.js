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
                    'list': {
                        templateUrl: 'main_list.client.view.html',
                        controller: 'PropertyListController'
                    }
                }
            })
            .state('app.list', {
                url: ':artifactTypeCode',
                views: {
                    'asset_property': {
                        templateUrl: 'asset/views/property/property_list.client.view.html',
                        controller: 'PropertyListController'
                    },
                    'asset_deal': {
                        templateUrl: 'asset/views/deal/deal_list.client.view.html',
                        controller: 'DealListController'
                    },
                    'activity_financials': {
                        templateUrl: 'activity/views/financial/financial_list.client.view.html',
                        controller: 'FinancialListController'
                    },
                    'reporting': {
                        templateUrl: 'reporting/views/reporting_list.client.view.html',
                        controller: 'ReportingListController'
                    },
                    'details': {
                        templateUrl: 'main_details.client.view.html'
                    }
                }
            })
            .state('app.list.details', {
                url: '/:subArtifactTypeCode/:artifactId',
                views: {
                    'asset_property_details': {
                        templateUrl: 'asset/views/property/property_select.client.view.html',
                        controller: 'PropertyController'
                    },
                    'asset_deal_details': {
                        templateUrl: 'asset/views/deal/deal_select.client.view.html',
                        controller: 'DealController'
                    },
                    'activity_financials_actuals_details': {
                        templateUrl: 'activity/views/financial/actuals/actuals_select.client.view.html',
                        controller: 'ActualsController'
                    },
                    'activity_financials_budget_details': {
                        templateUrl: 'activity/views/financial/budget/budget_select.client.view.html',
                        controller: 'BudgetController'
                    },
                    'activity_financials_forecast_details': {
                        templateUrl: 'activity/views/financial/forecast/forecast_select.client.view.html',
                        controller: 'ForecastController'
                    },
                    'asset_property_create': {
                        templateUrl: 'asset/views/property/property_create.client.view.html',
                        controller: 'PropertyController'
                    },
                    'asset_deal_create': {
                        templateUrl: 'asset/views/deal/deal_create.client.view.html',
                        controller: 'DealController'
                    },
                    'activity_financials_actuals_create': {
                        templateUrl: 'activity/views/financial/actuals/actuals_create.client.view.html',
                        controller: 'ActualsController'
                    },
                    'activity_financials_budget_create': {
                        templateUrl: 'activity/views/financial/budget/budget_create.client.view.html',
                        controller: 'BudgetController'
                    },
                    'activity_financials_forecast_create': {
                        templateUrl: 'activity/views/financial/forecast/forecast_create.client.view.html',
                        controller: 'ForecastController'
                    },
                    'reporting_details': {
                        templateUrl: 'reporting/views/reporting_select.client.view.html',
                        controller: 'ReportingController'
                    }
                }
            })
        ;
/*            .state('app.activities', {
                //url: ':headerSelection',
                views: {
                    'activities_list': {
                        templateUrl: 'activity/views/activity_list.client.view.html',
                        controller: 'ActivityController'
                    }
                }
            })
            .state('app.asset', {
                views: {
                    'list': {
                        templateUrl: 'asset/views/asset_list.client.view.html',
                        controller: 'AssetController'
                    }
                }
            })
            .state('app.activities.activities_list', {
                url: ':headerSelection',
                views: {
                    'activity_list': {
                        templateUrl: 'activity/views/financial/financial_list.client.view.html',
                        controller: 'FinancialListController'
                    },
                    'activity_details': {
                        templateUrl: 'activity/views/activity_details.client.view.html'//,
                        //controller: 'ActivityController'
                    },
                    'activity_create': {
                        templateUrl: 'activity/views/activity_create.client.view.html'
                    }
                }
            })
            .state('app.asset.list', {
                url: ':headerSelection',
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
                url: '/:assetTypeCode/:assetId',
                views: {
                    'property_details': {
                        templateUrl: 'asset/views/property/property_select.client.view.html'
                    },
                    'deal_details': {
                        templateUrl: 'asset/views/deal/deal_select.client.view.html',
                        controller: 'DealController'
                    }
                }
            })
            .state('app.asset.list.create', {
                url: '/:assetTypeCode',
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
            .state('app.activities.activities_list.activities_details', {
                url: ':headerSelection/:activityTypeCode/:activityId',
                views: {
                    'actuals_details': {
                        templateUrl: 'activity/views/financial/actuals/actuals_select.client.view.html',
                        controller: 'ActualsController'
                    },
                    'budget_details': {
                        templateUrl: 'activity/views/financial/budget/budget_select.client.view.html',
                        controller: 'BudgetController'
                    },
                    'forecast_details': {
                        templateUrl: 'activity/views/financial/forecast/forecast_select.client.view.html',
                        controller: 'ForecastController'
                    }
                }
            })
            .state('app.activities.activities_list.activities_create', {
                url: ':headerSelection/:activityTypeCode',
                controller: 'FinancialListController',
                views: {
                    'actuals_create': {
                        templateUrl: 'activity/views/financial/actuals/actuals_create.client.view.html',
                        controller: 'ActualsController'
                    },
                    'budget_create': {
                        templateUrl: 'activity/views/financial/budget/budget_create.client.view.html',
                        controller: 'BudgetController'
                    },
                    'forecast_create': {
                        templateUrl: 'activity/views/financial/forecast/forecast_create.client.view.html',
                        controller: 'ForecastController'
                    }
                }
            });*/
    }
]);