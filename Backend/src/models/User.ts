import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string; // Optional in case of OAuth in future
  role: string;
  school: string;
  avatarColor: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Educator' },
  school: { type: String, default: 'Delhi Public School, Bokaro Steel City' },
  avatarColor: { type: String, default: '#FFE2D2' }
}, {
  timestamps: true
});

export const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
