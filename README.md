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
####Reponse :
    etat :
        ok -> action réussis
        nok -> action pas fini
        error -> passe dans un catch
     
    message :
        contient un message d'information en rapport avec l'etat ou informations complémentaires
