var app = angular.module('homeApp', []);
app.filter('tags', function() {
    return function(input, tag) {
        var txt;
        if(input.tags === tag){
            txt += input.tags
        }
        return txt;
    };
$scope.tags = ["one", "two", "three"];
});