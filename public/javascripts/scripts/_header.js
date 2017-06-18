$j(function () {
    /* open popin */
    $j('.headOption.setting').on('click', function() {
        $j('.popinHeaderRight.pseudo').css('display') == 'none' ? $j('.popinHeaderRight.pseudo').show('slow') : $j('.popinHeaderRight.pseudo').hide('slow');
    });

    /* close session before exit */
    $j('.popinHeaderRight .logout').on('click', function() {
        $j.post(
            '/user/closeSession', {
            }, function () {
                goToUrl('/');
            });
    });
});
