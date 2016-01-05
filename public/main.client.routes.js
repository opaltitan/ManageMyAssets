/**
 * Created by Justin on 8/22/2015.
 */
angular.module('main').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
            // The highest-level routes
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
            // The "next" level down: lists.
            // Each button on the header has a new "list".
            // Also contains the placeholder for the "next" level down: details.
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
            // The "next" level down: details.
            // After clicking one of the links in the associated "list", the "details" screen is opened.
            // Two things are passed to determine which details screen is shown: subArtifactTypeCode && artifactId
            // Every asset/activity/workflow/report is an "artifact" with an "artifactId".
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
    }
]);