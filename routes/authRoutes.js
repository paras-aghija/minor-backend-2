import express from "express";
import {
  getUsers,
  userLogin,
  userSignup,
} from "../controllers/authControllers.js";

const Router = express.Router();

Router.get("/users", getUsers);
Router.post("/signup", userSignup);
Router.post("/login", userLogin);

export default Router;
