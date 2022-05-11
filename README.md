# OpenJira con NextJS

## Tecnologías

## Idea
Proyecto basado en curso [Next.js: El framework de React para producción (Fernando Herrera)](https://www.udemy.com/course/nextjs-fh/), secciones 7 a 10.

## Demo
[https://openjira-nextjs.vercel.app/](https://openjira-nextjs.vercel.app/)

## Comandos
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```
* El -d, significa __detached__


### Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

* Reconstruir los módulos de node y levantar Next
```
npm install
npm run dev
```

### Llenar la base de datos con información de pruebas
Llamar a:
```
http://localhost:3000/api/seed
```