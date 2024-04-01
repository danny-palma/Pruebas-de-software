# Guía de instalacion para el proyeto de puebas de software

## 1. Introducción
- Proyecto creado para la asignatura de pruebas de software de la universidad ECCI en Bogotá Colombia

## 2. Configuración del entorno
### Recomendaciones
- Version Node.JS recomendada: v20.7.0.
- Version NPM recomendada: 10.5.0.
- Version Git recomendada: 2.42.0.windows.2.
- Se recomienda Visual Studio Code para la revision del codigo fuente en su version 1.87.2.

## 3. Clonar el repositorio
- Ya teniendo la version de Git recomendada instalada, ejecutar el siguiente comando:
```sh
git clone https://github.com/danny-palma/Pruebas-de-software.git
```

## 4. Instalación de dependencias
### Lista dependencias:
- @types/express: ^4.17.21
- typescript: ^5.4.2
- body-parser: ^1.20.2
- dotenv: ^16.4.5
- express: ^4.18.3
- mongoose: ^8.2.2
- node-cache: ^5.1.2

### Instalacion de las dependencias:
- Ejecutar el siguiente comando tendiendo en cuenta que la consola esta situada en la carpeta del proyecto:
```sh
npm install -y
```

## 5. Configuración
- Antes de ejecutar el proyecto toca generar el archivo .env en donde se almacena la configuracion del entorno, SOLICITAR USUARIO Y CONTRASEÑA PARA PODER ACCEDER A LA BASE DE DATOS
- Se puede usar el archivo que esta escrito con .env-example ya cambiarle las variables 

## 6. Ejecución del proyecto
- Para poder ejecutar el proyecto es necesario haber realizado todos los anteriores pasos correctamente. 
- Ejecutar el siguiente comando para poder iniciar el servidor.
```sh
npm start 
```
- Un ejemplo de que el servidor inicio correctamente es: 
```sh
~$ npm start 

> pruebas-de-software@1.0.0 prestart
> npm run build


> pruebas-de-software@1.0.0 build
> tsc


> pruebas-de-software@1.0.0 start
> node dist/index.js

Library node-cache loaded!
Loading app...
Loading mongoose...
ok
Loading express...
ok
Finished...
Loading controllers...
Finished...
Server listening in port: 3000
```

## 7. Solución de problemas
- Puede suceder incompatibilidades con respecto a las versiones del software, porfavor verificar bien las versiones instaladas
- Puede suceder que el puerto este ocupado por otra aplicacion corriendo en el equipo local, porfavor verificar cambiar el puerto en el archivo .env
- Puede suceder que el archivo .env no este o este mal nombrado o la configuracion dentro del archivo no sea la correcta, por favor verificar el archivo que este correctamente configurado como se muestra en el paso #5

## 8. Contribuciones
- Crear un fork al proyecto con github, posteriormente luego de realizar los cambios en una rama ajena a la rama principal, se realiza un pullrequest al respositorio en github 

## 9. Contacto
- [Daniel Alejandro Palma Garcia](mailto:daniela.palmag@ecci.edu.co)
- [Juan David Cifuentes Guasca](mailto:juanda.cifuentesgu@ecci.edu.co)
- [Sebastián David venegas ayala](mailto:sebastiand.venegasa@ecci.edu.co)
- [Jhon Jairo Benabides Suarez](jhonj.benabidess@ecci.edu.co)