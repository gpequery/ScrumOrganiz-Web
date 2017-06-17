$j(function () {
    $j('#divFormForget input[type=submit]').on('click', function () {
        $j('.loginContent .msgInfo').removeClass('msgInfoNok');
        $j('.loginContent .msgInfo').html('&nbsp;');

        $j.post(
            '/user/forgetPwd', {
                pseudo: $j('#divFormForget input[name=pseudo]').val(),
                email: $j('#divFormForget input[name=email]').val()
            }, function (data) {
                if (data.etat) {
                    $j('.forgetContent .msgInfo').removeClass('msgInfoNok');
                    $j('.forgetContent .msgInfo').addClass('msgInfoOk');

                    $j('.forgetContent .msgInfo').html(data.message);
                } else {
                    $j('.forgetContent .msgInfo').removeClass('msgInfoOk');
                    $j('.forgetContent .msgInfo').addClass('msgInfoNok');

                    $j('.forgetContent .msgInfo').html(data.message);
                }
            });
    });
});
