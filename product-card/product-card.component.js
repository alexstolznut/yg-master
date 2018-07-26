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
      });
      
      $scope.username = {
        text: 'email',
        word: /^\w*@\w*$/
    }
    $scope.password = {
        text: 'password',
        word: /^\w*$/
    }
//    window.console.log(Product.q)
    /* arbitrary max items limit. Currently the number of displayed photos is limited by this constant */
    this.maxItems = 2;

    /* start assigning local variables to those defined in the shop service. The memory address of the shopService variables must remain constant or angular will not update the UI correctly. */
    this.items = Product.items;

    /* Fetch the products from the shopify api. Once the call is returned and the promise resolves, assign the results to products */
    Product.getProducts().then( (products) => {
        this.products = products;
    });

    /* Add an item to the cart.
    Input: 
        itemId: product id as assigned by shopify. Available @ product['id'] for each item in products
        q: quantity to add. Default is 1.
    */
    this.addItem = function(itemId,q) {
        Product.addItem(itemId,q).then( () => {
//            var objectLength = (Object.values(shopService.items));
//            window.console.log(objectLength[0].quantity);
//            window.console.log(objectLength.length);
            //these empty .then() functions are necessary to trigger an update of the UI. If you remove them you will notice the UI will not reflect changes in state until a new event (button click, keypress) is triggered. 
        });
    }
    
    /* Remove an item from the cart. 
        Input: 
            itemId: product id of item to remove
    */
    this.removeItem = function(itemId) {
        Product.removeItem(itemId).then( () => {
            //just like before, the empty .then() function is still necessary 
        });
    }
    
    /* Change an items quantity in the cart
        Input:
            itemId: product id of item to update
    */
    this.updateItem = function(itemId, q) {
        Product.updateItem(itemId,q).then( () => {
            //do not remove empty .then()
        });
    }
    
    /* Generate a shopify checkout url to pay/place the order 
    */
    this.getCheckout = function(){
        Product.getCheckout().then( (url) => {
            //If you want to see where this will direct you,
            //console.log(url);
            window.location.href = url;
        });
    }
    
  }]
});
