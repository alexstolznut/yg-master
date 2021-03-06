angular.
module('navbar').
component('navbar', {
    templateUrl: "nav-bar/nav-bar.component.html",
    controller: ['LangChoice', 'Product', 'TagChoice','$scope', '$rootScope','$routeParams', '$location', function NavController(LangChoice, Product, TagChoice, $scope, $rootScope, $routeParams, $location) {
        $scope.numLimit = 4;
        
        $scope.changeTagValue = function(value){
            TagChoice.tagChoice = value;
       
        }
        Product.getProducts().then((products) => {
            this.products = products;

            $scope.products = Object.values(this.products);


        });
        $scope.currentPath = $location.path();
        if($scope.currentPath === '/product'){
            
        }

        $rootScope.$watch(function () {
                $scope.currentPath = $location.path();
        });
        
        Product.sortTags().then((tags)=>{
            $scope.tags = tags;
        })

        $scope.langPos = LangChoice.langPos;
        $scope.langPos = LangChoice.langPos;
        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
            });
        }, 0);
        $scope.show = false;
        this.langOptions = LangChoice.langOptions;

        this.switchLang = function () {
           
            if (LangChoice.langPos === 0) {
                LangChoice.langPos = 1;
            } else {
                LangChoice.langPos = 0;
            }
           
            this.LanguageChoice = LangChoice.langOptions[LangChoice.langPos];
        }

        this.LanguageChoice = LangChoice.langOptions[LangChoice.langPos];
        $scope.checkoutInfo = Product.checkoutInfo;
        this.getItem = function () {
            $scope.itemList = Product.items;
            $scope.itemListLength = Object.keys($scope.itemList).length;
           
        }

        var cartVals, x = [];
        this.cartTotal = function () {
            cartVals = Object.values(Product.items);
        
            for (var i = 0; i < cartVals.length; i = i + 1) {
                x.push(parseInt(cartVals[i].quantity));
            }
            $scope.$apply(function () {
                $scope.cartTotal = x.reduce((a, b) => a + b, 0)
            });
            
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

        this.updateItem = function (itemId, q) {
            Product.updateItem(itemId, q).then(() => {
                //do not remove empty .then()
            });
        }

        $(document).ready(function () {
            $('.nav-search-icon').click(function () {
                $('.search').addClass("active");
            });
            $('.search-icon').click(function () {
                $('.search').removeClass("active");
            })


        });

        // HIDES MENU OUT OF CLICK
        $(document).click(function (e) {
            e.stopPropagation();
            if (e.target != $('.dropdown-menu')) {
                $('.navbar-collapse').removeClass('in show');

            }

         

       
        });

       

    }]
});
