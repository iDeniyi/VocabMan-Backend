import { Router } from "express";
import { getChallengeByDate } from "../controllers/challengeController";

const router = Router();
router.get("/:date", getChallengeByDate);

export default router;
