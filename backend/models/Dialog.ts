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
  message: {
    type: Types.ObjectId,
    ref: "Message"
  }
}, {
  timestamps: true
});

const DialogModel = model<DialogModelDocument>('Dialog', DialogSchema);

export { DialogModel, DialogModelDocument };