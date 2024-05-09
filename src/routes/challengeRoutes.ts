import { Router } from "express";
import { getChallengeByDate } from "../controllers/ChallengeController";

const router = Router();
router.get("/:date", getChallengeByDate);

export default router;
