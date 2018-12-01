angular.
module('checkoutPage').
component('checkoutPage', {
    templateUrl: "checkout-page/checkout-page.component.html",
    controller: ['LangChoice', 'Product', '$scope', function (LangChoice, Product, $scope) {
        this.getItem = function () {
            $scope.itemList = Product.items;
            $scope.itemListLength = Object.keys($scope.itemList).length;
        }
        $scope.totalPrice = Product.checkoutInfo.totalPrice;
        this.getItem();
        this.removeItem = function (itemId) {
            Product.removeItem(itemId).then(() => {
                //just like before, the empty .then() function is still necessary 
            });
        }
        
        $scope.langPos = LangChoice.langPos;
        $scope.langPos = LangChoice.langPos;
        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
                $scope.totalPrice = Product.checkoutInfo.totalPrice;
            });
        }, 0);
        
        this.quantity = Product.items.quantity;
        this.updateQuantity = function (delta) {
            this.quantity += delta;
        }
        
        $scope.itemId = function(id){
            $scope.itemId = id;
            return $scope.itemId;
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
