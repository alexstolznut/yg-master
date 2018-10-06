   let mutation = `
      mutation {
        checkoutCreate(input: {
          email: "dale@dalenguyen.me"
          lineItems: [
            {
              quantity: 1
              variantId: "variant-id"
              customAttributes: {
                key: "key"
                value: "value"
              }
            }
          ]
          shippingAddress: {
            address1: "address"
            city: "Toronto"
            province: "ON"
            zip: "zip"
            country: "Canada"
            firstName: "Dale"
            lastName: "Nguyen"
          }
        }){
          checkout{
            webUrl
          }
        }
      }
    `;
function test(mutation){
        let settings = {
            'async': true,
            'crossDomain': true,
            'url': 'https:/yongtai-ginseng.myshopify.com/admin/api/graphql',
            'method': 'POST',
            'headers': {
                'X-Shopify-Storefront-Access-Token': 'b787e9f392b579d00b2a3405e04b11bd',
                'Content-Type': 'application/graphql',
            },
            'data': mutation
        };
        return data;
        // Get checkout URL from shopify
//        return $.ajax(settings).done(function (response) {
//            console.log(response);
//        });
}
test().then(r => r.json())
        .then(data=>console.log('data returned: ', data));

    window.console.log("hi");

angular.
module('core.customers').
factory('Customers',
    function ($q, $http) {
        var client = window.ShopifyBuy.buildClient({
            domain: 'yongtai-ginseng.myshopify.com',
            storefrontAccessToken: 'b787e9f392b579d00b2a3405e04b11bd'
        });

        fetch('https://yongtai-ginseng.myshopify.com/api/graphql', {
                method: 'POST',
                domain: 'yongtai-ginseng.myshopify.com',
                storefrontAccessToken: 'b787e9f392b579d00b2a3405e04b11bd',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: "{ hello }"
                })
            })
            .then(r => r.json())
            .then(data => console.log('data returned:', data));

        let mutation = `
      mutation {
        checkoutCreate(input: {
          email: "dale@dalenguyen.me"
          lineItems: [
            {
              quantity: 1
              variantId: "variant-id"
              customAttributes: {
                key: "key"
                value: "value"
              }
            }
          ]
          shippingAddress: {
            address1: "address"
            city: "Toronto"
            province: "ON"
            zip: "zip"
            country: "Canada"
            firstName: "Dale"
            lastName: "Nguyen"
          }
        }){
          checkout{
            webUrl
          }
        }
      }
    `;

        let settings = {
            'async': true,
            'crossDomain': true,
            'url': 'https:/yongtai-ginseng.myshopify.com/admin/api/graphql',
            'method': 'POST',
            'headers': {
                'X-Shopify-Storefront-Access-Token': 'b787e9f392b579d00b2a3405e04b11bd',
                'Content-Type': 'application/graphql',
            },
            'data': mutation
        };
        // Get checkout URL from shopify
        return $.ajax(settings).done(function (response) {
            console.log(response);
        });


    window.console.log("hi");

    });
