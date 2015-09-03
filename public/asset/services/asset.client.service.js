/**
 * Created by Justin on 8/22/2015.
 */
angular.module('asset')
    .factory('Assets_Select', ['$resource', function($resource){
        return $resource('api/assets/property/:assetId', {
            assetId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])
//    .factory('Assets_Update', ['$resource', function($resource){
//        return $resource('api/assets/property/create', {
//
//        })
//    }])
    .factory('Property_Update', ['$resource', function($resource){
        return $resource('api/assets/property/create', {

        })
    }])
    .service('Socket', ['Authentication', '$location', '$timeout',
        function(Authentication, $location, $timeout){
            if(Authentication.user){
                this.socket = io('/asset');
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