import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./utils/config.js";

// components
import Connection from "./database/db.js";
import authRouter from "./routes/authRoutes.js";
import imageUploadRouter from "./routes/imageUploadRouter.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", authRouter);
app.use("/file", imageUploadRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
Connection();
