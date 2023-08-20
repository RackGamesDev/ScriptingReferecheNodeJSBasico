import express from "express";
const router = express.Router();
import usuarioController from '../controllers/usuarioController.js'

router.get('/', usuarioController.list);

export default router;