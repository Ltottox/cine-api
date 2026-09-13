import express from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/common/pelicula/pelicula.routes.js"; 
import actorRoutes from "./src/common/actor/actor.routes.js";

// Configuración del servidor
const app = express();    //instancia de la aplicación Express
const port = 3000;// Puerto en el que se ejecutará el servidor


// Configuración de middlewares
app.use(cors());//middleware para permitir solicitudes desde cualquier origen
app.use(express.json());//middleware que permite recibir datos en formato JSON en el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));//middleware para analizar el cuerpo de las solicitudes con codificación URL

app.use("/api", peliculaRoutes);//Ruta personalizada con el prefijo /api
app.use("/api", actorRoutes);//Ruta personalizada con el prefijo /api 
// Ruta Raíz
app.get("/", (req, res) => {// Ruta raíz que responde con un mensaje de bienvenida
  res.send("Bienvenido al cine Iplacex");
});

//conexion a MongoDB atlas
client.connect()
  .then(() => {
    console.log("Conexión exitosa a MongoDB Atlas");

    // el servidor express solo se inicia si la conexión a la base de datos es exitosa
    const server = app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });

    // Manejo de errores del servidor
    server.on("error", (err) => {
      console.error("Error al iniciar el servidor Express:", err.message);
    });
  })
    .catch((err) => {
      console.error("Error al conectar a MongoDB Atlas:", err.message);
    }); 
