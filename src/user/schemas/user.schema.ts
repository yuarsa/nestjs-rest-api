import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    email: String,
    name: String,
    password: String,
  },
  {
    timestamps: true,
  },
);
