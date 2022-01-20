# Face-Recognition
  *Para probar esta app pueden acceder desde github pages en este repositorio, pero para mas estabilidad se recomienda visitar su versión desplegada en heroku con el siguiente link: https://reconocimiento-fac.herokuapp.com/*

App de reconocimiento facial. Esta parte corresponde al front end creado en react con codigo claro, mantenible y responsivo.
Adicionalmente para descargar la parte backend (API) pueden ingresar al siguiente link: https://github.com/sergio-adame/Face-Recognition-Backend donde encontrarán el server creado en express el cual utiliza una base de datos creada en postgresSQL para almacenar usuarios de manera segura.

# Características


>Registro de usuarios de manera segura mediante la API y una base de datos relacional.
![Register](https://user-images.githubusercontent.com/93287746/150066963-be3ac9bf-e983-407a-a0ff-a27c2e0e75c7.jpg)



>Logueo de usuarios con servidor node hecho desde cero usando express.js
Backend node server built from scratch using Express.js for corresponding face-recognition-app. Implemented persistent user-registration and sign-in by connecting to an RDBMS built using PostgreSQL. Calls Clarifai FACE_DETECTION_MODEL API on the backend to provide face detection capabilites. Server and database deployed using Heroku.
![signin](https://user-images.githubusercontent.com/93287746/150067107-d5249c15-cac3-4d06-9b22-fe0741ca6ba5.jpg)



Reconocimiento facial utilizando la API de Clarifai, mediante nuestra propia API y base de datos se lleva registro del nombre de usuario y su cantidad de imagenes detectadas.
![example](https://user-images.githubusercontent.com/93287746/150067213-2bd701ff-c315-4806-9549-75e0319a9f4f.jpg)
