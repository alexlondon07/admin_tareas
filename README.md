# admin_tareas
MEAN Web App con AngularJS, NodeJS y MongoDB, Aplicando Conocimientos en AngularJS, Administrador de Tareas Básico , Expressjs


npm start


--------------------
#Documentation API
--------------------

Method GET
/tasks
Path	/tasks

Produces
application/json

Consumes
application/json

Response status code
200 - OK

Response object

list of Task

--------------------
--------------------

Method GET
/task/{id}

Path	/task/{id}

Produces
application/json

Consumes
application/json

Path parameters
id	Required: true
Type: long

Response status code
200 - OK

Response object
Task

--------------------
--------------------
Method DELETE
/task/{id}

Path	/task/{id}

Produces
application/json

Consumes
application/json

Path parameters
id	Required: true
Type: long

Response status code
200 - OK

Response object
Task

--------------------
--------------------
Method POST
/task

Path	/task

Produces
application/json

Consumes
application/json

Body object
Task

Response status code
201 - Created

Response object
Task
