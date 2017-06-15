$j(function () {

    /* pseudo without space */
    $j('.settingContent input[name=pseudo]').on('keyup', function () {
        $j(this).val($j(this).val().replace(' ', ''));
    });

    /* infos new info */
    $j('.settingContent input[name=pseudo], .settingContent input[name=email]').on('change', function () {
        /* verify if info if the current account info */
        if($j('.settingContent input[name=pseudo]').val() == $j('.settingContent input[name=pseudo]').attr('data-default') && $j('.settingContent input[name=email]').val() == $j('.settingContent input[name=email]').attr('data-default')) {
            $j('.settingContent input[type=submit]#account').attr('disabled', 'disabled');
        } else {
            $j.post(
                '/user/verifyNewInfo', {
                    pseudo: $j('.settingContent input[name=pseudo]').val(),
                    email: $j('.settingContent input[name=email]').val()
                }, function (data) {
                    if (data.etat) {
                        $j('.settingContent .msgInfo-large').removeClass('msgInfoNok');

                        $j('.settingContent input[type=submit]#account').attr('disabled', false);
                        $j('.settingContent .msgInfo-large').html('&nbsp;');
                    } else {
                        $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');
                        $j('.settingContent .msgInfo-large').addClass('msgInfoNok');

                        $j('.settingContent input[type=submit]#account').attr('disabled', 'disabled');
                        $j('.settingContent .msgInfo-large').html(data.message);
                    }
                });
        }
    });

    $j('.settingContent input[type=submit]#account').on('click', function(){
        $j.post(
            '/user/updateInfo', {
                pseudo: $j('.settingContent input[name=pseudo]').val(),
                email: $j('.settingContent input[name=email]').val()
            }, function (data) {
                if (data.etat) {
                    $j('.settingContent .msgInfo-large').removeClass('msgInfoNok');
                    $j('.settingContent .msgInfo-large').addClass('msgInfoOk');

                    $j('.settingContent input[type=submit]#account').attr('disabled', 'disabled');
                } else {
                    $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');
                    $j('.settingContent .msgInfo-large').addClass('msgInfoNok');

                    $j('.settingContent input[type=submit]#account').attr('disabled', false);
                }
                $j('.settingContent .msgInfo-large').html(data.message);
            });
    });
});
