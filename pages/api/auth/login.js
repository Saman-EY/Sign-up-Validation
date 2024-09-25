import User from "@/models/User";
import { validatePass } from "@/utils/auth";
import connectDb from "@/utils/connectDB"; 
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password } = req.body;

  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "error in connecting to dataBase" });
  }

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "invalid data" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user not found!" });
  }

  const isValidate = await validatePass(password, user.password);

  if (!isValidate) {
    return res
      .status(401)
      .json({ status: "failed", message: "email or password is incorrect" });
  }

  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
  }
  const token = sign({ email }, secretKey, { expiresIn: expiration });

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        maxAge: expiration,
        path: "/",
      })
    )
    .json({ status: "success", message: "logged in!" });
}
