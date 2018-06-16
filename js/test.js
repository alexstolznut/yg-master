        var products_complete;
        var products = [];
        var finalProducts;

        //init the client
        const client = window.ShopifyBuy.buildClient({
            domain: 'yongtai-ginseng.myshopify.com',
            storefrontAccessToken: 'b787e9f392b579d00b2a3405e04b11bd'
        });

        //get the complete product listings from shopify
        client.product.fetchAll().then((raw_products) => {
            products_complete = raw_products;
            reduce_products();
        });
        //reduce the products list down to necessary information
        function reduce_products() {
            //console.log(JSON.stringify(products_complete,null,4));
            for (var i in products_complete) {
                var product_tmp = products_complete[i];
                var product = {};
                //add name and tags
                product['title'] = product_tmp['title'];
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
                    var w = product_tmp['variants'][k]['weight'];
                    var p = product_tmp['variants'][k]['price'];
                    var a = product_tmp['variants'][k]['available'];
                    if (!((typeof w == 'undefined') && (typeof p == 'undefined') && (typeof a == 'undefined'))) {
                        product['vars'].push({
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
                fs.writeFile("./test.json", JSON.stringify(product, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                    console.log("File has been created");
                });
            }
        }

        //log the contents of products object to console 
        function print_products() {
            for (var p in products) {
                finalProducts.push(products[p]);
//                console.log(JSON.stringify(products[p], null, 4));

            }
            window.consle.log(finalProducts + "fuck");
        }