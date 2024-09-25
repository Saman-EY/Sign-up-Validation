import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  console.log(hashedPassword);
  return hashedPassword;
}

async function validatePass(password, hashedPassword) {
  const isValidate = compare(password, hashedPassword);

  console.log(isValidate);

  return isValidate;
}

function verifyToken(token, secretKey) {
  try {
    const result = verify(token, secretKey);
    console.log(result);
    return {email: result.email}
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { hashPassword, validatePass, verifyToken };
