/**
 * Created by Justin on 10/11/2015.
 */
angular.module('activity')
    .factory('Financials_Update', ['$resource', function($resource){
        return $resource('api/activities/financials/:artifactId', {
            artifactId: '@artifact._id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])
/*    .factory('Budget_Select', ['$resource', function($resource){
        return $resource('api/activities/budget/:artifactId', {
            artifactId: '@activity.artifact._id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])
    .factory('Forecast_Select', ['$resource', function($resource){
        return $resource('api/activities/forecast/:artifactId', {
            artifactId: '@activity.artifact._id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])*/
    .factory('Artifacts_Update', ['$resource', function($resource){
        return $resource('api/artifacts', {

        });
    }])
    .factory('Properties_Update', ['$resource', function($resource){
        return $resource('api/assets/property', {

        });
    }])
    .factory('Deals_Update', ['$resource', function($resource){
        return $resource('api/assets/deal', {

        });
    }])
    .factory('Activity_Update', ['$resource', function($resource){
        return $resource('api/activities/financials', {

        });
    }])
    .factory('Actuals_Select', ['$resource', function($resource){
        return $resource('api/activities/actuals', {

        });
    }])
    .factory('Budget_Select', ['$resource', function($resource){
        return $resource('api/activities/budgets', {

        });
    }])
    .factory('Forecast_Select', ['$resource', function($resource){
        return $resource('api/activities/forecasts', {

        });
    }])
    .factory('LineItemEnums_Select', ['$resource', function($resource){
        return $resource('api/activities/financials/lineItemEnums', {

        })
    }])
    .service('Socket', ['Authentication', '$location', '$timeout',
        function(Authentication, $location, $timeout){
            if(Authentication.user){
                this.socket = io();
            } else {
                $location.path('/');
            }
            this.on = function(eventName, callback){
                if(this.socket){
                    this.socket.on(eventName, function(data){
                        $timeout(function(){
                            callback(data);
                        });
                    });
                }
            };
            this.emit = function(eventName, data) {
                if(this.socket){
                    this.socket.emit(eventName, data);
                }
            };
            this.removeListener = function(eventName){
                if(this.socket){
                    this.socket.removeListener(eventName);
                }
            };
        }
    ]);