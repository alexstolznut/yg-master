angular.module('core.lc').factory('LangChoice', function () {
    var langOptions = ["Chinese", "English"];
    var langPos = 0;
    /* what a function */
    function switchLang() {
        if (langPos == 0) {
            langPos = 1;
        } else {
            langPos = 0;
        }
        window.console.log("service: " + langPos);
        return langPos;
    }

    return {
        langPos: langPos,
        langOptions: langOptions,
        switchLang: switchLang
    };
});
