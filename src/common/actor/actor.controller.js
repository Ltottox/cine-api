import { ObjectId } from "mongodb";
import client from "../db.js";

const actorCollection = client.db("cine-db").collection("actores");
const peliculaCollection = client.db("cine-db").collection("peliculas");

// Agregar un actor
export const handleInsertActorRequest = async (actor) => {
    try {
        const peliculaId = ObjectId.createFromHexString(actor.idPelicula);

        const peliculaExiste = await peliculaCollection.findOne({
            _id: peliculaId
        });

        if (!peliculaExiste) {
            return null;
        }

        const resultado = await actorCollection.insertOne(actor);

        return {
            _id: resultado.insertedId,
            ...actor
        };
    } catch (error) {
        return null;
    }
};

// Listar todos los actores
export const handleGetActoresRequest = async () => {
    return await actorCollection.find({}).toArray();
};

// Buscar actor por ID
export const handleGetActorByIdRequest = async (id) => {
    try {
        const actorId = ObjectId.createFromHexString(id);

        return await actorCollection.findOne({
            _id: actorId
        });
    } catch (error) {
        return null;
    }
};

// Buscar actores por ID de película
export const handleGetActoresByPeliculaIdRequest = async (idPelicula) => {
    return await actorCollection.find({
        idPelicula: idPelicula
    }).toArray();
};