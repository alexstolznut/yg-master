angular.module('contact').
component('contact', {
    templateUrl: "contact/contact.component.html",
    controller:["$scope", "emService",function($scope,emService){
        $scope.sendMail = function(){
            window.console.log("submit");
            var form = document.getElementById('contact-form');
            emService.sendMail(form);
            form.reset();
            
        }
        
       
    }]
});
