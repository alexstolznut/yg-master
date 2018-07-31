angular.
  module('core.products').
  factory('Product',
    function($q, $http) {
           var client = window.ShopifyBuy.buildClient({
        domain: 'yongtai-ginseng.myshopify.com',
        storefrontAccessToken: 'b787e9f392b579d00b2a3405e04b11bd'
    });

    //create a checkout instance so the customer can add
    //items to their carts
    var checkout;
    client.checkout.create().then( (c) => {
        checkout = c;
    });

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
        }
        else {
            client.product.fetchAll(250).then((products_complete) => {
                //regular expression to parse english and chinese titles
                let re = /\（[A-Za-z\s0-9\（\）\/\-]+\）/gmi;
                var i;
                for (i = 0; i<products_complete.length; i++) {
                    let product_tmp = products_complete[i];
                    let product = {};
                    //add name and tags
                    product['id'] = product_tmp['id'];
                    product['title'] = product_tmp['title'];
                    //the title is expected in the form 
                    // chinese (english)
                    let breakPoint = product['title'].search(re);
                    product['title-ch'] = product['title'].slice(0,breakPoint);
                    product['title-en'] = product['title'].slice(breakPoint+1,-1);
                    product['tags'] = product_tmp['tags'];
                    product['type'] = product_tmp['productType'];
                    product['pic_urls'] = [];
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


    /*Add an item to the cart. 
        Input: 
            itemId: item id as assigned by shopify
            q: quantity to add. Default is 1. 
    */
    function addItem(itemId, q=1) {
        //this function returns a promise
        var addItemDef = $q.defer();

        let toAdd = [{
            variantId: itemId,
            quantity: q
        }];

       //call the shopify API to add the items
        client.checkout.addLineItems(checkout.id,toAdd).then( (tempCheckout) => {
            //parse the results 
            var d = JSON.parse(JSON.stringify(tempCheckout.lineItems));
            //check if there are differences between the new items in the checkout and the service's local item dictionary.
            //if so, update
            for (var i=0;i<d.length;i++) {
                let curId = d[i]['id'];
                //add a new item
                if (!(curId in items)) {
                    //console.log('should add the item')
                    items[curId] = d[i];
                }
                else {
                    //check that the quantities match
                    if (items[curId]['quantity'] != d[i]['quantity']) {
                        items[curId]['quantity'] = d[i]['quantity'];
                    }

                }
            }
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
        client.checkout.removeLineItems(checkout.id,itemId).then( (c) => {
            //need to remove the key from items
            delete items[itemId];
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

        client.checkout.updateLineItems(checkout.id,toUpdate).then( (c) => {
            if (items[itemId]['quantity'] != q) {
                items[itemId]['quantity'] = q;
            }
            updateItemDef.resolve();
        });
        return updateItemDef.promise;
    }

    /* Generate a shopify checkout url */
    function getCheckout() {
        var checkoutDef = $q.defer();

        client.checkout.fetch(checkout.id).then( (tempCheckout) => {
            checkoutDef.resolve(tempCheckout['webUrl']);  
        });

        return checkoutDef.promise;
    }
    
    $http({
        method: "POST",
        url: "https://yongtai-ginseng.myshopify.com/api/graphql/",
        headers: {
            'Content-Type': "application/graphql",
            'X-Shopify-Storefront-Access-Token': 'b787e9f392b579d00b2a3405e04b11bd'
        },
        data: { data: `{
              shop {
                collections(first: 5) {
                  edges {
                    node {
                      id
                      handle
                    }
                  }
                  pageInfo {
                    hasNextPage
                  }
                }
              }
            }`
        }
    }).then( (res) => {
//        console.log(res);
    });

    /* Make the local functions and variables accessible to external code */
    return {
        getProducts: getProducts,
        getCheckout: getCheckout,
        addItem: addItem,
        removeItem: removeItem,
        updateItem: updateItem,
        items: items
    };
});