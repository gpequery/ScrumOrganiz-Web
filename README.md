# ScrumOrganiz-Web

##Installation

    npm install --save sequelize
    npm install --save body-parser
    npm install --save bcrypt
    npm install --save express-session
    npm install --save nodemailer
    npm install --save crypto-js
    
##Formalisme

#### Redirection (en post)

    HTML : lors d'un click sur n'importe quelle balise
        <balise class='navigate' data-url='[url-to-go]'>
     
    JS : goToUrl('url-to-go', idUser = null) 
    (idUser renseigné pour créer le cookie pour acceder à une page sans login. Exemple à la création de compte)
    
#### Cryptage
    Mot de passe : bCrypt
    Transfert de données crytpo
    
    
#### Session

    Une session = cookie à valeur crypté qui s'appel "allConfig.get('conf_organisation:name') + allConfig.get('conf_session:name')"
    Session créée au login
    Sessions fermées quand le serveur s'arrète
    Une session est valide si : 
        La variable de ssion existe : durée de vie = "max_duration_ms" (conf)
        Dans cette variable userId est défini et plus grand que 0
        Le paramatre post "date" est difini et son ecart avec la date actuel est plus petite que "request_validity_ms" (conf)
        
    
##Webservice

####Acces :

Pour toute requête (en POST)
    
    LIEN :                  [url-du-site]/web_services/[requête]
    PARAMETRES MINIMUM :    servicesLogin, servicesPassword

####Reponse (sur toutes les requêtes):

    etat :
        true    ->  action réussis
        false   ->  action pas fini
     
    message :
        contient un message d'information en rapport avec l'etat ou informations complémentaires

####Ajouter nouvelle utilisateur

    LIEN :                          [url-du-site]/web_services/addUser
    PARAMETRES SUPPLAMENTAIRE :     pseudo, password, email
    
####Connexion

    LIEN :                          [url-du-site]/web_services/aloginUser
    PARAMETRES SUPPLAMENTAIRE :     pseudo, password
    
    
####Changer mdp

    LIEN :                          [url-du-site]/web_services/achangePwd
    PARAMETRES SUPPLAMENTAIRE :     id, password
    
