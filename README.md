- point d'entrée de l'application: index.js
- installation des dépendances : npm install
- lancer l'application: npm start / node index.js

# LOGIN ADMIN:

#### url:

http://localhost:8000/admin/login

#### corps de la requête:
Utiliser x-www-form-urlencoded et fournir les informations suivantes:
email, password

email:
toto@gmail.com

password:
rootroot

Après connexion, vous recevrez un token qui vous servira à appeler les autres requêtes à savoir:
- liste des employés
- liste employé filtré par date
- création d'employé

# CREATION D'UN EMPLOYE

#### url:
Utiliser la méthode POST
http://localhost:8000/admin/createEmploye

#### corps de la requête:
Utiliser x-www-form-urlencoded et fournir les informations suivantes:
- name, firstname et department

#### Headers:
Content-Type , application/x-www-form-urlencoded

#### token pour l'authorization:
Aller dans Authorization et choisir bearer token et insérer le token récupéré durant le login.

# LISTE DES EMPLOYES

#### url:
Utiliser la méthode GET
http://localhost:8000/admin/listEmployees


#### token pour l'authorization:
Aller dans Authorization et choisir bearer token et insérer le token récupéré durant le login.

# LISTE DES EMPLOYES AVEC FILTRE DATE

#### url:
Utiliser la méthode GET
http://localhost:8000/admin/listEmployeesDate

#### corps de la requête:
Utiliser x-www-form-urlencoded et fournir les informations suivantes:
- date au format dd/MM/yy

#### token pour l'authorization:
Aller dans Authorization et choisir bearer token et insérer le token récupéré durant le login.

# CHECK IN EMPLOYE

#### url:

Utiliser la méthode POST
http://localhost:8000/employee/checkIn

#### corps de la requête:

Utiliser x-www-form-urlencoded et fournir les informations suivantes:
- id ( identifiant de l'employé que vous pouvez récupérer dans la liste des employés, ligne mentionnant "_id" )

# CHECK OUT EMPLOYE

#### url:
Utiliser la méthode PUT
http://localhost:8000/employee/checkout

#### corps de la requête:
Utiliser x-www-form-urlencoded et fournir les informations suivantes:
- id ( identifiant de l'employé que vous pouvez récupérer dans la liste des employés, ligne mentionnant "_id" )
- commentOut: commentaire du checkout

# LISTE DES CHECKS EMPLOYE

#### url:

Utiliser la méthode GET
http://localhost:8000/employee/getAllChecks

# TESTING: 
Lancer la commande "npm test" dans le terminal. Les tests utilisent une base de données de test et un token spécifique.

# DOCKER

#### Pour récupérer l'image du projet docker:
docker pull antsavr/node_mid
