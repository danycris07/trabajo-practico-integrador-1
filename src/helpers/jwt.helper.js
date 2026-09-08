import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || "1h",
    });
  } catch (error) {
    throw new Error("Error generando el token");
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};