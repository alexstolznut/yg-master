angular.module('core.lang-choice').
factory('Lang-Choice', function () {
    var langPos = 0;
    var langOptions = ["English", "Chinese"];
    
    function switchLang() {
        if (langPos == 0) {
            langPos = 1;
        }
        else {
            langPos = 0;
        }
    }
    
    return {
        langPos: langPos,
        langOptions: langOptions,
        switchLang: switchLang
    }
});