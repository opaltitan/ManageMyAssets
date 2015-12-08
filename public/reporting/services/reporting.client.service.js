/**
 * Created by Justin on 11/27/2015.
 */
angular.module('reporting')
    .factory('d3', function(){
        return d3;
    })
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