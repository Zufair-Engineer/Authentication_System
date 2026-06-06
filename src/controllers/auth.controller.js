import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../config/token.js";

/**
 * - register api
 * - Method POST
 * -/api/auth/register
 */

const RegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist...!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // if (!hashedPassword) console.log("Error to hashed Password");

    const newUser = await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({
      success: true,
      message: "Successfully User Created",
      user: newUser,
    });

  } catch (error) {
    console.log(`Error to Register User`, error);
    return res.status(500).json({
      success: false,
      message: "User Cannot Register...",
    });
  }
};

/**
 * - login api
 * - Method POST
 * -/api/auth/login
 */

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User Cannot Exist...!",
      });
    }

    const isPassword = bcrypt.compare(password,isUser.password);
    if(!isPassword){
        return res.status(400).json({
        success: false,
        message: "Email and Password Incorrect...!",
      });
    }

    const token = generateToken(isUser);
    res.cookie("token",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        message: "User Login Successfully",
        token,
    })
  } catch (error) {
    console.log(`Error to Register User`, error);
    return res.status(500).json({
      success: false,
      message: "User Cannot Register...",
    });
  }
};

/**
 * - logout api
 * - Method GET
 * -/api/auth/logout
 */

const LogoutController = async (req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: true
        });
        return res.status(200).json({
            success: true,
            message: "User successfully Logout..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error to Logout User ${error}`
        })
    }
}

export default {
    RegisterController,
    LoginController,
    LogoutController
}