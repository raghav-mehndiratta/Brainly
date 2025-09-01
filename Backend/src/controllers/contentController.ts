import { Request, Response } from "express";
import { ContentModel } from "../models/db";

export const addContent = async (req: Request, res: Response) => {
  const { link, type, title, selectedTags } = req.body;
  const userId = req.userId;
  await ContentModel.create({
    link: type === "youtube" ? link.replace("watch", "embed") : link,
    type,
    title,
    userId,
    selectedTags,
  }, {
    timestamps: true // this adds createdAt & updatedAt automatically
  });
  res.json({ message: "Content added" });
};

export const getContent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const content = await ContentModel.find({ userId }).populate("userId", "username");
  res.json({ content });
};

export const deleteContent = async (req: Request, res: Response) => {
  const { contentId } = req.body;
  await ContentModel.deleteOne({ _id: contentId, userId: req.userId });
  res.json({ message: "Card Deleted" });
};
