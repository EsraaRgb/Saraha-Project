import UserModel from "../../../DB/models/User.js";

export const updateProfile = async (req, res) => {
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ softDeleted: false });
    res.json({ users });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const id = req.params;
    const user = await UserModel.findOne(
      { _id: id, confirmEmail: true, softDeleted: false },
      { firstName, lastName, lastSeen, profielPic, coverPic }
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

export const shareProfile = async (req, res) => {};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await UserModel.updateOne(
      { _id: req.user._id, password: oldPassword },
      { password: newPassword }
    );
    if (result.modifiedCount) {
      res.json({ message: "Done", result });
    } else {
      res.json({ message: "wrong Password" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const getLastSeen = async (req, res) => {
  // if user is loggedout
  try {
    const { id } = req.params;
    const result = await UserModel.findOne(
      { _id: id, isOnline: false },
      { lastSeen }
    );
    if (result.modifiedCount) {
      res.json({ message: "Done", result });
    } else {
      res.json({ message: "wrong Password" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const forgetPassword = async (req, res) => {};
