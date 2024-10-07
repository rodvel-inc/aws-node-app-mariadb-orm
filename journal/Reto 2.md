## Reto # 2: Despliegue de la aplicación en AWS.

## Objetivo del Reto

Este reto tiene como objetivo aprender cómo desplegar la misma aplicación web básica construida con **Node.js**, ya desplegada en una máquina local, en un servidor AWS EC2.

## Diagrama de la aplicación
Para este Reto, el diagrama es más *formal* o *estándar*. Se trata de un diagrama de despliegue de infraestructura. Lo puede consultar en el mismo enlace compartido para el Reto # 1, en la pestaña "Reto # 2".

## Servicios / Conceptos de AWS involucrados
- **IAM**: Identity and Access Management.
- **VPC**: Virtual Private Cloud
- **Subnets**: Tanto públicas como privadas.
- **Internet Gateway**: Componente de la VPC (redundante, escalable horizontalmente, en esquema de Alta Disponibilidad) que permite la comunicación entre una VPC e Internet. Este componente también realiza un NAT (Network Address Translation) para las instancias EC2 que tienen direcciones IPv4 públicas.
- **VPC Endpoint**: Aunque no será utilizado en el Reto # 2, en otros retos posteriores si será de gran utilidad. Este componente permitirá conexiones entre la VPC y los servicios de AWS soportados, sin tener que exponer la VPC a Internet.
- **Network ACL**: Network Access Control List, es una capa opcional de seguridad para una VPC, y actúa como firewall que controla el tráfico entrante y saliente de una sub-red.
- **Security Group**: Es un firewall virtual que controla el tráfico de una o más instancias.
- **Zona de Disponibilidad**: Consiste en uno o más datacenters, cada uno con energía, redes de datos y conectividad redundantes.
- **Instancia EC2**: Es la máquina virtual proporcionada por AWS.
## Pasos Generales
A continuación, se enumeran los pasos generales que le permitirán lograr el objetivo declarado anteriormente.
### 1. Acceder a la consola de AWS.
- Utilice las credenciales que se le han asignado.
- Asegúrese de configurar y utilizar una aplicación como Google Authenticator para obtener un MFA válido.
### 2. Utilizar la VPC y las sub-redes asignadas.
- La VPC que va a utilizar ya ha sido creada previamente. 
- Las sub-redes (tanto pública como privadas) ya han sido creadas previamente. 
### 3. Crear la instancia EC2.
- Asegúrese de contar con un buen manual de creación de instancias Linux en AWS. Va a tener que tomar muchas decisiones acerca de los componentes que conforman la configuración de la instancia: la sub-red a la que pertenece (¿pública o privada?), el sistema operativo, el archivo `.pem` que le va a permitir conectarse a su instancia vía SSH posteriormente, entre otras.
- También, asegúrese de que el tipo de instancia elegida sea de tipo "Free tier eligible".
- Tenga presente el concepto de "Instance Store". Este es un aspecto crucial para todo el reto.
- Así mismo, tenga presente el concepto de Amazon EBS. Tendrá que tomar decisiones importantes en este sentido.
### 4. Acceder a  la instancia EC2.
- ¿Se aseguró de salvar el archivo `.pem`?
### 5. Revise la configuración del Security Group.
- Asegúrese de tener la configuración correcta del SG que tiene enlazado a su instancia. 
### 6. Crear el proyecto de Node.js y probar.
- A partir de aquí, ya puede repetir los pasos que siguió para lograr el objetivo del Reto # 1.
