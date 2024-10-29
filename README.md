# principal
# instalar express, cors, bcrip, JWT, morgan, cookie-parser

## documentacion FreeHealth


Documentación del Sistema de Gestión de Tareas
Índice
Introducción

Instalación y Configuración

Estructura del Proyecto

Rutas y Endpoints

Validaciones y Seguridad

Conexión a la Base de Datos

Controladores

Errores Comunes y Soluciones

# 1. Introducción
Este sistema de gestión de tareas permite a los usuarios crear, modificar, visualizar y eliminar tareas. Está construido utilizando Node.js, Express.js y MySQL.

# 2. Instalación y Configuración
Requisitos
Node.js (versión 14 o superior)

MySQL (versión 8 o superior)

Pasos
Clona el repositorio:

git clone https://github.com/Proyecto-de-calendario/principal.git


Navega al directorio del proyecto:
cd server

Instala las dependencias:
npm install


Configura la base de datos en dataBase.js:


  	
host: 'localhost',
  	port: 3306,
  	user: 'root',
  	password: '',
  	database: 'proyecto_calendario'

	Inicia el servidor:
npm start

# 3. Estructura del Proyecto

├── src/
│   ├── controllers/
│   │   ├── auth.Controller.js
│   │   ├── tasks.Controller.js
│   ├── routes/
│   │   ├── auth.Router.js
│   │   ├── tasks.Router.js
│   ├── helpers/
│   │   ├── validarJWT.js
│   ├── middlewares/
│   │   ├── validacionesUsuario.js
│   ├── dataBase.js
│   ├── app.js

# 4. Rutas y Endpoints

GET /tasks: Obtener todas las tareas del usuario.

GET /tasks/:id: Obtener una tarea específica por id.

POST /tasks: Crear una nueva tarea.

PUT /tasks: Modificar una tarea existente.

DELETE /tasks/:id: Eliminar una tarea por id.

# 5. Validaciones y Seguridad
Utilizamos express-validator para validar los datos de entrada y express-session junto con JWT para la gestión de sesiones y autenticación.

# 6. Conexión a la Base de Datos
La conexión se maneja con mysql2/promise. Ver el archivo dataBase.js para más detalles sobre la configuración.

# 7. Controladores
tasks.Controller.js
tasks(req, res): Devuelve todas las tareas de un usuario.

findTask(req, res): Devuelve una tarea específica.

createTask(req, res): Crea una nueva tarea.

modifyTask(req, res): Modifica una tarea existente.

deleteTasks(req, res): Elimina una tarea por ID.

# 8. Errores Comunes y Soluciones
Conexión a la base de datos fallida:

Verifica que MySQL esté en ejecución.

Revisa las credenciales en dataBase.js.

Error 404: Tarea no encontrada:

Verifica que la tarea exista en la base de datos.
