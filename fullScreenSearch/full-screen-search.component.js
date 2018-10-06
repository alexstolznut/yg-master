angular.
module('fullScreenSearch').
component('fullScreenSearch', {
    templateUrl: "fullScreenSearch/full-screen-search.component.html",
    controller: ['LangChoice', 'Product', '$scope', function HomeController(LangChoice, Product, $scope) {
        //assign the products
        $scope.langPos = LangChoice.langPos;
        setInterval(function () {
            $scope.$apply(function () {
                $scope.langPos = LangChoice.langPos;
            });
        }, 0);
        //        $scope.langPos = LangChoice.langPos;
        this.langOptions = LangChoice.langOptions;

        $scope.show = false;

        this.switchLang = function () {
            if ($scope.langPos === 0) {
                LangChoice.langPos = 1;
            } else {
                LangChoice.langPos = 0;
            }
            $scope.langPos = LangChoice.langPos;

        }

        Product.getProducts().then((products) => {
            this.products = products;

            $scope.products = Object.values(this.products);


        });

        $(document).ready(function () {
            $('.nav-search-icon').click(function () {
                $('.search').toggleClass("active");
            })


        });

        //        $("input.fullscreen-input").on("focus",function(){
        //                $(".search-menu").css("display","block");
        //            })
        $("input.fullscreen-input").focusout(function () {
            $('.search').removeClass('active')
            $('input.fullscreen-input').val = "";
        });

        $('.search.search-icon').click(function () {
            $('input.fullscreen-input').val = "";
            $('input.fullscreen-input').focus();
        });

        $(document).click(function (e) {
            e.stopPropagation();
            if (e.target != $('.search')) {
                $('.navbar-collapse').removeClass('in show');

            }
        })

        if ($('input.fullscreen-input').css("display") == "block") {
            $(document).click(function (e) {
                e.stopPropagation();
                if (e.target != $('.fullscreen-input')) {
                    $('.search.active').removeClass('.active');
                }
            })
        }


}]
});
