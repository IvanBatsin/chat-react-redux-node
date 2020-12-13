import { Schema, model, Document, Types } from 'mongoose';

interface IDialog {
  author:  Types.ObjectId,
  partner: Types.ObjectId,
}

type DialogModelDocument = IDialog & Document;

const DialogSchema = new Schema<DialogModelDocument>({
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  partner: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  lastMessage: {
    type: Types.ObjectId,
    ref: "Message",
    required: true
  }
}, {
  timestamps: true
});

const DialogModel = model<DialogModelDocument>('Dilaog', DialogSchema);

export { DialogModel, DialogModelDocument };