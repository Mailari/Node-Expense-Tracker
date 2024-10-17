import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    picture: String,
  },
  {
    timestamps: true,
  }
);

const User = model("Users", UserSchema);

export default User;
