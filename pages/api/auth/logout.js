import connectDb from "@/utils/connectDB";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") return;

  const serialized = serialize("token", "", { maxAge: 0, path: "/" });

  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({ status: "success", message: "log out successful" });
}
