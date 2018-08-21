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
        when('/terms',{
            template: '<terms-of-use></terms-of-use>'
        }).
        when('/shipping',{
            template: '<shipping></shipping>'
        }).
        when('/return policy',{
            template: '<return></return>'
        }).
        when('/privacy policy',{
            template:'<privacy></privacy>'
        }).
        when('/checkout',{
            template:'<checkout-page></checkout-page>'
        }).
        otherwise('/home');
    }
        
  ]);
