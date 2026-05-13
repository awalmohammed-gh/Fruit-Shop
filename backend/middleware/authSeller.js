import jwt from "jsonwebtoken";



const authSeller = async (req, res, next) => {
  try {
    const sellerToken = req.cookies.sellerToken;

    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decode = jwt.verify(sellerToken, process.env.JWT_KEY);

    //console.log(decode);

    if (decode.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

   req.sellerEmail = decode.email;
   req.sellerRole = decode.role;


    next();
  } catch (error) {
    console.error("Not Authorized:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default authSeller;
