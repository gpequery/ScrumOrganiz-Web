$j('#divFormForget input[type=submit]').on('click', function () {
    $j('.loginContent .msgInfo').removeClass('msgInfoNok');
    $j('.loginContent .msgInfo').html('&nbsp;');

    $j.post(
        '/user/forgetPwd', {
            pseudo: $j('#divFormForget input[name=pseudo]').val(),
            email: $j('#divFormForget input[name=email]').val()
        }, function (data) {
            console.log('data : ' + JSON.stringify(data));
            // if (data.etat) {
            //     $j('.loginContent .msgInfo').removeClass('msgInfoNok');
            //     console.log('Connexion !');
            // } else {
            //     $j('.loginContent .msgInfo').addClass('msgInfoNok');
            //     $j('.loginContent .msgInfo').html(data.message);
            // }
        });
});
