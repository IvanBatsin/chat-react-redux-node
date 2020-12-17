import { Schema, model, Types } from 'mongoose';

interface IMessage {
  author: Types.ObjectId,
  text: string,
  dialog: Types.ObjectId,
  unread: boolean
}

type MessageDocumentModel = IMessage & Document;

const MessageSchema = new Schema<MessageDocumentModel>({
  text: {
    type: String
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  unread: {
    type: Boolean,
    default: true
  },
  dialog: {
    type: Types.ObjectId,
    ref: 'Dialog'
  }
}, {
  timestamps: true
});

const MessageModel = model('Message', MessageSchema);

export { MessageModel, MessageDocumentModel };