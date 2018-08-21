angular.
module('about').
component('about', {
    templateUrl: "about/about.component.html",
    controller: ['LangChoice','$scope', function homeController(LangChoice,$scope){
        $scope.langPos = LangChoice.langPos;
        
        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
            });
        }, 0);
    
}]
});
