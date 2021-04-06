Afin de visualiser le projet correctement, l'api doit être lancé.
Pour cela, NodeJs doit être installé sur la machine.

Au préalable cloner le repository Git sur votre machine.
Une fois cela fait, exécuter votre Terminal puis faites : 
->   cd path_du_projet/api/
->   npm install
->   node server

Maintenant votre terminal devrait vous afficher le message de réussite suivant:
" Successfully connected to MongoDB Atlas! "
Dans ce cas, l'api a bien été lancé.
Le port d'écoute de l'api est renseigné sur le terminal précédant le message de réussite :
"Listening on port 3000"
Par défaut, votre api est utilisable sur l'adresse : http://localhost:3000/

Si votre adresse ne ressemble pas à celle-ci, veuillez modifier le fichier src/js/host.js et y mettre votre adresse.