/**
 * Created by Justin on 8/29/2015.
 */
/*
angular.module('deal')
    .factory('Deal_Select', ['$resource', function($resource){
        return $resource('api/assets/deal/:artifactId', {
            artifactId: '@asset.artifact'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])
    .factory('Artifacts_Update', ['$resource', function($resource){
        return $resource('api/artifacts', {

        });
    }])
    .factory('Assets_Update', ['$resource', function($resource){
        return $resource('api/assets', {

        });
    }])
    .factory('Deal_Update', ['$resource', function($resource){
        return $resource('api/assets/deal', {

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
    ]);*/