$j(function () {

    /* pseudo without space */
    $j('.settingContent input[name=pseudo]').on('keyup', function () {
        $j(this).val($j(this).val().replace(' ', ''));
    });

    /* confirm password before change infos */
    $j('.settingContent input[name=confPwd]').on('keyup', function () {
        $j.post(
            '/user/verifyCurrentPassword', {
                pwd: $j(this).val(),
                date: new Date()
            }, function (data) {
                if (data.etat) {
                    $j('.settingContent .msgInfo-large').removeClass('msgInfoNok');
                    $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');
                    $j('.settingContent .msgInfo-large').html('&nbsp;');

                    $j('.divSetting input[type=text], .divSetting input[type=password], .divSetting input[type=email]').attr('disabled', false);
                } else {
                    $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');
                    $j('.settingContent .msgInfo-large').addClass('msgInfoNok');

                    $j('.settingContent .msgInfo-large').html(data.message);

                    $j('.divSetting input').attr('disabled', 'disabled');

                    /* remake default value if bad password */
                    $j('.settingContent input[name=pseudo]').val($j('.settingContent input[name=pseudo]').attr('data-default'));
                    $j('.settingContent input[name=email]').val($j('.settingContent input[name=email]').attr('data-default'));
                    $j('.settingContent input[name=pwd1]').val('');
                    $j('.settingContent input[name=pwd2]').val('');
                }
            });
    });

    /* infos new info */
    $j('.settingContent input[name=pseudo], .settingContent input[name=email]').on('keyup', function () {
        /* verify if info if the current account info */
        if($j('.settingContent input[name=pseudo]').val() == $j('.settingContent input[name=pseudo]').attr('data-default') && $j('.settingContent input[name=email]').val() == $j('.settingContent input[name=email]').attr('data-default')) {
            $j('.settingContent input[type=submit]#account').attr('disabled', 'disabled');
            $j('.settingContent .msgInfo-large').removeClass('msgInfoNok');
            $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');

            $j('.settingContent .msgInfo-large').html('&nbsp;');
        } else {
            $j.post(
                '/user/verifyNewInfo', {
                    pseudo: $j('.settingContent input[name=pseudo]').val(),
                    email: $j('.settingContent input[name=email]').val(),
                    date: new Date()
                }, function (data) {
                    if (data.etat) {
                        $j('.settingContent .msgInfo-large').removeClass('msgInfoNok');
                        $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');

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

    /* update info */
    $j('.settingContent input[type=submit]#account').on('click', function(){
        $j.post(
            '/user/updateInfo', {
                pseudo: $j('.settingContent input[name=pseudo]').val(),
                email: $j('.settingContent input[name=email]').val(),
                date: new Date()
            }, function (data) {
                if (data.etat) {
                    $j('.settingContent input[name=pseudo]').attr('data-default', $j('.settingContent input[name=pseudo]').val());
                    $j('.settingContent input[name=email]').attr('data-default', $j('.settingContent input[name=email]').val());

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

    /* verify password */
    $j('.settingContent input[name=pwd1], .settingContent input[name=pwd2]').on('keyup', function () {
        if ($j('.settingContent input[name=pwd1]').val() != '' && $j('.settingContent input[name=pwd2]').val() != '') {
            $j.post(
                '/user/verifyNewPassword', {
                    pwd1: $j('.settingContent input[name=pwd1]').val(),
                    pwd2: $j('.settingContent input[name=pwd2]').val(),
                    date: new Date()
                }, function (data) {
                    if (data.etat) {
                        $j('.settingContent .msgInfo-large').removeClass('msgInfoNok');
                        $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');
                        $j('.settingContent .msgInfo-large').html('&nbsp;');

                        $j('.settingContent input[type=submit]#password').attr('disabled', false);
                    } else {
                        $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');
                        $j('.settingContent .msgInfo-large').addClass('msgInfoNok');

                        $j('.settingContent input[type=submit]#password').attr('disabled', 'disabled');
                        $j('.settingContent .msgInfo-large').html(data.message);
                    }
                });
        } else {
            $j('.settingContent input[type=submit]#password').attr('disabled', 'disabled');
        }
    });

    /* update password */
    $j('.settingContent input[type=submit]#password').on('click', function(){
        $j.post(
            '/user/updatePassword', {
                pwd1: $j('.settingContent input[name=pwd1]').val(),
                pwd2: $j('.settingContent input[name=pwd2]').val(),
                date: new Date()
            }, function (data) {
                if (data.etat) {
                    $j('.settingContent .msgInfo-large').removeClass('msgInfoNok');
                    $j('.settingContent .msgInfo-large').addClass('msgInfoOk');

                    $j('.settingContent input[name=pwd1]').val('');
                    $j('.settingContent input[name=pwd2]').val('');

                    $j('.settingContent input[type=submit]#password').attr('disabled', 'disabled');
                } else {
                    $j('.settingContent .msgInfo-large').removeClass('msgInfoOk');
                    $j('.settingContent .msgInfo-large').addClass('msgInfoNok');

                    $j('.settingContent input[type=submit]#password').attr('disabled', false);
                }

                $j('.settingContent .msgInfo-large').html(data.message);
            });
    });
});
