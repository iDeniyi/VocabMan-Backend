import { Router } from "express";
import { getCurrentUser } from "../controllers/userControllers";

const router = Router();

router.get("/current", getCurrentUser);

export default router;
