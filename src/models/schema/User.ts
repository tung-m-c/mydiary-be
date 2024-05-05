import { Model, Schema, model } from 'mongoose';

import { User } from 'models/types/User';
import { MODELS } from 'utils/constants/models';

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    bio: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const UserModel: Model<User> = model<User>(MODELS.user, UserSchema, MODELS.user);
export default UserModel;
