$j(function () {

    /* pseudo without space */
    $j('#divForm input[name=pseudo]').on('keyup', function () {
        $j(this).val($j(this).val().replace(' ', ''));
    });

    /* on submit form */
    $j('#divForm input[type=submit]').on('click', function () {
        var verifyPseudo = signUpVerifyPseudo();
        var verifyEmail = signUpVerifyEmail();
        var verifyPwd = signUpVerifyPwd();

        if (verifyPseudo.isOk && verifyEmail.isOk && verifyPwd.isOk) {
            $j('.signupcontent .msgInfo').removeClass('msgInfoNok');
            $j('.signupcontent .msgInfo').html('&nbsp;');

            $j.post(
                '/user/addUser', {
                    pseudo: $j('#divForm input[name=pseudo]').val(),
                    email: $j('#divForm input[name=email]').val(),
                    pwd: $j('#divForm input[name=pwd]').val()
                }, function(data) {
                    if (data.etat) {
                        $j('.signupcontent .msgInfo').removeClass('msgInfoNok');
                        if(confirm("Votre compte à bien été créer !\n voulez-vous vous connecter ?")) {
                            goToUrl('/user/login');
                        } else {
                            goToUrl('/');
                        }

                    } else {
                        console.log('JSON : ' + JSON.stringify(data));
                        $j('.signupcontent .msgInfo').addClass('msgInfoNok');
                        $j('.signupcontent .msgInfo').html(data.message);
                    }
                });
        } else {
            $j('.signupcontent .msgInfo').addClass('msgInfoNok');

            if (!verifyPseudo.isOk) {
                $j('.signupcontent .msgInfo').html(verifyPseudo.message);
            } else if (!verifyEmail.isOk) {
                $j('.signupcontent .msgInfo').html(verifyEmail.message);
            } else if (!verifyPwd.isOk) {
                $j('.signupcontent .msgInfo').html(verifyPwd.message);
            }
        }
    });

});

function signUpVerifyPseudo() {
    if ($j('#divForm input[name=pseudo]').val().length >= $j('#divForm input[name=pseudo]').attr('minlength')) {
        return {isOk: true};
    } else {
        return {isOk: false, message: 'Pseudo : au moins ' + $j('#divForm input[name=pseudo]').attr('minlength') + ' caractères.'};
    }
}

function signUpVerifyEmail() {
    var regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/;

    if (regexEmail.test($j('#divForm input[name=email]').val())) {
        return {isOk: true};
    } else {
        return {isOk: false, message: 'Email : veuillez saisir une adresse valide'};
    }
}

function signUpVerifyPwd(){
    if ($j('#divForm input[name=pwd]').val().length >= $j('#divForm input[name=pwd]').attr('minlength')) {
        return {isOk: true};
    } else {
        return {isOk: false, message: 'Mot de passe : au moins ' + $j('#divForm input[name=pwd]').attr('minlength') + ' caractères.'};
    }
}