/**
 * Created by Justin on 8/22/2015.
 */
angular.module('users').factory('Authentication', [
    function(){
        this.user = window.user;
        return {
            user: this.user
        };
    }
]).factory('Users', ['$resource', function($resource){
    return $resource('api/users', {

    });
}]);