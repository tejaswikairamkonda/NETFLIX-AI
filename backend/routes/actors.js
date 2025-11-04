import express from "express";
import { getPopularActors, getActorDetails } from "../controllers/actorController.js";

const router = express.Router();

router.get("/popular", getPopularActors);
router.get("/:id", getActorDetails);

export default router;
