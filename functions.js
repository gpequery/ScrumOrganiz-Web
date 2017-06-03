/* Vérify informatiosn formats */
services_add_user_verify_info = function (messages, userRules, pseudo, email, password) {
    if (typeof pseudo == 'undefined' || pseudo.length < userRules.pseudo_min_length) {
        return {etat: false, message: messages.pseudo_min_length};
    }
    else if (!new RegExp(userRules.email_regex).test(email)) {
        return {etat: false, message: messages.mail_format};
    }
    else if (typeof password == 'undefined' || password.length < userRules.password_min_length) {
        return {etat: false, message: messages.password_min_length};
    } else {
        return {etat: true};
    }
};

foo = function () {
    console.log('foo!');
};

