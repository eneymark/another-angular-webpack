module.exports = 'angularWebpack';

require('angular');

angular.module('angularWebpack', [
    require('exports?"ngRoute"!angular-route')
    ]).
    service('testService', ['$route', function($route){
        return {
            test : function() {
                if($route){
                    console.debug('have $route');
                }
            }
        };
    }]).
    factory('testFactory', [function(){
        return {
            method:function(){

            }
        };
    }]);
