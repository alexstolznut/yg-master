
'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('productCard').
component('productCard', {
    templateUrl: "product-card/product-card.component.html",
    controller: ['$http', function ProductCardController($http) {
            var self = this;

            $http.get('data/products.json').then(function (response) {
                self.products = response.data;
            });
    }
 ]
});