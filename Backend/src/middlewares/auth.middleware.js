import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies._token_;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized Access - Invalid Token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
