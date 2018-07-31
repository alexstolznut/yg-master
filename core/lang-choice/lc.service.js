angular.module('core.lc').factory('LangChoice', function() {
    var langPos = 0;
    var langOptions = ["English", "Chinese"];
    
    /* what a function */
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
    };
});

console.log("registered service");