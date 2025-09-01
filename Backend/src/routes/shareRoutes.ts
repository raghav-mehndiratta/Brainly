import express from "express";
import { shareContent, viewSharedContent } from "../controllers/shareController";
import { userMiddleware } from "../middlewares/userMiddleware";

const router = express.Router();

router.post("/share", userMiddleware, shareContent);
router.get("/:hash", viewSharedContent);

export default router;
