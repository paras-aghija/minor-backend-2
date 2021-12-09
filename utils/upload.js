import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

const promisedDb = mongoose
  .connect(MONGODB_URI)
  .then((instance) => instance.connection.db);

const storage = new GridFsStorage({
  db: promisedDb,
  options: {
    useUnifiedTopology: true,
    useUrlParser: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];
    if (match.indexOf(file.memetype) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
