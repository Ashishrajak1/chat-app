import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: false,
  },
  lastName: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    require: [true, "Password is required"],
  },
  image: {
    type: String,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const Salt = await genSalt();
  this.password = await hash(this.password, Salt);
  next();
});

const user = mongoose.model("Users", userSchema);
export default user;
