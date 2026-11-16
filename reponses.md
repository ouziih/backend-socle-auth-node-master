donner dans l'ordre tous mes middlewares traversé par une requete post valide /api/auth/register

requestId, pinoHttp, helmet, cors, express.json, express.urlencoded, createRateLimiter, registerLimiter, validateBody, asyncHandler

expliquer pourqoui authenticate n'est pas utilisé 
parce que le middleware authenticate sert a connait l'idee de celui qui demande la requete or register sert a s'enregistrer dans l'appli donc on ne peut pas identifier quelqu'un qui n'est pas enregistrer dans la base

{
    "name":"  Awa Ndiaye   ",
    "email":"AWA@EXEMPLE.COM",
    "password":"Passer1234",
    "password_confirmation":"passer1234",
    "role":"admin"
}

pour cette requete donner les valeurs recues par AuthService
les donner ne vont pas arriver

{
    name:"Awa Ndiaye",
    email:"awa@exemple.com",
    password:"motdepassehashe",
    role:"learner"
}

expliquer ce qui arrive au champ role et pourquoi le compte reste un champ apprenant

le type associé au parametre de la fonction validate ne prends pas role et c'est dans validate qu'on applique les regles de zods et on garde les donner valide 

parce que le role a une valeur par defaut: 'learner'

citer les quatres tables normalemenr alimenter apres une inscription reussie
users, one_time_tokens, refresh_tokens, auth_audit_events

users: seule le mot de passe est crypté
one_time_tokens: tokenHash, 
refresh_tokens:
auth_audit_events:

pourquoi le findByEmail ne suffit pas a verifier l'unicité d'un email 
il ne suffit pas parce que deux utilisateurs peuvent passer la requete avec le meme mail en meme temps 
quelle autre moyen de protection a etait mis en place et 
dans la migration il y'a une contrainte d'unicité : ('users', ['email'], { unique: true, name: 'users_email_uq' })
quelle erreur ca peut provoquer


apres une inscription reussi le terminal dois afficher un log strucutré contenant 
-l'identifiant du compte
-le nom du compte
-le message nouveau compte crée 

contrainte: 
-aucun log si l'inscription echoue
-aucun mot de passe, email ou jeton dans ce log
-utiliser le logger du projet pas console.log

la reponse 201 created doit contenir :
Location: "/api/users/{id-nouvelle-utilisateur}"

toutes les reponses crées par send sendSuccess() doivent inclure l'identifiant deja placé dans l'entete x-request-id:
{
    "success":"true",
    "data":{},
    "request_id":savaleur
}

x-request-id-generated:true 
l'or ceque le server genere uuid et false l'orsque l'uuid valide  