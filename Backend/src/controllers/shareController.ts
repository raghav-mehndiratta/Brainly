import { Request, Response } from "express";
import { LinkModel, UserModel, ContentModel } from "../models/db";
import { random } from "../utils";

export const shareContent = async (req: Request, res: Response): Promise<void> => {
  const share = req.body.share;

  if (share) {
    const existing = await LinkModel.findOne({ userId: req.userId });
    if (existing) {
      res.json({ hash: existing.hash });
      return;
    }
    const hash = random(10);
    await LinkModel.create({ userId: req.userId, hash });
    res.json({ message: `/share/${hash}` });
  } else {
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Removed Link" });
  }
};

export const viewSharedContent = async (req: Request, res: Response): Promise<void> => {
  const hash = req.params.hash;

  const link = await LinkModel.findOne({ hash });

  if (!link) {
    res.status(400).json({ message: "Sorry, incorrect link" });
    return;
  }

  const content = await ContentModel.find({ userId: link.userId });
  const user = await UserModel.findById(link.userId);

  res.json({
    username: user?.username,
    content
  });
};
