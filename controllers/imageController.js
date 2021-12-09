import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = `http://localhost:3001`;

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json("File not found");
    }
    const imgUrl = `${url}/file/${req.file.filename}`;
    res.status(200).json(imgUrl);
  } catch (error) {
    console.log("error while uploading image", error);
    res.json(500).json("error uploading image");
  }
};

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to fetch the image");
  }
};
