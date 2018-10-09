angular.
module('about').
component('about', {
    templateUrl: "about/about.component.html",
    controller: ['LangChoice', '$scope', '$http', function homeController(LangChoice, $scope, $http) {
        $scope.langPos = LangChoice.langPos;
        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
            });
        }, 0);
        
        
        $scope.submitForm = function () {
           
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

            const name = $("#userName").val();
            const email = $("#userEmail").val();
            const message = $("#userMessage").val();
            data = {
                'name' : name,
                'email' : email,
                'message' : message,
            };
            
            $http.post('about/form-submit.php', data)
            .success(function(data, status, headers, config){
                window.console.log(status + ' - ' + data);
            })
            .error(function(data, status, headers, config){
                window.console.log('error: ' + status);
            });
        }

}]
});
