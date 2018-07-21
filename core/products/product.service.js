angular.
  module('core.products').
  factory('Product',
    function($q) {
       var client = window.ShopifyBuy.buildClient({
        domain: 'yongtai-ginseng.myshopify.com',
        storefrontAccessToken: 'b787e9f392b579d00b2a3405e04b11bd'
    });

    var testProducts = [ 'product 1', 'product 2', 'product 3'];

    var products = [];

    var fetchAllCompleted = false;

    function getProducts() {
        var deferred = $q.defer();

        if (fetchAllCompleted) {
            deferred.resolve(products);
        }
        else {
            client.product.fetchAll().then((products_complete) => {
                //regular expression to parse titles
                let re = /\（[A-Za-z\s0-9\（\）\/\-]+\）/gmi;
                //for (var i in products_complete) {
                var i;
                for (i = 0; i < products_complete.length; i++) {
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
                    //add the current product to the final list
                    if (('title' in product) && ('tags' in product) &&
                        (product['pic_urls'].length != 0) && (product['vars'].length != 0)) {
                        products.push(product);
                    }
                }
                fetchAllCompleted = true;
                deferred.resolve(products);
            });
        }
        return deferred.promise;
    }
    window.console.log(getProducts());
    return {
        getProducts: getProducts,
        testProducts: testProducts
    };
});