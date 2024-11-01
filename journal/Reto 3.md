## Reto # 3: Desacople del Front-end del resto de las capas.

## Objetivo del Reto

Continuando con la evolución de la arquitectura de la aplicación web, este reto tiene como objetivo aprender cómo desacoplar el *front-end* de las otras dos capas, garantizando el funcionamiento normal de la aplicación. Para esto, se utilizará el patrón *serverless* que consiste en la combinación de los servicios Amazon S3 y Amazon CloudFront. 

## Diagrama de la aplicación
Para este Reto, el diagrama es más *formal* o *estándar*. Se trata de un diagrama de despliegue de infraestructura. Lo puede consultar en el mismo enlace compartido para el Reto # 1, en la pestaña "Reto # 3".

## Servicios / Conceptos de AWS involucrados
Adicionales a los ya utilizados, se agregan los siguientes conceptos / servicios:
- **Content Delivery Network (CDN)**: Red de servidores interconectados, distribuidos geográficamente, que permite acelerar la carga de páginas web, al ubicarse estratégicamente más cerca de los usuarios.
- **Servicio de almacenamiento de objetos**: Servicio de almacenamiento de objetos escalable y de alto rendimiento.
- **Gestor de Procesos (Process Manager)**: Es una utilidad de un sistema operativo que permite la administracion de los procesos de manera fácil.
- **pm2**: Es un gestor de procesos creado específicamente para aplicaciones web desarrolladas en Node.js.
- **Cross-Origin Resource Sharing (CORS)**: es un mecanismo que le permite a una página web acceder desde un servidor en un dominio (`ejemplo1.com`) a recursos restringidos que se encuentran en un servidor en un dominio diferente (`ejemplo2.com`). Se traduce como "uso compartido de recursos entre orígenes".
- **Herramientas de desarrollador de su browser favorito**. Componentes de su browser que le permiten observar lo que sucede *detrás de cámaras* al cargar una página web en él. 

## Pasos Generales
A continuación, se enumeran los pasos generales que le permitirán lograr el objetivo declarado anteriormente.
### 1. Comprender claramente el objetivo a lograr.
- Analice bien lo que ha logrado hasta ahora.
- Asegúrese de que todo funciona bien todavía.
- Asegúrese de comprender bien el patrón de arquitectura de CloudFront + S3. Indague en Internet sobre este asunto.
### 2. Acceder a la consola de AWS.
- Utilice las credenciales que se le han asignado.
### 3. Crear un *bucket* en S3 y configurarlo como un servidor web.
- Debe crear un *bucket* con el servicio S3, ya sea mediante la consola de AWS o mediante AWS CLI desde su computador Linux local conectado vía SSH a su instancia EC2. 
- Esta última alternativa le dará gran poder y le facilitará las cosas más adelante; por ejemplo, cuando quiera transferir archivos a su *bucket*.
- Aquí tendrá que configurar políticas de acceso al *bucket*, así como las políticas CORS asociadas también al *bucket*.
### 4. Transferir los archivos a S3.
- Si comprendió bien el objetivo de este reto, probablemente ya sabe cuáles archivos de su proyecto debe migrar a S3.
- Igualmente, puede probar esta tarea con otros archivos *dummy*, antes de lanzarse a migrar los archivos del proyecto.
### 5. Configurar una distribución en Amazon CloudFront.
- Tal vez, es el paso más complejo de este reto.
- Debe configurar, en este orden:
  - una distribución,
  - unos orígenes,
  - unos comportamientos,
  - la invalidación de caché. 
### 6. Verificar que el *front-end* funciona en este nuevo esquema.
- Asegúrese de puede acceder a su página web con la URL de la distribución de CloudFront (de tipo https://dw9sw985v0m7r.cloudfront.net), en lugar de hacerlo a la antigua URL. 
- Si le funcionó, felicitaciones. Esto que acaba de hacer no es nada fácil.
- Reflexione sobre el cambio que acaba de hacer para que pueda comprender cuáles piezas tiene que mover a partir de ahora.
### 7. Enlazar el *front-end* con el *back-end*.
- A partir de aquí, debe:
  -  Modificar el archivo *register.html* alojado en S3 para que la acción POST sea ejecutada buscando el *back-end* en la instancia EC2.
  - Agregar la configuración CORS al archivo *server.js* alojado en la instancia EC2. 
  - Asegurarse de utilizar la extensión de `node.js` correcta.
  - Ya que agregó una extensión adicional al *back-end*, ¿no debería reiniciar su proyecto?
  - Considerar el uso de `pm2` para gestionar más fácilmente el servicio de Node.js.
  - Decidir cuál va a ser el punto de enlace entre las 2 capas:
    - ¿a través del puerto TCP 443 que expone `nginx`?  
    - ¿a través del puerto TCP 3000 que expone `node.js`?
    - ¿a través del puerto TCP 80 que `nginx` está en capacidad de exponer?
### 8. Verificar que el *front-end* y el *back-end* han sido enlazados correctamente en este nuevo esquema.
- Si le funcionó, felicitaciones. Nuevamente, esto que acaba de hacer no es nada fácil. 

## Reflexiones
- Su arquitectura de infraestructura ha dado el primer paso en el desacople de sus elementos constitutivos: su *front-end* y su *back-end* ya están en lugares diferentes. Recuerde que todo empezó como un monolito.
- Ha utilizado varios conceptos nuevos, ha tenido que lidiar con CORS y, si todo ha salido bien, probablemente ha tenido que hacer mucho diagnóstico y resolución de errores de diversa índole.
- Si no se ha dado cuenta, ya ha construido y puesto en servicio exitosamente una API de tipo RESTful. 
- El *endpoint* `/add-user` de su *back-end* es una API RESTful porque:
   - Está relacionando un método HTTP específico (POST) con una acción específica.
   - Este método es una de las operaciones principales de un servicio RESTful, siguiendo el patrón de operaciones CRUD (Create, Read, Update, Delete),
   - La comunicación es de tipo `Stateless`, lo cual quiere decir que cada solicitud del cliente al servidor debe contener toda la información que el servidor necesita para procesar la solicitud: la solicitud POST tiene los dos parámetros (name, email) que el servidor espera recibir para proceder a crear un usuario. 
   - Los datos en el endpoint son enviados en formato JSON ({name, email}), el cual es usado para comunicaciones cliente - servidor en APIs REST.
   - Está usando métodos HTTP estándar
   - El diseño de las API RESTful está basado en recursos; los usuarios (representados por /add-user) son considerados recursos que pueden ser creados, recuperados, actualizados y eliminados.
