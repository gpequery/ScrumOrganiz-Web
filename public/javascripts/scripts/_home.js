$j(function () {
    /* DOWNLOAD DESKTOP API */
    $j('.desktopApi .downloadApi').on('click', function() {
        top.location.href = '/desktopApi/monApi.jar';
    });
});