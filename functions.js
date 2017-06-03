const nodemailer = require('nodemailer');

/* LOGIN : Vérify informations formats */
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

sendMail = function (emailToSend, action) {
    let confEmail = allConfig.get('conf_email_orga').acces;

    let transporter = nodemailer.createTransport({
        service: confEmail.service,
        auth: {
            user: confEmail.login,
            pass:  confEmail.password
        }
    });

    /* get infos by actions (subject and content */
    let infos;
    let actions = allConfig.get('conf_email_orga').actions;
    switch (action) {
        case actions.forget_password:
            infos = getHtmlForForgetPasswordEmail();
            break;
    }

    let mailOptions = {
        from: confEmail.login,
        to: emailToSend,
        subject: infos.subject,
        html: infos.content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.warn(error);
            return false;
        }
        console.info('Message send: ' + info.response);
        return true
    });

    transporter.close();
};

function getHtmlForForgetPasswordEmail() {
    let object = 'Le sujet ! ';
    let content = 'Le contenue du mail';

    content = '<form method="post" action="http://google.fr"><input type="submit" value="Click"> </form>';

    return {object: object, content: content};
}

