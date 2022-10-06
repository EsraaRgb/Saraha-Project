import UserModel from "../../../DB/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../../services/confirmEmail.js";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, age, gender, phone } = req.body;
  const result = await UserModel.findOne({ email });
  if (result) {
    res.json({ message: "Email already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALTROUNDS)
    );
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      phone,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id:savedUser._id }, process.env.TOKENSIGNATURE, {
      expiresIn: "1h",
    });
    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`;

    const message = `<a href= ${link} > Click to Activate Your Email Now </a>`;
    sendEmail(savedUser.email, message);
    res.json({ message: "Done", savedUser });
  }
};

export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.TOKENSIGNATURE);
  const result = await UserModel.updateOne(
    { _id: decoded.id, confirmEmail: false },
    { confirmEmail: true },
    { new: true }
  );
  result.modifiedCount
    ? res.json({ message: "Done" })
    : res.json({ message: "wrong request" });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
    confirmEmail: true,
    softDeleted: false,
  });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.TOKENSIGNATURE,
        {
          expiresIn: "12h",
        }
      );
      await UserModel.findByIdAndUpdate({ _id: user._id }, { isOnline: true });
      res.json({ message: "Done", token });
    } else {
      res.json({ message: "In-valid Account {password}" });
    }
  } else {
    res.json({ message: "In-valid Account {email}" });
  }
};
export const signout = async (req, res) => {
  try {
    const result = await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      { isOnline: false , lastSeen:new Date}
    );
    if (result) {
      res.json({ message: "Done" });
    } else {
      res.json({ message: "In-valid User Account" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
}

export const refreshToken = async (req, res) => {};

