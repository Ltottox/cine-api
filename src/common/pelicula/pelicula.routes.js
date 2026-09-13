import { Router } from "express";
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
} from "./pelicula.controller.js";

const peliculaRoutes = Router();

// Agregar película
peliculaRoutes.post("/pelicula", async (req, res) => {
    try {
        const pelicula = await handleInsertPeliculaRequest(req.body);
        res.status(201).json(pelicula);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar película" });
    }
});

// Listar películas
peliculaRoutes.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await handleGetPeliculasRequest();
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener películas" });
    }
});

// Buscar película por ID
peliculaRoutes.get("/pelicula/:id", async (req, res) => {
    try {
        const pelicula = await handleGetPeliculaByIdRequest(req.params.id);

        if (!pelicula) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener película" });
    }
});

// Actualizar película
peliculaRoutes.put("/pelicula/:id", async (req, res) => {
    try {
        const resultado = await handleUpdatePeliculaByIdRequest(
            req.params.id,
            req.body
        );

        if (!resultado || resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        res.status(200).json({ mensaje: "Película actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar película" });
    }
});

// Eliminar película
peliculaRoutes.delete("/pelicula/:id", async (req, res) => {
    try {
        const resultado = await handleDeletePeliculaByIdRequest(req.params.id);

        if (!resultado || resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        res.status(200).json({ mensaje: "Película eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar película" });
    }
});

export default peliculaRoutes;