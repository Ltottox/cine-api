import { Router } from "express";
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from "./actor.controller.js";

const actorRoutes = Router();

// Agregar actor
actorRoutes.post("/actor", async (req, res) => {
    try {
        const actor = await handleInsertActorRequest(req.body);

        if (!actor) {
            return res.status(404).json({
                error: "Película no encontrada"
            });
        }

        res.status(201).json(actor);
    } catch (error) {
        res.status(500).json({
            error: "Error al agregar actor"
        });
    }
});

// Listar todos los actores
actorRoutes.get("/actores", async (req, res) => {
    try {
        const actores = await handleGetActoresRequest();
        res.status(200).json(actores);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener actores"
        });
    }
});

// Buscar actor por ID
actorRoutes.get("/actor/:id", async (req, res) => {
    try {
        const actor = await handleGetActorByIdRequest(req.params.id);

        if (!actor) {
            return res.status(404).json({
                error: "Actor no encontrado"
            });
        }

        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener actor"
        });
    }
});

// Buscar actores por ID de película
actorRoutes.get("/actores/pelicula/:idPelicula", async (req, res) => {
    try {
        const actores = await handleGetActoresByPeliculaIdRequest(
            req.params.idPelicula
        );

        res.status(200).json(actores);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener actores de la película"
        });
    }
});

export default actorRoutes;