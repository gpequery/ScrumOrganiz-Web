$j('#divFormForget input[type=submit]').on('click', function () {
    $j('.loginContent .msgInfo').removeClass('msgInfoNok');
    $j('.loginContent .msgInfo').html('&nbsp;');

    $j.post(
        '/user/forgetPwd', {
            email: $j('#divFormForget input[name=email]').val()
        }, function (data) {
            console.log('data : ' + data);
            // if (data.etat) {
            //     $j('.loginContent .msgInfo').removeClass('msgInfoNok');
            //     console.log('Connexion !');
            // } else {
            //     $j('.loginContent .msgInfo').addClass('msgInfoNok');
            //     $j('.loginContent .msgInfo').html(data.message);
            // }
        });
});
