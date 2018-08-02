angular.module('core.lc').factory('LangChoice', function() {
    var langPos = 0;
    var langOptions = ["Chinese", "English"];
    
    /* what a function */
    function switchLang() {
        if (langPos == 0) {
            langPos = 1;
        }
        else {
            langPos = 0;
        }
        return langPos;
    }
        
    return {
        langPos: langPos,
        langOptions: langOptions,
        switchLang: switchLang
    };
});
