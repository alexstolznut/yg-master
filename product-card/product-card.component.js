'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('productCard').
component('productCard', {
  templateUrl: "product-card/product-card.component.html",
  controller: ['Product','$scope', function ProductCardController(Product, $scope) {

    // var products = GET admin / products.json;
    // window.console.log(products);
//    var self = this;
//
//    $http.get('data/products.json').then(function(response) {
//      self.products = response.data;
      
      Product.getProducts().then((products) => {
//          $scope.$apply(function(){$scope.products = products});
          $scope.products = products;
          window.console.log($scope.products);
      })
    
  }]
});
