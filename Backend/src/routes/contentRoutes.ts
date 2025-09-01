import express from "express";
import { addContent, getContent, deleteContent } from "../controllers/contentController";
import { userMiddleware } from "../middlewares/userMiddleware";

const router = express.Router();

router.post("/", userMiddleware, addContent);
router.get("/", userMiddleware, getContent);
router.delete("/", userMiddleware, deleteContent);

export default router;
