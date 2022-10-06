import jwt from "jsonwebtoken";
import UserModel from "../DB/models/User.js";
export const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const decoded = jwt.verify(authorization, process.env.TOKENSIGNATURE);
      if (decoded && decoded.id) {
        const user = await UserModel.findById(decoded.id).select("email");
        if (user) {
          req.user = user;
          next();
        } else {
          res.json({ message: "In-valid token id" });
        }
      } else {
        res.json({ message: "In-valid token id" });
      }
    } catch (error) {
      res.json({ message: "catch error", error });
    }
  };
}

