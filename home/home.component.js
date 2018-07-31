angular.
module('home').
component('home', {
    templateUrl: "home/home.component.html",
    controller: [ 'Product', '$scope', function HomeController (Product, $scope){
        //assign the products
        Product.getProducts().then( (p) => {
            this.products = p;
        });
        
        this.langOptions = ["English", "Chinese"];
        
        this.langPos = 0;
        
        this.switchLang = function () {
            if (this.langPos == 0) {
                this.langPos = 1;
            }
            else {
                this.langPos = 0;
            }
        }
        
        this.logLang = function () {
            console.log(this.langPos);
            console.log("Is this working?");
        }
        /*
    Filter function for product map object since the prebuilt | filter: function cannot operate on maps. See 
    https://stackoverflow.com/questions/14788652/how-to-filter-key-value-with-ng-repeat-in-angularjs

    for more info.
        Input: 
            match: a string to match against the tags array. The match must be a substring of some tag for the function to return true
        Output: 
            boolean isFound: true is match is found, false otherwise
    */
        $scope.mapFilter = function (match, product) {
            let i = 0;
            for (i; i<product['tags'].length; i++){
                if (product['tags'][i]['value'].indexOf(match) != -1) {
                    return true;
                }
            }
            return false;
        }
    }]
});
