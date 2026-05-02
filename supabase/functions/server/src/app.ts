import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/make-server-3e0adeba/health", healthRoutes);
app.use("/make-server-3e0adeba/auth", authRoutes);
app.use("/make-server-3e0adeba/contact", contactRoutes);

export default app;