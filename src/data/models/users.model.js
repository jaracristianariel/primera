import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
    {
        name: { type: String },
        date: { type: Date },
        city: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        avatar: { type: String, default: "https://gravatar.com/avatar/248bdefecfb4664b5b2e8335c61a66f5?s=400&d=robohash&r=x" },
        role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"], index: true },
    },
    { timestamps: true}
);

const User= model(collection, schema);
export default User;