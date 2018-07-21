'use strict'

angular.
module('productPage').component('productPage',{
    templateUrl:'product-page/product-page.component.html',
    controller: ['Product', '$scope', '$routeParams', 
                 function ProductPageController(Product,$scope,$routeParams){
                     window.console.log($routeParams);
        Product.getProducts().then((products) => {
            $scope.products = products;
            for(var i = 0; i < products.length; i = i + 1){
                if(products[i].id === $routeParams.productId){
                    this.product = products[i];
                }
            }
        })
    }]
})