import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model("users ", UserSchema);
