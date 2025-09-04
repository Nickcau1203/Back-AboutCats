import express from "express";
import GatoController from "../controllers/gatoController.js";

const gatoRouter = express.Router();

// Rotas de Gatos
// GET /gatos - Listar todos os Gatos
gatoRouter.get("/", GatoController.getAllGatos);

// GET /gatos/:id - Obter um Gato pelo ID
gatoRouter.get("/:id", GatoController.getGatoById);

// POST /gatos - Criar um novo Gato
gatoRouter.post("/", GatoController.createGato);

// PUT /gatos/:id - Atualizar um Gato
gatoRouter.put("/:id", GatoController.updateGato);

// DELETE /gatos/:id - Remover um Gato
gatoRouter.delete("/:id", GatoController.deleteGato);

export default gatoRouter;