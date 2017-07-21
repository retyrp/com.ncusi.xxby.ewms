$(document).ready(function() {
    $(".menu_li").hover(function() {
        var E = $(this).attr("id");
        if (E == "KJGL") {
            $(this).find(".menu_sub").hide()
        } else {
            $(this).find(".menu_sub").show(0)
        }
    },
    function() {
        $(this).find(".menu_sub").hide()
        });
});




