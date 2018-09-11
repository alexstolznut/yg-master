angular.
module('checkoutPage').
component('checkoutPage', {
    templateUrl: "checkout-page/checkout-page.component.html",
    controller: ['LangChoice', 'Product', '$scope', function(LangChoice, Product, $scope){
         this.getItem = function () {
            $scope.itemList = Product.items;
            $scope.itemListLength = Object.keys($scope.itemList).length;
        }
         $scope.hideMe = true;
         this.getItem();
         this.removeItem = function (itemId) {
                Product.removeItem(itemId).then(() => {
                    window.console.log(Product.itemList);
                    //just like before, the empty .then() function is still necessary 
                });
            }
//         window.console.log(Product.items);
         window.console.log(Product.items);
         this.quantity = Product.items.quantity;
         this.updateQuantity = function (delta) {
                this.quantity += delta;
            }
         this.updateItem = function (itemId, q) {
                Product.updateItem(itemId, q).then(() => {
                    //do not remove empty .then()
                });
            }
         
          this.getCheckout = function () {
            Product.getCheckout().then((url) => {
                //If you want to see where this will direct you,
                //console.log(url);
                window.location.href = url;
            });
        }
    }]
});