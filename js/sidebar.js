$(document).ready(function(){
    
    $("#idebar").mCustomScrollbar({
        theme: "minimal"
    })
    
    $('#sidebarCollapse').on("click", function(){
        $('#sidebar').toggleClass('active');
        //Close dropdowns
        $('.collapse.in').toggleClass('in');
        
        //Adjust aria-expanded attributes or open close arrows
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});