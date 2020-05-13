import { db, sql } from "../../models/pg-connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");
import { RegisterInterface } from "../../utils/interfaces";
import { registerValidation } from "../../utils/validations";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

export const register = async (req: any, res: any) => {
  const {
    first_name,
    last_name,
    phone,
    is_seller,
    email,
    password,
    image_url,
  }: RegisterInterface = req.body;

  const error = registerValidation(
    first_name,
    last_name,
    phone,
    is_seller,
    email,
    password
  );

  if (error.first_name)
    return res.status(404).json({ error: error.first_name });
  if (error.last_name) return res.status(404).json({ error: error.last_name });
  if (error.phone) return res.status(404).json({ error: error.phone });
  if (error.is_seller) return res.status(404).json({ error: error.is_seller });
  if (error.email) return res.status(404).json({ error: error.email });
  if (error.password) return res.status(404).json({ error: error.password });

  let [user] = await db.query(
    sql`SELECT email FROM users WHERE email=${email}`
  );
  if (user) {
    return res.status(404).json({ error: "User exist" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const bool: boolean = is_seller === "seller" ? true : false;

  try {
    user = await db.query(
      sql`INSERT INTO users(first_name, last_name, phone, is_seller, email, password, user_image) VALUES (${first_name}, ${last_name}, ${phone}, ${bool}, ${email}, ${hashedPassword}, ${image_url}) returning *`
    );
    const token = await jwt.sign({ user }, process.env.SECRET_KEY);
    res.header("authorization", token);
    res.json({ data: user, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
  // cloudinary.v2.uploader.upload(req.files.image.path, async (result: any) => {
  //   console.log(result.url);
  // });
};
