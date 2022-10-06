import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../../DB/models/User.js";
import sendEmail from "../../../services/confirmEmail.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ softDeleted: false });
    res.json({ users });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserModel.deleteOne({
      _id: req.user._id,
      softDeleted: false,
      confirmEmail: true,
    });
    if (result.deletedCount) {
      res.json({ message: "Done", result });
    } else {
      res.json({ message: "wrong user id" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const softDeleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserModel.findOneAndUpdate(
      { _id: req.user._id, softDeleted: false, confirmEmail: true },
      { softDeleted: true },
      { new: true }
    );
    if (result) {
      res.json({ message: "Done", result });
    } else {
      res.json({ message: "wrong user id" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      phone,
      profielPic,
      coverPic,
    } = req.body;
    const user = await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
        phone,
        profielPic,
        coverPic,
      },
      { new: true }
    );
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "wrong user id" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne(
      { _id: id, confirmEmail: true, softDeleted: false },
      "firstName lastName age email profielPic coverPic"
    );
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "wrong user id" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getLastSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserModel.findOne({ _id: id, isOnline: false }).select(
      "lastSeen"
    );
    if (result) {
      res.json({ message: "Done", result });
    } else {
      res.json({ message: "no last seen" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user._id).select("password");
    if (user) {
      const match = await bcrypt.compare(oldPassword, user.password);
      if (match) {
        const hashedPassword = await bcrypt.hash(
          newPassword,
          +process.env.SALTROUNDS
        );
        const result = await UserModel.updateOne(
          { _id: req.user._id },
          { password: hashedPassword }
        );
        if (result.modifiedCount) {
          res.json({ message: "Done", result });
        } else {
          res.json({ message: "wrong request" });
        }
      } else {
        res.json({ message: "wrong old Password" });
      }
    } else {
      res.json({ message: "wrong user id" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const shareProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne(
      { _id: id, confirmEmail: true, softDeleted: false },
      "firstName lastName profielPic coverPic lastSeen isOnline"
    );
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "wrong user id" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const forgetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email }).select("email");
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.TOKENSIGNATURE, {
      expiresIn: "1h",
    });
    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/user/password/${token}`;
    const message = `<a href= ${link} > Click to update Your password Now </a>`;
    sendEmail(email, message);
    res.json({ message: "Done" });
  } else {
    res.json({ message: "wrong user email" });
  }
};
export const forgetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const decoded = jwt.verify(token, process.env.TOKENSIGNATURE);
  if (decoded) {
    const hashedPassword = await bcrypt.hash(
      newPassword,
      +process.env.SALTROUNDS
    );
    const result = await UserModel.updateOne(
      { _id: decoded.id },
      { password: hashedPassword }
    );
    result.modifiedCount
      ? res.json({ message: "Done" })
      : res.json({ message: "wrong request" });
  } else {
    res.json({ message: "In-valid Token" });
  }
};
