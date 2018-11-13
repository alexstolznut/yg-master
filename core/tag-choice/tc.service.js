angular.module('core.tc').factory('TagChoice', function () {
    //    var currentTagValue;
    var tagChoice

    function changeCurrentTagValue(value) {
        tagChoice = value;
        return tagChoice;

    }
    
    

    return {
        changeTag: changeCurrentTagValue,
        tagChoice: tagChoice
    };
});
