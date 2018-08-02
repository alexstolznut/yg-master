angular.
module('navbar').
component('navbar', {
    templateUrl: "nav-bar/nav-bar.component.html",
    controller: ['Product', '$scope', function NavController(Product, $scope) {

        //        Product.getProducts().then((products) => {
        //            $scope.products = products;
        //        });

        Product.getProducts().then((products) => {
            this.products = products;
        });

        this.getItem = function () {
            $scope.itemList = Product.items;

            window.console.log($scope.itemList['title']);
            $scope.itemListLength = Object.keys($scope.itemList).length;
        }
    
        var cartVals,x=[];
        this.cartTotal = function(){
            cartVals = Object.values(Product.items);
//                window.console.log(cartVals.length);
                for(var i = 0; i < cartVals.length; i = i + 1){
                    x.push(parseInt(cartVals[i].quantity));
                }
                $scope.$apply(function(){$scope.cartTotal = x.reduce((a,b)=> a + b,0)});
                window.consle.log()
        }
        /* Add an item to the cart.
        Input: 
            itemId: product id as assigned by shopify. Available @ product['id'] for each item in products
            q: quantity to add. Default is 1.
        */
        var cartVals;
        this.addItem = function (itemId, q) {
            Product.addItem(itemId, q).then(() => {
                cartVals = Object.values(Product.items);
                window.console.log(cartVals);
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
        this.removeItem = function (itemId) {
            Product.removeItem(itemId).then(() => {
                //just like before, the empty .then() function is still necessary 
            });
        }

        /* Change an items quantity in the cart
            Input:
                itemId: product id of item to update
        */
        this.checkItems = function () {
            window.console.log(Product.items.length);
        }
        this.updateItem = function (itemId, q) {
            Product.updateItem(itemId, q).then(() => {
                //do not remove empty .then()
            });
        }

        /* Generate a shopify checkout url to pay/place the order 
         */
        this.getCheckout = function () {
            Product.getCheckout().then((url) => {
                //If you want to see where this will direct you,
                //console.log(url);
                window.location.href = url;
            });
        }
    }]
});
