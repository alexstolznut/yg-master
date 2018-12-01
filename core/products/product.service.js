angular.
module('core.products').
factory('Product',
    function ($q, $http) {
        var client = window.ShopifyBuy.buildClient({
            domain: 'yongtai-ginseng.myshopify.com',
            storefrontAccessToken: 'b787e9f392b579d00b2a3405e04b11bd'
        });

        //create a checkout instance so the customer can add
        //items to their carts
        var checkout;
        client.checkout.create().then((c) => {
            checkout = c;
        });

        var checkoutInfo = {
            totalItems: 0,
            totalPrice: '0.00',
            c: checkout
        };

        //var products = [];
        var products = {};

        //the items object must refer to the same memory address
        //throughout the application lifecycle
        var items = {};
        
        //boolean flag to prevent reloading of product data
        var fetchAllCompleted = false;

        /* Fetch up to 250 products from the shopify API. The product list is generated from a subset of the fields returned in the shopify json object. 
        Output:
            products: A list of product information dictionaries
            available keys: 
                id: product id assigned by shopify
                title: complete title, english and chinese
                title-ch: chinese title only
                title-en: english title only
                tags: list of tags assigned from the shopify store
                type: product type assigned from the shopify store
                pic_urls: list containing urls for product images
                vars: a list of variant information dictionaries. Each dictionary has the following available keys:
                    id: variant id as assigned by shopify
                    weight: weight of the variant
                    price: price of the variant
                    available: availability of variant
        */
        



        function getProducts() {
            //This function returns a promise. This is necessary so that products can be assigned to a non-null value once the .then() function has been called in the controller class
            var deferred = $q.defer();

            //if the products have already been loaded, resolve the promise and return products. This allows you to refer to the products list across a number of controllers
            if (fetchAllCompleted) {
                deferred.resolve(products);
            } else {
                
                client.product.fetchAll(250).then((products_complete) => {
                    //regular expression to parse english and chinese titles
                    let re = /\（[A-Za-z\s0-9\（\）\/\-]+\）/gmi;
                    let wordre = /\ (?:^|\W)\(\)(?:$|\W) /;
                    let ED = "ED:";
                    let CD = "CD:";
                    let EU = "EU:";
                    let CU = "CU:";
                    let EB = "EB:";
                    let CB = "CB:"
                    

                    var i;
                    for (i = 0; i < products_complete.length; i++) {
                        let product_tmp = products_complete[i];
                        var test = product_tmp['variants'];
                       
                       
                        let product = {};
                        //add name and tags
                        product['id'] = product_tmp['id'];
                        product['title'] = product_tmp['title'];
                        product['description'] = product_tmp['description'];
                        var description = product['description'];

                        //the title is expected in the form 
                        // chinese (english)
                        let breakPoint = product['title'].search(re);
                        let wordBreakPoint = product['description'].search(re);
                        product['description-en'] = description.slice(description.indexOf(ED) + ED.length, description.indexOf(CD)).trim();
                        product['description-ch'] = description.slice(description.indexOf(CD) + CD.length, description.indexOf(EB)).trim();
                        product['benefits-en'] = description.slice(description.indexOf(EB) + EB.length, description.indexOf(CB)).trim();
                        product['benefits-ch'] = description.slice(description.indexOf(CB) + CD.length, description.indexOf(EU)).trim();
                        product['uses-en'] = description.slice(description.indexOf(EU) + EU.length + 2,
                            description.indexOf(CU)).trim();
                        product['uses-en'] = product['uses-en'].split('*');
                        product['uses-ch'] = description.slice(description.indexOf(CU) + CU.length + 2, description.length).trim().split("*");
                        product['title-ch'] = product['title'].slice(0, breakPoint);
                        product['title-en'] = product['title'].slice(breakPoint + 1, -1);
                        product['tags'] = product_tmp['tags'];
                        window.console.log(product['tags']);
                        product['type'] = product_tmp['productType'];
                        product['pic_urls'] = [];
                        product['sku'] = product_tmp['variants'][0]['sku'];
                        
                        //add the images 
                        for (var j in product_tmp['images']) {
                            if (product_tmp['images'][j]['src'] != null) {
                                product['pic_urls'].push(product_tmp['images'][j]['src']);
                            }
                        }
                        //add the variants
                        product['vars'] = []
                        for (var k in product_tmp['variants']) {
                            let i = product_tmp['variants'][k]['id'];
                            let w = product_tmp['variants'][k]['weight'];
                            let p = product_tmp['variants'][k]['price'];
                            let a = product_tmp['variants'][k]['available'];
                            if (!((typeof w == 'undefined') && (typeof p == 'undefined') && (typeof a == 'undefined'))) {
                                product['vars'].push({
                                    'id': i,
                                    'weight': w,
                                    'price': p,
                                    'available': a
                                });
                            }
                        }
                        //add the current product to the final list. Only products with at least one image and one variant will be added. 
                        if (('title' in product) && ('tags' in product) &&
                            (product['pic_urls'].length != 0) && (product['vars'].length != 0)) {
                            //products.push(product);
                            products[product['id']] = product;
                        }
                    }
                    //set the boolean flag and resolve the promise
                    fetchAllCompleted = true;
                    //console.log(products.length);
                    deferred.resolve(products);
                });
            }
            //return a promise object to whatever object (most likely a controller) is calling the getProducts function
            return deferred.promise;
        }

        
        function sortTags(products) {
            return getProducts().then((products) => {
            var products = products;
//            $scope.sortTags($scope.products);
//            window.console.log($scope.sortTags);
        
//            $scope.sortTags($scope.products);
                     var JSONProducts = JSON.stringify(products);
            var arr = [];
            var tagsArr = []
            var productTags = [];
            for (var tags in products) {
                if (products.hasOwnProperty(tags)) {
                    arr.push([tags, products[tags]]);

                }

                for (var i = 0; i < arr.length; i = i + 1) {
                    //                    arr = arr.splice(0,1);
                    for (var h = 0; h < arr[i][1].tags.length; h = h + 1) {
                        if (tagsArr.includes(arr[i][1].tags[h].value) === false) {
                            tagsArr.push(arr[i][1].tags[h].value);
                        }
                    }

                    //                    window.console.log(arr[i][1].tags);
                }
            }
                
            const titleCase = function(str) {
            return str.replace(/\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toLocaleUpperCase() + txt.substring(1).toLocaleLowerCase()
                }
            );
        }
                
                for(var g = 0; g < tagsArr.length; g = g + 1){
                productTags.push(titleCase(tagsArr[g]));
            } 
            return productTags;
        });
            
        }
    

        /*Add an item to the cart. 
            Input: 
                itemId: item id as assigned by shopify
                q: quantity to add. Default is 1. 
        */
        
        function addItem(itemId, q = 1) {
            //this function returns a promise

            var addItemDef = $q.defer();

            let toAdd = [{
                variantId: itemId,
                quantity: q
        }];

            //call the shopify API to add the items
            client.checkout.addLineItems(checkout.id, toAdd).then((tempCheckout) => {
                //parse the results 
                var d = JSON.parse(JSON.stringify(tempCheckout.lineItems));
                //check if there are differences between the new items in the checkout and the service's local item dictionary.
                //if so, update
                let re = /\（[A-Za-z\s0-9\（\）\/\-]+\）/gmi;
                for (var i = 0; i < d.length; i++) {

                    let breakPoint = d[i]['title'].search(re);
                    let curId = d[i]['id'];
                    //add a new item
                    if (!(curId in items)) {
                        //console.log('should add the item')
                        items[curId] = d[i];
                    } else {
                        //check that the quantities match
                        if (items[curId]['quantity'] != d[i]['quantity']) {
                            items[curId]['quantity'] = d[i]['quantity'];
                        }

                    }
                    items[curId]['title-ch'] = d[i]['title'].slice(0, breakPoint);
                    items[curId]['title-en'] = d[i]['title'].slice(breakPoint + 1, -1);

                }
                //update the checkout info
                checkoutInfo['totalItems'] = countTotalItems();
                checkoutInfo['totalPrice'] = tempCheckout['totalPrice'];
                checkoutInfo['c'] = tempCheckout;
                //resolve the promise. Since items is a local variable, there is no need to return any value
                addItemDef.resolve();
            });
            return addItemDef.promise;
        }

        /* Remove an item from the cart. 
            Input:
                itemId: id of item to remove
        */
        function removeItem(itemId) {
            //this function returns a promise
            var removeItemDef = $q.defer();
            client.checkout.removeLineItems(checkout.id, itemId).then((tempCheckout) => {
                //need to remove the key from items
                delete items[itemId];
                //update the checkoutInfo
                checkoutInfo['totalItems'] = countTotalItems();
                checkoutInfo['totalPrice'] = tempCheckout['totalPrice'];
                checkoutInfo['c'] = tempCheckout;
                removeItemDef.resolve();
            });
            return removeItemDef.promise;
        }

        /* Update an item in the cart
            Input:
                itemId: id of item to update
                q: new quantity
        */
        function updateItem(itemId, q) {
            //this function returns a promise
            var updateItemDef = $q.defer();

            let toUpdate = [{
                id: itemId,
                quantity: q
        }];

            client.checkout.updateLineItems(checkout.id, toUpdate).then((tempCheckout) => {
                if (items[itemId]['quantity'] != q) {
                    items[itemId]['quantity'] = q;
                }
                //update the checkout info
                checkoutInfo['totalItems'] = countTotalItems();
                checkoutInfo['totalPrice'] = tempCheckout['totalPrice'];
                checkoutInfo['c'] = tempCheckout;
                updateItemDef.resolve();
            });
            return updateItemDef.promise;
        }

        /* Generate a shopify checkout url */
        function getCheckout() {
            var checkoutDef = $q.defer();

            client.checkout.fetch(checkout.id).then((tempCheckout) => {
                checkoutDef.resolve(tempCheckout['webUrl']);
            });

            return checkoutDef.promise;
        }

        /* 
        Count the total number of items in the cart.
        Output: 
            numItems: integer number of items in cart. 
        */
        function countTotalItems() {
            let numItems = 0;
            for (let id in items) {
                numItems += items[id]['quantity'];
            }
            return numItems;
        }
       
        /* Make the local functions and variables accessible to external code */
        return {
            getProducts: getProducts,
            getCheckout: getCheckout,
            addItem: addItem,
            removeItem: removeItem,
            updateItem: updateItem,
            items: items,
            checkoutInfo: checkoutInfo,
            sortTags: sortTags
        };
    });
