$j(function () {
    /* Enables POST navigation everywhere */
    $j('.headOption.pseudo').on('click', function() {
        $j('.popinHeaderRight.pseudo').css('display') == 'none' ? $j('.popinHeaderRight.pseudo').show('slow') : $j('.popinHeaderRight.pseudo').hide('slow');
    });

});
