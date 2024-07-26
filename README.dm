
Parqueadero Front 

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (que se instala automáticamente con Node.js)

Instalación
	Clona el repositorio o descarga el proyecto.

Navega a la carpeta ./parqueadero-api/ en tu terminal.

Ejecuta el siguiente comando para instalar las dependencias necesarias:

	npm install

Ejecuta la Front en modo desarrollo:

	npm run dev


La interface es intuitiva con los nombres de cada uno de los botones.

Ingresar vehiculo

Ingresar la placa y el tipo, dar al boton y quedara ingresado.

Esta el boton de mostrar todos los vehiculos.

El buscar, busca un vehiculo en especifico por su placa para modificarlo o registrar si salida.

Cupos

En la parte de cupos esta el boton de modificar y elimincar como tambien puedes insertar llenando los campos que se te piden.



Parqueadero API

Este proyecto es una API para gestionar un sistema de parqueadero utilizando Node.js y MySQL.

Requisitos
	Node.js: Asegúrate de tener Node.js instalado en tu sistema.
	Mysql: Asegúrate de tener Mysql instalado en tu sistema.

Instalación
	Clona el repositorio o descarga el proyecto.

Navega a la carpeta ./parqueadero-api/ en tu terminal.

Ejecuta el siguiente comando para instalar las dependencias necesarias:

	npm install

Ejecuta la API en modo desarrollo:

	npm run dev


Configuración de la Base de Datos
Abre el archivo ./config.js.

Modifica la configuración de conexión a la base de datos según tu entorno. Asegúrate de que los datos sean correctos para tu base de datos MySQL:

export default {
    dbuser: process.env.DB_USER || "Usuario de tu Base de Datos",
    dbpassword: process.env.DB_PASSWORD || 'Contraseña de tu base de datos',
    dbhost: process.env.DB_HOST || "Host de tu base de datos",
    dbport: process.env.DB_PORT || "puerto de tu base de datos",
    dbname: process.env.DB_NAME || "parqueadero" // Nombre de la base de datos
}


Después de hacer la configuración, verifica la conexión a la base de datos accediendo a:

	http://localhost:3000/ping


Si recibes un pong, la conexión a la base de datos es exitosa.

Endpoints de la API

Vehículos

- getVehiclos: trae todos los vehiculos registrados de la base de datos esta es su direccion de acceso

	http://localhost:3000/api/vehiculos

- getVehiculo: trae un vehiculo en especifico por su placa

	http://localhost:3000/api/vehiculos/ABC123

- postVehiculos: se usa para la insercion de un vehiculo a la base de datos 
	
	http://localhost:3000/api/vehiculos

Ejemplo de insertar un vehiculo en postman por el body con .json 

{
    "placa": "a",
    "tipo": "carro"
}

- patcVehiculo: este se presta para modificar el vehiculo que se ingreso en caso de error, si solo mandas la placa en el body se modificara solo la palca y si mandas solo el tipo se modifica el tipo, tambien si mandas los dos el que modifiques va a ser el que se cambie en la base de datos.


	http://localhost:3000/api/vehiculos/a

Ejemplo para el modificar

{
    "nuevaplaca": "asd",
    "tipo": "moto"
}


- deleteVehiculo: este borrar el respectivo vehiculo por la placa

	http://localhost:3000/api/vehiculos/asd

Cupo

- getcupos: me trae todos los cupos ingresados

	http://localhost:3000/api/cupo

- getCuposTipo: me trae los tipos que estan ingresados en la base de datos en este caso, carro y moto
	
	http://localhost:3000/api/cupo/tipo

- getCupo: trae el cupo segun su id

	http://localhost:3000/api/cupo/1

- getcupoTipo: trae segun el tipo 

	http://localhost:3000/api/cupo/tipo/moto

- postCupo: ingresa el cupo, para motos y carros ya esta implementado la logica de no mayor a 5 o a 10, esto se puede modificar si el parqueadero se amplia 

	http://localhost:3000/api/cupo	

Ejemplos

{
    "tipo": "moto",
    "total_cupos": "10",
    "cupos_ocupados": "0"
}

{
    "tipo": "camion",
    "total_cupos": "1",
    "cupos_ocupados": "0"
}

- patchId: para modificar por id

	http://localhost:3000/api/cupo/3

Ejemplo 

{
    "tipo": "camion",
    "total_cupos": "2",
    "cupos_ocupados": "0"
}

- patchTipo: para modificar por tipo

	http://localhost:3000/api/cupo/tipo/camion

Ejemplo 

{
    "tipo": "camion",
    "total_cupos": "2",
    "cupos_ocupados": "0"
}

- deleteId: borrar por el id 

	http://localhost:3000/api/cupo/4

- deleteTipo: borrar por el tipo

	http://localhost:3000/api/cupo/tipo/camion




