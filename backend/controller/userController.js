import userModel from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//function for registration
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    //check validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    //get strong password and hash it

    if (password.length < 8) {
      res
        .status(400)
        .json({ success: false, message: "At least 8 characters" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // Prevent Javascript to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
    });

    res.status(200).json({
      success: true,
      user: { email: user.email, name: user.name },
      message: "Account successfully created",
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

//function for logins

export const logins = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email, and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return register
        .status(401)
        .json({ success: false, message: "User does not exit" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid credential" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // Prevent Javascript to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
    });

    return res.status(200).json({
      success: true,
      message: "Login successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};




// check Auth

export const isAuth = async (req, res) => {
  try {
    const userId  = req.userId; // <- this now always exists
    const user = await userModel.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    console.error("isAuth error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};


// export const isAuth = async (req, res) => {
//   try {
//     // read from req.user
//     const user = await userModel.findById(req.user.id).select("-password");
//     return res.json({ success: true, user });
//   } catch (error) {
//     console.error("isAuth error:", error);
//     return res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };



//logout user

export const logout = async (req,res) =>{
    try {
        res.clearCookie("token", {
          httpOnly: true, // Prevent Javascript to access cookie
          secure: process.env.NODE_ENV === "production", // use secure cookies in production
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
        });

        return res.status(200).json({success:true, message:"User logout"})
    } catch (error) {
        console.error("error logging out", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error. Please try again later.",
        });
    }
}

//function to get user data

export const getUserData = async(req,res) =>{
  try {
      const userId = req.userId;
      //console.log(userId);
      if(!userId) {
        return res.status(400).json({success:false, message:"User Id not found"})
      }

      const user = await userModel.findById(userId);
      if(!user){
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({success:true, user})
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message:"Error when getting user data"})
  }
}