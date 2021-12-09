import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/config.js";

const Connection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected succesfully");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};

export default Connection;
