$j(function () {

    /* Enables POST navigation everywhere */
    $j('.navigate').on('click', function() {
        $j('.formNavigate').attr('action', $j(this).attr('data-url'));
        $j('.formNavigate').submit();
    })
});