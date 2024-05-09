import { Router } from "express";
import { logUserActivity } from "../controllers/activityController";

const router = Router();

router.post("/", logUserActivity);

export default router;
