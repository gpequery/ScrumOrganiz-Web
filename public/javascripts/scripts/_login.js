$j(function () {
    $j('#divFormLogin input[type=submit]').on('click', function () {
        $j('.loginContent .msgInfo').removeClass('msgInfoNok');
        $j('.loginContent .msgInfo').html('&nbsp;');

        $j.post(
            '/user/loginUser', {
                pseudo: $j('#divFormLogin input[name=pseudo]').val(),
                password: $j('#divFormLogin input[name=pwd]').val()
            }, function (data) {
                if (data.etat) {
                    $j('.loginContent .msgInfo').removeClass('msgInfoNok');
                    goToUrl('/board');
                } else {
                    $j('.loginContent .msgInfo').addClass('msgInfoNok');
                    $j('.loginContent .msgInfo').html(data.message);
                }
            });
    });
});