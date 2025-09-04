import express from "express";

// Importar todas as rotas
import authRouter from "./auth.routes.js";
import cardRouter from "./cardRoutes.js";
import gatoRouter from "./gatoRoutes.js"; // Importar as rotas de gatos

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);
router.use("/cards", cardRouter);

// Rotas protegidas
router.use(authMiddleware);

router.use("/gatos", gatoRouter); // Adicionar as rotas de gatos

export default router;