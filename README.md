# OpenJira con NextJS
Imitación de Jira para organizar tareas realizado en Next.Js y MongoDB con fines educativos.

## Tecnologías
- [Next.js 12](https://nextjs.org/)
- React 18
- Typescript
- [Material UI 5.6.4](https://mui.com/)
- [Notistack 2.0.4](https://github.com/iamhosseindhv/notistack)
- MongoDB
- [Mongoose 6.3.2](https://mongoosejs.com/)
- [Mongo Atlas](https://www.mongodb.com/atlas/database)


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