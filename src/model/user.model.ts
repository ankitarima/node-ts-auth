import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["admin", "user", "manager"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.index({ email: 1 });

// middleware to hash password using bycryptjs
UserSchema.pre("save", async function (this: UserDocument) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJWT = function () {
  const JWT_SECRET = config.get<string>("JWT_SECRET");
  const JWT_EXPIRE = config.get<string>("JWT_EXPIRE");
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

// Match passwords
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(enteredPassword, user.password);
};

export default mongoose.model<UserDocument>("User", UserSchema);
