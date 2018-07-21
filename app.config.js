'use strict';

angular.
module('homeApp').
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/home', {
            template: '<home></home>'
        }).
        when('/product', {
            template: '<product-card></product-card>'
        }).
        when('/product/:productId',{
            template: '<product-page></product-page>'
        }).
        when('/about', {
            template: '<about></about>'
        }).
        when('/contact', {
            template: '<contact></contact>'
        }).
        otherwise('/home');
    }
  ]);
