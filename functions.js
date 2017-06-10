const nodemailer = require('nodemailer');
const crypto = require('crypto-js');

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

/* TestCookieValidation */
verifySession = function(cookie) {
    console.log('test : ' + cookie.id);
};

/*  return how minutes oldDate ago */
howMinutesAgo = function (oldDate) {
    return parseInt((new Date().getTime() - oldDate.getTime()) / 60000);
};

/* send an email*/
sendMail = function (emailToSend, action, infosForEmail) {
    let confEmail = allConfig.get('conf_email_orga').acces;

    let transporter = nodemailer.createTransport({
        service: crypto.AES.decrypt(confEmail.service, allConfig.get('conf_crypto').secrect_key).toString(crypto.enc.Utf8),
        auth: {
            user: crypto.AES.decrypt(confEmail.login, allConfig.get('conf_crypto').secrect_key).toString(crypto.enc.Utf8),
            pass: crypto.AES.decrypt(confEmail.password, allConfig.get('conf_crypto').secrect_key).toString(crypto.enc.Utf8)
        }
    });

    /* get infos by actions (subject and content */
    let infos;
    let actions = allConfig.get('conf_email_orga').actions;
    switch (action) {
        case actions.forget_password:
            infos = getHtmlForForgetPasswordEmail(infosForEmail);
            break;
    }

    let mailOptions = {
        from: confEmail.login,
        to: emailToSend,
        subject: infos.subject,
        html: infos.content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.warn(error);
            return false;
        }
        console.info('Message send: ' + info.response);
        return true
    });

    transporter.close();
};

function getHtmlHeaderEmail(pseudo) {
    let conf_server = allConfig.get('conf_serveur');

    let header = '';

    header +=   '<div style="background-color: #ddd; width: 100%; border-radius: 10px 10px 0 0">';
    header +=           '<img src="' + conf_server.adress + ':' + conf_server.port + '/images/logo/logo-horizontal.png" style="width 20%; vertical-align: middle">';
    header +=   '</div>';

    header +=   '<div style="border: 4px solid #ddd; width: 95.3%; padding: 2%;">';

    header +=       '<div style="margin-bottom: 15px;">';
    header +=           'Bonjour ' + pseudo;
    header +=       '</div>';

    return header;
}

function getHtmlFooterEmail() {
    let nameOrga = allConfig.get('conf_organisation').name;
    let footer = '';

    footer +=  '<div style="margin-top: 15px;">';
    footer +=      'Merci de nous faire confience';
    footer +=  '</div>';

    footer +=  '<div style="margin-top: 20px;text-align: right">';
    footer +=      'L\'équipe ' + nameOrga;
    footer +=  '</div>';

    footer +=   '</div>';

    footer +=   '<div style="background-color: #ddd; width: 100%; border-radius: 0 0 10px 10px; text-align: center;">';
    footer +=           '<div style="vertical-align: middle">&#169; ' + nameOrga + '</div>';
    footer +=   '</div>';

    return footer;
}

function getHtmlForForgetPasswordEmail(infos) {
    let confServer = allConfig.get('conf_serveur');

    let urlData = 'forgetPwd&' + infos.id + '&' + new Date().toISOString();
    let dataCrypted = encodeURI(crypto.AES.encrypt(urlData, allConfig.get('conf_crypto').secrect_key));


    let object = allConfig.get('conf_organisation').name + ' : Réinitialisation de votre mot de passe';

    let content = '';
    content += getHtmlHeaderEmail(infos.pseudo);

    content +=  '<div>';
    content +=      'Vous recevez ce mail car vous avez demandé de réinitialisé votre mot de passe.';
    content +=  '</div>';

    content +=  '<div>';
    content +=      'Si c\'est bien le cas, <a href="' + confServer.adress + ':' + confServer.port + '/changePwdBefore?data=' + dataCrypted + '">cliquez ici</a> pour le réinitialiser :';
    content +=      '<span style="text-decoration: underline; font-weight: bold; padding-left: 3px;">lien actif pendant ' + allConfig.get('conf_email_orga').minutes_forgetPwd + ' minutes.</span>';
    content +=  '</div>';

    content += getHtmlFooterEmail();

    return {object: object, content: content};
}

