# ScrumOrganiz-Web

##Installation
    npm install --save sequelize
    npm install --save mysql2
    npm install --save body-parser
    npm install --save bcrypt
    
##Formalisme
#### Redirection (en post)
    HTML : lors d'un click sur n'importe quelle balise
        <balise class='navigate' data-url='[url-to-go]'>
     
    JS : goToUrl('url-to-go') 
    
##Webservice
####Acces :

Pour toute requête (en POST)
    
    LIEN :                  [url-du-site]/web_services/[requête]
    PARAMETRES MINIMUM :    servicesLogin, servicesPassword

####Reponse :
    etat :
        true    ->  action réussis
        false   ->  action pas fini
     
    message :
        contient un message d'information en rapport avec l'etat ou informations complémentaires

####Ajouter nouvelle utilisateur
    LIEN :                          [url-du-site]/web_services/addUser
    PARAMETRES SUPPLAMENTAIRE :     pseudo, password, email
    