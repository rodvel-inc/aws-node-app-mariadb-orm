# Despliegue de Aplicación Web en AWS con Node.js

## Objetivo del Proyecto

Este proyecto tiene como objetivo aprender cómo desplegar una aplicación web básica construida con **Node.js**, desplegada inicialmente en una máquina local, luego en un servidor AWS EC2 y, posteriormente, se desacoplará gradualmente para comprender el uso de diversos servicios ofrecidos por AWS.

La aplicación será un sencillo sitio web de tipo "Hello World" con tres páginas en una de las cuales se podrán insertar 2 campos: un nombre de una persona y su respectiva dirección de correo electrónico. 

Esta aplicación servirá de base para aprender a trabajar con infraestructura en la nube, configuraciones de red, y otros conceptos básicos de AWS.

## Arquitectura propuesta
La aplicación está diseñada según la *Arquitectura de 3 Capas*: 

- **Capa de Presentación**: Esta capa se encarga de la interfaz de usuario y la interacción con el usuario final. Puede consistir en componentes como páginas web, interfaces gráficas de usuario (GUI) o servicios de API. La capa de presentación se comunica con la capa de negocio para solicitar y mostrar datos.
- **Capa de Aplicación (o de Negocio)**: Esta capa contiene la lógica de negocio de la aplicación. Aquí se procesan y manipulan los datos, se aplican reglas de negocio y se toman decisiones. La capa de negocio se comunica con la capa de datos para obtener y almacenar información necesaria para realizar las operaciones requeridas.
- **Capa de Datos**: Esta capa se encarga de la persistencia y acceso a los datos. Puede incluir sistemas de bases de datos, repositorios de datos o servicios web que se conectan a fuentes externas de información. La capa de datos se comunica con la capa de negocio para proporcionar y almacenar los datos necesarios para las operaciones de la aplicación.

## ¿Cómo identificar las 3 capas en el proyecto?

-   **Presentación**: está implementada mediante el servidor web `nginx` y los documentos `html` servidos desde `node.js`.
    
-   **Aplicación**: está implementada mediante el servidor `node.js`.
    
-   **Datos**: está implementada mediante el motor de base de datos `MariaDB`.

## Diagrama de la aplicación

Se pueden construir múltiples diagramas para representar los elementos que conforman la solución: de contexto, de contenedores, de despliegue, entre otros. 

Con el objetivo de brindar información relevante para los participantes, se propone un diagrama ligeramente diferente, el cual representa la arquitectura de la aplicación según el despliegue hecho originalmente en una máquina local con sistema operativo Linux Mint.

Ver diagrama [aquí](https://app.diagrams.net/#G1ewZY1-y-v4uMFKW-u6p_wjXcrFPBPU4R#%7B%22pageId%22:%224JpruYyGJkYawQAgXk7m%22%7D).

## Pasos Generales para Desplegar la Aplicación

1. **Instalar `node.js` y `npm`**:

 ```bash
sudo apt update
sudo apt install nodejs npm
```
   	
2. **Verificar la instalación:**

```bash
node -v
npm -v
```
3. **Clonar / descargar el proyecto desde el repositorio de Github**.
4. **Instalar las dependencias del proyecto:**	

Dentro de la carpeta del proyecto, donde se encuentra el archivo `package.json`, ejecutar:
		
```bash
cd /ruta/al/proyecto/aws-node-app-mariadb-orm
npm install 
```
		
5. **Configurar variables de entorno:**

Editar el archivo `.env` con sus credenciales de base de datos y cualquier otro parámetro necesario:
	
```bash
nano .env
```

6. **Instalar la base de datos:**
```bash
sudo apt install mariadb-server
```

7. **Crear la base de datos y su usuario:**

- Desde el CLI, se debe ingresar al servidor recientemente instalado:

```bash
mysql -u root
```
- Crear la base de datos:

```bash
mysql> CREATE DATABASE `DB_NAME`; 
```
- Crear un nuevo usuario de MySQL:
```bash
mysql> CREATE USER `username`@`localhost` IDENTIFIED BY 'password';
```
- Asignar el usuario a la base de datos y configurar sus privilegios:
```bash
mysql> GRANT ALTER, CREATE, DELETE, DROP, INSERT, LOCK TABLES, SELECT, UPDATE ON `DB_NAME`.* TO `username`@`localhost`;
```
- Solicitar a MySQL que lea nuevamente las tablas de privilegios:
```bash
mysql> FLUSH PRIVILEGES
```
8. **Ejecutar el proyecto:**

- Iniciar la aplicación web según lo configurado en el archivo `server.js`. Por defecto, el servidor debería escuchar por el puerto definido en el archivo `.env` o en un puerto predefinido :
```bash
npm start
```
- También se puede iniciar la aplicación web así:
```bash
node server.js
```
9. **Ejecutar la Aplicación Localmente:**

Abrir el navegador y visitar `http://localhost:PORT` para ver y probar la aplicación.


