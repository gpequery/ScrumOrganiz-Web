$j(function () {

    /* pseudo without space */
    $j('#divFormSignIn input[name=pseudo]').on('keyup', function () {
        $j(this).val($j(this).val().replace(' ', ''));
    });

    /* on submit form */
    $j('#divFormSignIn input[type=submit]').on('click', function () {
        $j('.signupcontent .msgInfo').removeClass('msgInfoNok');
        $j('.signupcontent .msgInfo').html('&nbsp;');

        $j.post(
            '/user/addUser', {
                pseudo: $j('#divFormSignIn input[name=pseudo]').val(),
                email: $j('#divFormSignIn input[name=email]').val(),
                password: $j('#divFormSignIn input[name=pwd]').val()
            }, function (data) {
                if (data.etat) {
                    $j('.signupcontent .msgInfo').removeClass('msgInfoNok');
                    if (confirm("Votre compte à bien été créer !\n voulez-vous vous connecter ?")) {
                        goToUrl('/login');
                    } else {
                        goToUrl('/');
                    }
                } else {
                    $j('.signupcontent .msgInfo').addClass('msgInfoNok');
                    $j('.signupcontent .msgInfo').html(data.message);
                }
            });
    });
});