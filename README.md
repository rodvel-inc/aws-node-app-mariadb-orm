# Despliegue de Aplicación Web en AWS con Node.js

## Objetivo del Proyecto

Este proyecto tiene como objetivo enseñar cómo desplegar una aplicación web básica construida con **Node.js** en un servidor AWS EC2. 
La aplicación será un sencillo sitio web "Hello World" con múltiples páginas, y servirá como base para aprender a trabajar con infraestructura en la nube, configuraciones de red, y otros conceptos básicos de AWS.

## Requisitos Previos

- **Conocimientos Básicos**: Conocimientos fundamentales de programación (JavaScript), manejo de la terminal de comandos y nociones básicas de AWS.
- **Cuenta de AWS**: Una cuenta activa en AWS con acceso a los servicios EC2.
- **Instalación de Node.js**: Node.js y `npm` (Node Package Manager) instalados en la máquina local para pruebas locales antes del despliegue.
- **SSH Client**: Un cliente SSH (como OpenSSH) instalado en la máquina local para conectarse a la instancia de EC2.

# Estructura del Proyecto

La estructura del proyecto se verá de la siguiente manera:

![project structure](https://github.com/user-attachments/assets/392d9a92-19e2-4063-979e-fbc961107bda)

## Archivos Principales del Proyecto

- **server.js**: Archivo principal del servidor que define la lógica del servidor Node.js usando Express.
- **package.json**: Archivo de configuración que contiene metadatos sobre el proyecto y las dependencias instaladas.

## Directorios Principales

- **public/**: Contiene archivos públicos, como HTML, CSS y JavaScript, que se servirán al cliente.
  - **index.html**: Página principal de la aplicación.
  - **style.css**: Archivo de estilos CSS para el sitio web.
  
- **views/**: Contiene archivos de vista que utilizan el motor de plantillas EJS.
  - **index.ejs**: Plantilla de la página de inicio.
  - **about.ejs**: Plantilla de la página "About Us".

## Pasos Detallados para Desplegar la Aplicación

### 1. Crear la Aplicación Web Node.js Localmente

1. **Crear una Carpeta para el Proyecto:**

   + Crea una nueva carpeta en tu computadora para tu proyecto.

   ```bash
   mkdir aws-nodejs-app
   cd aws-nodejs-app
   ```
   	
2. **Inicializar un Proyecto Node.js:**

	+ Inicializa el proyecto de Node.js usando `npm`:
	
	```bash
	npm init -y
	```

	+ Esto crea un archivo `package.json` con la configuración básica.

3. **Instalar Dependencias:**	

	+ Instala las dependencias necesarias (Express para el servidor web y EJS para las vistas).
		
	```bash
	npm install express ejs
	```
		
4. **Crear Archivos de la Aplicación:**

    + Dentro de la carpeta del proyecto, crea los siguientes archivos y carpetas:
	
	```bash
	touch server.js
	mkdir public views
	touch public/index.html public/style.css views/index.ejs views/about.ejs
	```

5. **Editar el Archivo server.js:**

    + Abre el archivo `server.js` en tu editor de texto favorito y copia el siguiente código:
	
	```javascript
	const express = require('express');
	const path = require('path');

	const app = express();
	const PORT = process.env.PORT || 3000;

	// Configuración del motor de vistas
	app.set('view engine', 'ejs');

	// Middleware para servir archivos estáticos
	app.use(express.static(path.join(__dirname, 'public')));

	// Rutas
	app.get('/', (req, res) => {
		res.render('index', { title: 'Home' });
	});

	app.get('/about', (req, res) => {
		res.render('about', { title: 'About Us' });
	});

	// Iniciar el servidor
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
	```

	+ Este código inicializa un servidor usando Express, configura el motor de vistas EJS, y define dos rutas (`/` y `/about`).

6. **Agregar Archivos HTML y CSS:**

    + Abre `public/index.html` y agrega:
	
	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Home</title>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
		<h1>Welcome to AWS Node.js App</h1>
		<p>This is a simple Node.js application deployed on AWS.</p>
		<p><a href="/about">Learn more about us</a></p>
	</body>
	</html>
	```
	
	+ Abre `public/style.css` y agrega:
	
	```css
	body {
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
		text-align: center;
		background-color: #f4f4f4;
	}

	h1 {
		color: #333;
		margin-top: 50px;
	}
	```
	
	+ Abre `views/index.ejs` y agrega:
	
	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><%= title %></title>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
		<h1>Welcome to AWS Node.js App</h1>
		<p>This is the home page of your Node.js app deployed on AWS.</p>
		<p><a href="/about">Learn more about us</a></p>
	</body>
	</html>
	```
	
	+ Abre `views/about.ejs` y agrega:
	
	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><%= title %></title>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
		<h1>About Us</h1>
		<p>This is the about page of your Node.js app.</p>
		<p><a href="/">Go back to home</a></p>
	</body>
	</html>
	```

7. **Contenido del archivo `package.json`:**

+ Este archivo define las dependencias del proyecto y algunos scripts útiles para correr y probar la aplicación.
```json
{
  "name": "aws-nodejs-app",
  "version": "1.0.0",
  "description": "Aplicación Node.js sencilla para el reto AWS",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "ejs": "^3.1.6"
  }
}
```

8. **Ejecutar la Aplicación Localmente:**

	+ En la terminal, ejecuta:

	```bash
	node server.js
	```

	+ Abre tu navegador y visita `http://localhost:3000` para ver tu aplicación.

### 2. Preparar el Despliegue en AWS EC2

1. **Crear una Instancia de EC2:**
    + Inicia sesión en la Consola de AWS.
    + Ve a Servicios > EC2 > Instancias > Lanzar Instancia.
    + Selecciona Amazon Linux 2 AMI (o Ubuntu Server).
    + Elige el tipo de instancia (por ejemplo, `t2.micro`, que es gratuita en el nivel de uso gratuito de AWS).
    + Configura detalles de la instancia:
        + Asegúrate de tener configurado el acceso SSH (puerto 22).
        + Configura la Regla del Grupo de Seguridad para permitir el tráfico HTTP (puerto 80) y HTTPS (puerto 443).

2. **Conectar a la Instancia de EC2:**
    + Utiliza el cliente SSH en tu terminal para conectarte a tu instancia:
		
		```bash
		ssh -i "tu-llave-ec2.pem" ec2-user@your-instance-public-ip
		```

### 3. Configurar la Instancia EC2 para Node.js

1. **Actualizar la Instancia y Configurar Node.js:**
    + Una vez conectado, actualiza la instancia:
		
		```bash
		sudo yum update -y  # Para Amazon Linux
		sudo apt update && sudo apt upgrade -y  # Para Ubuntu
		```
		
	+ Instala Node.js:
		
		```bash
		curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -   # Para Amazon Linux
		sudo yum install -y nodejs  # Para Amazon Linux

		curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -   # Para Ubuntu
		sudo apt install -y nodejs   # Para Ubuntu
		```
	
2. **Clonar o Subir el Proyecto:**
	+ Puedes clonar tu proyecto desde un repositorio de Git o subir los archivos usando `scp`:
		
		```bash
		scp -i "tu-llave-ec2.pem" -r /ruta/a/tu/proyecto ec2-user@your-instance-public-ip:/home/ec2-user
		```

3. **Instalar Dependencias y Ejecutar la Aplicación:**
	+ Navega a la carpeta del proyecto:
		
		```bash
		cd aws-nodejs-app
		```
	
	+ Instala las dependencias:
		
		```bash
		npm install
		```

	+ Ejecuta la aplicación:
		
		```bash
		node server.js
		```

### 4. Configurar y Hacer Accesible la Aplicación

1. **Configurar un Proceso en Segundo Plano:**
    + Instala `pm2` para ejecutar la aplicación en segundo plano:
		
		```bash
		sudo npm install -g pm2
		```
		
	+ Inicia la aplicación con `pm2`:
		
		```bash
		pm2 start server.js
		```

2. **Configurar el Firewall de la Instancia (Grupo de Seguridad):**

	+ Asegúrate de que el grupo de seguridad asociado a tu instancia EC2 permite el tráfico en el puerto 80 (HTTP) y, opcionalmente, en el puerto 443 (HTTPS).

3. **Asignar una Dirección IP Elástica (opcional):**

	+ Asigna una IP estática (Elástica) a tu instancia para evitar que cambie cada vez que reinicies la instancia.
		
