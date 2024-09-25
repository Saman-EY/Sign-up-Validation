import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDb from "@/utils/connectDB";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password, name } = req.body; // Corrected here

  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "error in connecting to dataBase" }); // Fixed typo and added return
  }

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "invalid data" });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(422)
      .json({
        status: "failed",
        message: "user already exists with this email",
      }); // Added return
  } else {
    const hashedPass = await hashPassword(password); // Uncomment and handle password hashing properly
    const secretKey = process.env.SECRET_KEY;
    const expiration = 24 * 60 * 60;
    const newUser = await User.create({
      email: email,
      password: hashedPass,
      name: name,
    }); // Use hashedPass here

    console.log(newUser);

    const token = sign({ email }, secretKey, { expiresIn: expiration });
    const serialized = serialize("token", token, {
      maxAge: expiration,
      httpOnly: true,
      path: "/",
    });

    res
      .status(201)
      .setHeader("Set-Cookie", serialized)
      .json({ status: "success", message: "user created" });
  }
}
