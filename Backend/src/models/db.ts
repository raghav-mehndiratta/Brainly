// create models and schemas
import { model, Schema } from "mongoose"
import mongoose from "mongoose";
import { string } from "zod";
require("dotenv").config();

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL as string).then(() => {
        console.log("DB connected");

    }).catch((err) => {
        console.log("Error while Connecting to db ", err);

    });
}

connectDB();

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    link: { type: String },
    type: { type: String },
    title: { type: String },
    selectedTags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' }
})
export const ContentModel = model("Content", ContentSchema)

const LinkSchema = new Schema({
    hash: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', unique: true },
})
export const LinkModel = model("Link", LinkSchema)

const TagSchema = new Schema({
    name: { type: String, unique: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const TagModel = model("Tag", TagSchema);
