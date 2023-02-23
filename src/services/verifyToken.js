import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "my_secret_key");
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default verifyToken;
