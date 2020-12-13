import { Schema, model, Document } from 'mongoose';

interface IUser {
  fullName: string,
  userName: string,
  email: string,
  avatarUrl: string,
  confirmed: boolean,
  confirm_hash: string,
  password: string,
  last_seen: Date
}

type UserModelDocument = IUser & Document;

const UserSchema = new Schema<UserModelDocument>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: true
  },
  confirm_hash: {
    type: String
  },
  last_seen: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: true
}
);

UserSchema.set('toJSON', {
  transform: function(_: any, obj: any){
    delete obj.password;
    delete obj.confirm_hash;
    return obj;
  }
});

const UserModel = model<UserModelDocument>('User', UserSchema);
export { UserModel, UserModelDocument }