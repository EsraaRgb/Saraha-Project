import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    softDeleted: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    isOnline: {
         type: Boolean ,
         default:false
        },
    age: Number,
    phone: String,
    lastSeen: Date,
    profielPic: String,
    coverPic: Array,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
