import jwt from "jsonwebtoken";

//function for user authentication
export const usersAuth = async (req, res, next) => {
  try {
    req.body = req.body || {};
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);
    //console.log(decode);
    if (!decode.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    // now safe to set
    req.userId = decode.id;
    
    return next();
  } catch (error) {
    console.error("Not Authorized:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// export const usersAuth = (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     if (!token)
//       return res
//         .status(401)
//         .json({ success: false, message: "Not Authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     if (!decoded.id)
//       return res
//         .status(401)
//         .json({ success: false, message: "Not Authorized" });

//     // attach here
//     req.user = { id: decoded.id };
//     return next();
//   } catch (error) {
//     console.error("Not Authorized:", error);
//     return res.status(401).json({ success: false, message: "Not Authorized" });
//   }
// };
