import UserModel from "../../../DB/models/User.js";
import MessageModel from "../../../DB/models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const user = await UserModel.findOne(
      { _id: id, softDeleted: false, confirmEmail: true },
      { firstName, lastName, email }
    );
    if (user) {
      const message = new MessageModel({ text, userID: id });
      const savedMessage = await message.save();
      res.json({ message: "Done" });
    } else {
      res.json({ message: "In-valied userid" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MessageModel.deleteOne({
      _id: id,
      userID: req.user._id,
    });
    result.deletedCount
      ? res.json({ message: "Done" })
      : res.json({ message: "In-valied request" });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const GetAllMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({ userID: req.user._id });
    res.json({ message: "Done", messages });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const softDeleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MessageModel.findOneAndUpdate(
      {
        _id: id,
        userID: req.user._id,
        softDeleted: false,
      },
      { softDeleted: true }
    );
    result
      ? res.json({ message: "Done" })
      : res.json({ message: "In-valied request" });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
