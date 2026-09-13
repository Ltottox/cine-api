import { ObjectId } from "mongodb";
import client from "../db.js";

const peliculaCollection = client.db("cine-db").collection("peliculas");

// Agregar una película
export const handleInsertPeliculaRequest = async (pelicula) => {
    const resultado = await peliculaCollection.insertOne(pelicula);

    return {
        _id: resultado.insertedId,
        ...pelicula
    };
};

// Listar todas las películas
export const handleGetPeliculasRequest = async () => {
    return await peliculaCollection.find({}).toArray();
};

// Buscar una película por su ID
export const handleGetPeliculaByIdRequest = async (id) => {
    try {
        const peliculaId = ObjectId.createFromHexString(id);

        return await peliculaCollection.findOne({
            _id: peliculaId
        });
    } catch (error) {
        return null;
    }
};

// Actualizar una película por su ID
export const handleUpdatePeliculaByIdRequest = async (id, pelicula) => {
    try {
        const peliculaId = ObjectId.createFromHexString(id);

        return await peliculaCollection.updateOne(
            { _id: peliculaId },
            { $set: pelicula }
        );
    } catch (error) {
        return null;
    }
};

// Eliminar una película por su ID
export const handleDeletePeliculaByIdRequest = async (id) => {
    try {
        const peliculaId = ObjectId.createFromHexString(id);

        return await peliculaCollection.deleteOne({
            _id: peliculaId
        });
    } catch (error) {
        return null;
    }
};
