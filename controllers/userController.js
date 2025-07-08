import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

// export const registerController = async (req, res) => {
//   try {
//     const { name, email, password, address, city, country } = req.body;
//     // validation
//     if (!name || !email || !password || !city || !address || !country) {
//       return res.status(500).send({
//         success: false,
//         message: "Plz Provide All Fields",
//       });
//     }
//     const user = await userModel.create({
//       name,
//       email,
//       password,
//       address,
//       city,
//       country,
//     });
//     res.status(201).send({
//       success: true,
//       message: "Registration Success,plz login",
//       user,
//     });

//     //check exitsiting users
//     const exitsitingUsers = await userModel.findOne({ email });
//     if (exitsitingUsers) {
//       return res.status(500).send({
//         success: false,
//         message: "email already taken",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In Register API",
//       error,
//     });
//   }
// };
export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone, answer } =
      req.body;
    // validation
    if (
      !name ||
      !email ||
      !password ||
      !city ||
      !address ||
      !country ||
      !phone ||
      !answer
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //check exisiting user
    const exisitingUSer = await userModel.findOne({ email });
    //validation
    if (exisitingUSer) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Registeration Success, please login",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

//Login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "plz Add email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // check Password
    const isMatch = await user.comparePassword(password);
    //validation pass
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }
    // token
    const token = user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error in Login Api",
      error,
    });
  }
};

//profile

export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User Profile fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in profile APi",
      error,
    });
  }
};

//Logout

export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Logout APi",
      error,
    });
  }
};

//update-profile
// export const updateProfileController = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     const { name, email, address, city, country, phone } = req.body;
//     // validation + update
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (address) user.address = address;
//     if (city) user.city = city;
//     if (country) user.country = country;
//     if (phone) user.phone = phone;
//     await user.save();
//     res.status(200).send({
//       success: true,
//       message: "User Profile Updated",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in Logout APi",
//       error,
//     });
//   }
// };

export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;
    // validation + Update
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update profile API",
      error,
    });
  }
};
// update password

export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldpassword, newpassword } = req.body;
    // validation
    if (!oldpassword || !newpassword) {
      return res.status(500).send({
        success: false,
        message: "Plz provide old oornew password",
      });
    }
    const isMatch = await user.comparePassword(oldpassword);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    user.password = newpassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Logout APi",
      error,
    });
  }
};

// update profile pic
export const updateProfilePiController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    //file get from client photo
    const file = getDataUri(req.file);
    // delete prev image
    // await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    // update
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    await user.save();
    res.status(200).send({
      success: true,
      message: "profile picture updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Logout APi",
      error,
    });
  }
};
