import jwt from "jsonwebtoken";

export const generateToken = (userId, res) =>{
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.cookie("_token_", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // cookie cannot be accessed by client side javascript
        sameSite: "strict", // cookie cannot be accessed by cross-site requests
        secure: process.env.NODE_ENV !== "development", // cookie can only be sent over HTTPS
    })

    return token;
}