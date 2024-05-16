import { Router } from "express";
import {
    logUserActivity,
    updateNewWord,
} from "../controllers/activityController";

const router = Router();

router.post("/", logUserActivity);
router.post("/update-new-word", updateNewWord);

export default router;
