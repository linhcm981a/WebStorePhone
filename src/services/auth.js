import verifyToken from "../services/verifyToken.js";
import TokenModel from "../token/models.js";
export const checkToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token);
      const tokenExists = await TokenModel.findOne({ token });
      if (!tokenExists) {
        return res.status(401).json({ message: "Token not found" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default checkToken;
