import { db, sql } from "../../models/pg-connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginInterface } from "../../utils/interfaces";
import { loginValidation } from "../../utils/validations";

export const login = async (req: any, res: any) => {
  const { email, password }: LoginInterface = req.body;

  const error = loginValidation(email, password);

  if (error.email) return res.status(404).json({ error: error.email });
  if (error.password) return res.status(404).json({ error: error.password });

  let [user] = await db.query(sql`SELECT * FROM users`);

  if (!user) return res.status(404).json({ error: "User have not register" });

  try {
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(404).json({ error: "Password is invalid" });

    const token = await jwt.sign({ user }, process.env.SECRET_KEY);
    res.header("authorization", token);
    res.json({ data: user, token });
    return;
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
