import { Request, Response } from "express";
import { UserModel } from "../models/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signup = async (req: Request, res: Response): Promise<void> => {
  const schema = z.object({
    username: z.string().min(1, "Username must be provided"),
    email: z.string().min(1, "Email must be provided").email(),
    password: z.string().min(1, "Password must be provided").min(3, "Password must be at least 3 characters long")
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0].message });
    return;
  }

  const { username, email, password } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 4);

  try {
    await UserModel.create({ username, email, password: hashedPassword });
    res.json({ message: "Signed up successfully" });
  } catch (err: any) {
    if (err.code === 11000) { // 11000 is the error code for duplicate key in MongoDB
      res.status(400).json({ message: "User already exists" });
    } else {
      res.status(500).json({ message: "Something went wrong", error: err });
    }
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const schema = z.object({
    email: z.string().min(1, "Email must be provided").email(),
    password: z.string().min(1, "Password must be provided").min(3, "Password must be at least 3 characters long")
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0].message });
    return;
  }

  const { email, password } = parsed.data;
  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User does not exist" });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.status(200).json({ token });
};
