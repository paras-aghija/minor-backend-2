import bcrypt from "bcrypt";
import User from "../schema/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error occured" });
  }
};

export const userSignup = async (req, res) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    const userBody = {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      age: req.body.age,
      passwordHash,
    };
    const user = await new User(userBody);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Some error occured" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(req.body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error occured" });
  }
};
