'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('productCard').
component('productCard', {
    templateUrl: "product-card/product-card.component.html",
    controller: ['Product', 'LangChoice', 'TagChoice', '$scope', '$anchorScroll', '$location', '$rootScope', '$routeParams', function ProductCardController(Product, LangChoice, TagChoice, $scope, $anchorScroll, $location, $rootScope, $routeParams) {


        $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
            if ($location.hash()) $anchorScroll();
        });



        $scope.$watch(function () {

            $scope.tagValue = TagChoice.tagChoice;


        })

        $scope.changeCurrentTagValue = function (value) {
            TagChoice.tagChoice = value;

        }
        $scope.changeCurrentTagValue('All');

        $scope.productTags = [];
        Product.getProducts().then((products) => {
            $scope.products = products;
            //            window.console.log($scope.products);

        });

        $scope.sidebar = function () {
            var li = $('#sidebar > ul > li.sidebar-nav');
            for (var i = 0; i < li.length; i = i + 1) {
                li[i].addEventListener('click', function (e) {
                  

                    for (var i = 0; i < li.length; i = i + 1) {
                        li[i].setAttribute('class', '');
                    }
                    e.target.parentNode.setAttribute('class', 'sidebar-active');
                });

            }

        };


        Product.sortTags().then((tags) => {
            $scope.tags = tags;
            window.console.log($scope.tags);
        })



        $scope.username = {
            text: 'email',
            word: /^\w*@\w*$/
        }
        $scope.password = {
            text: 'password',
            word: /^\w*$/
        }


        $scope.sortTags = function (products) {
            var JSONProducts = JSON.stringify($scope.products);
            var arr = [];
            var tagsArr = []
            for (var tags in $scope.products) {
                if ($scope.products.hasOwnProperty(tags)) {
                    arr.push([tags, $scope.products[tags]]);

                }

                for (var i = 0; i < arr.length; i = i + 1) {
                    //                    arr = arr.splice(0,1);
                    for (var h = 0; h < arr[i][1].tags.length; h = h + 1) {
                        if (tagsArr.includes(arr[i][1].tags[h].value) === false) {
                            tagsArr.push(arr[i][1].tags[h].value);
                        }
                    }


                }
            }
            for (var g = 0; g < tagsArr.length; g = g + 1) {
                $scope.productTags.push(titleCase(tagsArr[g]));
            }
        }

        const titleCase = function titleCase(str) {
            return str.replace(/\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toLocaleUpperCase() + txt.substring(1).toLocaleLowerCase()
                }
            );
        }

        /* arbitrary max items limit. Currently the number of displayed photos is limited by this constant */
        this.maxItems = 2;

        /* start assigning local variables to those defined in the shop service. The memory address of the shopService variables must remain constant or angular will not update the UI correctly. */
        this.items = Product.items;
        /* Fetch the products from the shopify api. Once the call is returned and the promise resolves, assign the results to products */
        Product.getProducts().then((products) => {
            this.products = products;
        });

        /* Add an item to the cart.
        Input: 
            itemId: product id as assigned by shopify. Available @ product['id'] for each item in products
            q: quantity to add. Default is 1.
        */
        var cartVals, finalVal;
        this.addItem = function (itemId, q) {
            Product.addItem(itemId, q).then(() => {
                $scope.checkoutInfo = Product.checkoutInfo;

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

        /* Generate a shopify checkout url to pay/place the order 
         */
        this.getCheckout = function () {
            Product.getCheckout().then((url) => {
                window.location.href = url;
            });
        }

        //LANG CHOICE 
        $scope.langPos = 0;
        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
            });
        }, 0);

  }]
});
