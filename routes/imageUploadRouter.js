import express from "express";

import { uploadImage, getImage } from "../controllers/imageController.js";
import upload from "../utils/upload.js";

const Router = express.Router();

Router.post("/upload", upload.single("file"), uploadImage);
Router.get("/:filename", getImage);
export default Router;
