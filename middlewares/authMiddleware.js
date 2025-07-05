import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    //validation

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized user",
      });
    }
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in profile APi",
      error,
    });
  }
};
