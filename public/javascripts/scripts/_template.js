$j(function () {

    /* Enables POST navigation everywhere */
    $j('.navigate').on('click', function() {
        goToUrl($j(this).attr('data-url'));
    });

});

function goToUrl(url) {
    $j('.formNavigate').attr('action', url);
    $j('.formNavigate').submit();
}

