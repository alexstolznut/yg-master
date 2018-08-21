angular.
module('home').
component('home', {
    templateUrl: "home/home.component.html",
    controller: ['LangChoice', 'Product', '$scope', function HomeController(LangChoice, Product, $scope) {
        //assign the products
        this.specialValues = [];
        this.popularValues = [];
        this.newArrivals = []
        $scope.maxItems = 6;
        $scope.langPos = LangChoice.langPos;
        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
            });
        }, 0);
        //        $scope.langPos = LangChoice.langPos;
        this.langOptions = LangChoice.langOptions;



        this.switchLang = function () {
            if ($scope.langPos === 0) {
                LangChoice.langPos = 1;
            } else {
                LangChoice.langPos = 0;
            }
            $scope.langPos = LangChoice.langPos;
            window.console.log(LangChoice);
        }


        Product.getProducts().then((p) => {
            this.products = p;
            var objectVals = (Object.values(this.products));
            for (var i = 0; i < objectVals.length; i = i + 1) {
                for (var j = 0; j < objectVals[i].tags.length; j = j + 1) {
                    //                    window.console.log(objectVals[i])
                    if (objectVals[i].tags[j].value === 'special') {
                        this.specialValues.push(objectVals[i]);

                    } else if (objectVals[i].tags[j].value === 'popular') {
                        this.popularValues.push(objectVals[i]);
                    } else if (objectVals[i].tags[j].value.toLowerCase() === 'new arrival') {
                        this.newArrivals.push(objectVals[i]);
                    }

                }
                //           window.console.log(objectVals[i].tags.length)
            }
        });

        //        window.console.log(this.specialValues);
        //        window.console.log(this.popularValues);
        window.console.log(this.newArrivals);
        this.LanguageChoice = LangChoice.langOptions[$scope.langPos];


        //this.langOptions = LangChoice.langOptions;

        //this.langPos = LangChoice.langPos;

        //this.switchLang = LangChoice.switchLang;

        /*
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
        this.addItem = function (itemId, q) {
            Product.addItem(itemId, q).then(() => {
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
                //If you want to see where this will direct you,
                //console.log(url);
                window.location.href = url;
            });
        }
        //    Filter function for product map object since the prebuilt | filter: function cannot operate on maps. See 
        //    https://stackoverflow.com/questions/14788652/how-to-filter-key-value-with-ng-repeat-in-angularjs
        //
        //    for more info.
        //        Input: 
        //            match: a string to match against the tags array. The match must be a substring of some tag for the function to return true
        //        Output: 
        //            boolean isFound: true is match is found, false otherwise
        //    */
        $scope.mapFilter = function (match, product) {
            let i = 0;
            for (i; i < product['tags'].length; i++) {
                if (product['tags'][i]['value'].indexOf(match) != -1) {
                    return true;
                }
            }
            return false;
        }
    }]
});
