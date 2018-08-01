angular.
module('home').
component('home', {
    templateUrl: "home/home.component.html",
    controller: [ 'LangChoice', 'Product', '$scope', function HomeController (LangChoice, Product, $scope){
        //assign the products
        this.specialValues = [];
        this.popularValues = [];
        this.newArrivals = []
        
        this.langPos = 0;
        this.langOptions = LangChoice.langOptions;
        
        this.switchLang = function () {
            this.langPos = LangChoice.switchLang();
        }
        
        Product.getProducts().then( (p) => {
            this.products = p;
            var objectVals = (Object.values(this.products));
            for(var i = 0; i<objectVals.length; i = i + 1){
                for(var j = 0; j<objectVals[i].tags.length; j = j + 1){
//                    window.console.log(objectVals[i])
                    if(objectVals[i].tags[j].value === 'special'){
                        this.specialValues.push(objectVals[i]);
                        
                    } else if(objectVals[i].tags[j].value === 'popular'){
                        this.popularValues.push(objectVals[i]);
                    } else if(objectVals[i].tags[j].value.toLowerCase() === 'new arrival'){
                        this.newArrivals.push(objectVals[i]);
                    }

                }
//           window.console.log(objectVals[i].tags.length)
            }
        });
        
//        window.console.log(this.specialValues);
//        window.console.log(this.popularValues);
        window.console.log(this.newArrivals);
        this.LanguageChoice = LangChoice.langOptions[LangChoice.langPos];
        
        
        //this.langOptions = LangChoice.langOptions;
        
        //this.langPos = LangChoice.langPos;
        
        //this.switchLang = LangChoice.switchLang;

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
