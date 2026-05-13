import jwt from "jsonwebtoken";

//function for seller login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email, and password are required",
      });
    }

    if ( 
      email !== process.env.SELLER_EMAIL &&
      password !== process.env.SELLER_PSD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credential" });
    }

    const token = jwt.sign({ role: "admin", email }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    res.cookie("sellerToken", token, {
      httpOnly: true, // Prevent Javascript to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
    });
    return res
      .status(200)
      .json({ success: true, message: "seller login successfully"});
  } catch (error) {
    console.error("Seller login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


// check if the seller is Auth

export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true});
  } catch (error) {
    console.error("isAuth error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};


//function for seller logout

export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true, // Prevent Javascript to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
    });

    return res.status(200).json({ success: true, message: "Seller logout" });
  } catch (error) {
    console.error("error logging out", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


//function to get seller data
export const sellerData = async (req, res) => {
  try {
    // comes from auth middleware
    const sellerEmail = req.sellerEmail;

    res.status(200).json({
      success: true,
      seller: sellerEmail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving seller data",
    });
  }
};

