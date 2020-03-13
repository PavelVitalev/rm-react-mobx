import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
    {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email required'],
      },
      password: {
        type: String,
        select: false,
        required: [true, 'Password required'],
      },
      name: {
        type: String,
        required: [false],
      }
    },
    {
      timestamps: true
    }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.getData = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export default mongoose.model('User', UserSchema);
