import express, { Express } from "express";
import cors from "cors";

import auth from "./routes/authRoutes";
import user from "./routes/userRoutes";
import challenge from "./routes/challengeRoutes";
import activity from "./routes/activityRoutes";
import authenticate from "./middleware/authenticate";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", authenticate, user);
app.use("/api/v1/challenge", authenticate, challenge);
app.use("/api/v1/activity", authenticate, activity);

export default app;
