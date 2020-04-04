# API Jutification de texte

Cette API permet la justification de texte via une authentification unique token. 
Un utilisateur pourra s'enregistrer , et se connecter, et possède un quota de mots par jours (80 000).

L'application est codé avec `NodeJS` et utilise le framework `Express.js`.


## Run the app

    unicorn -p 7000
    
## Organisation de l'app

    Architecture du framework 
    `
    test_tictactrip/
    ├── controlers
    ├── middleware
    ├── models
    ├── node_modules
    └── routes
    `
    
`controlers` contient tout les fichiers avec la logic metier de l'application.

`routers` est le routeur Express qui permet d'associer la requête vers le bon controler et séparer la logic routing de la logique globale.
 
`models` contient les schémas vers la base de donnée MongoDB.

`middleware` contient les actions à réaliser entre deux requêtes.

# REST API

L'API REST est décrite si dessous.

Les liens peuvent être testé via la collection postman : [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5e2fe2789ec8c56f4377)

## Justifier le texte

### Request

`POST api/justify/`
  
    Headers
    Authorization: Bearer Token
    Content-Type:application/x-www-form-urlencoded
    Connection:keep-alive
    
    Body 
    key: texte; value: Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, \nmes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je \nm’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le \nsommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les \nmains et souffler ma lumière; je n’avais pas cessé en dormant de faire des \nréflexions sur ce que je venais de lire, mais ces réflexions avaient pris un \ntour un peu particulier; il me semblait que j’étais moi-même ce dont parlait \nl’ouvrage: une église, un quatuor, la rivalité de François Ier et de \nCharles-Quint. \n\nCette croyance survivait pendant quelques secondes à mon \nréveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes \nyeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. \n \nPuis elle commençait à me devenir inintelligible, comme après la métempsycose \nles pensées d’une existence antérieure; le sujet du livre se détachait de moi, \nj’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais \nbien étonné de trouver autour de moi une obscurité, douce et reposante pour mes \nyeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme \nune chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me \ndemandais quelle heure il pouvait être; j’entendais le sifflement des trains \nqui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant \nles distances, me décrivait l’étendue de la campagne déserte où le voyageur se \nhâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans \nson souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes \ninaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le \nsuivent encore dans le silence de la nuit, à la douceur prochaine du retour.
    key: userId; value: 5e86b867f72e83386c993109 

### Response

    HTTP/1.1 201 Created
    Date: Sat, 04 Apr 2020 05:42:35 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: text/plain; charset=utf-8
    Content-Length: 2037

    {"text_justified":"Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, \nmes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je \nm’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le \nsommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les \nmains et souffler ma lumière; je n’avais pas cessé en dormant de faire des \nréflexions sur ce que je venais de lire, mais ces réflexions avaient pris un \ntour un peu particulier; il me semblait que j’étais moi-même ce dont parlait \nl’ouvrage: une église, un quatuor, la rivalité de François Ier et de \nCharles-Quint. \n\nCette croyance survivait pendant quelques secondes à mon \nréveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes \nyeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. \n \nPuis elle commençait à me devenir inintelligible, comme après la métempsycose \nles pensées d’une existence antérieure; le sujet du livre se détachait de moi, \nj’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais \nbien étonné de trouver autour de moi une obscurité, douce et reposante pour mes \nyeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme \nune chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me \ndemandais quelle heure il pouvait être; j’entendais le sifflement des trains \nqui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant \nles distances, me décrivait l’étendue de la campagne déserte où le voyageur se \nhâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans \nson souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes \ninaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le \nsuivent encore dans le silence de la nuit, à la douceur prochaine du retour. "}
    
### Response-80 000 dépassés

    HTTP/1.1 402 Payment Required
    Date: Sat, 04 Apr 2020 05:42:35 GMT
    Status: 402 Payment Required
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 70
    
    {"message":"Vous avez dépassé votre quota gratuit de la journée !"}


## S'inscire

### Request

`POST /api/auth/signup`
    
    Headers
    Authorization: none
    Content-Type:application/x-www-form-urlencoded
    Connection:keep-alive
    
    Body
    key: email; value: foo@bar.com
  
### Response

    HTTP/1.1 201 Created
    Date: Sat, 04 Apr 2020 04:37:25 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 34

    {"message": "Utilisateur créé !"}

## Se connecter

### Request

`POST /api/auth/login`
    
    Headers
    Authorization: none
    Content-Type:application/x-www-form-urlencoded
    Connection:keep-alive
    
    Body
    key: email; value: foo@bar.com
  
### Response

    HTTP/1.1 200 OK
    Date: Sat, 04 Apr 2020 04:37:25 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 224

    {"userId": "5e86b867f72e83386c993109",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTg2Yjg2N2Y3MmU4MzM4NmM5OTMxMDkiLCJpYXQiOjE1ODU5NzkyODQsImV4cCI6MTU4NjA2NTY4NH0.k7paY2kc0XrSv1DjDhVlFzzGws8tnOxLIiTwevZ0VLA"}
    
   
