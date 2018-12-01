angular.
module('about').
component('about', {
    templateUrl: "about/about.component.html",
    controller: ['LangChoice', 'emService', '$scope', function (LangChoice, emService, $scope) {

        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
            });
        }, 0);


        $scope.sendMail = function () {
            var form = document.getElementById('contact-form');
            emService.sendMail(form);
            form.reset();

        }

}]
});
