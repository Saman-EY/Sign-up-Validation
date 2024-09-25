import User from "@/models/User";
import { verifyToken } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") return;

  const { token } = req.cookies;

  const isValidate = verifyToken(token, process.env.SECRET_KEY);

  const user = await User.findOne({ email: isValidate.email });
  
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user not found" });
  }

  if (isValidate) {
    return res
      .status(200)
      .json({
        status: "success",
        message: "you are logged in",
        userName: user.name,
      });
  } else {
    return res.status(401).json({ status: "failed", message: "not log in" });
  }
}
