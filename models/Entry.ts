import mongoose, { Model, Schema } from "mongoose";
import { IEntry } from "../interfaces";

export interface IEntryModel extends IEntry {

}

const entrySchema = new Schema<IEntryModel>({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: { type: String, enum: {
    values: ['pending', 'in-progress', 'finished'],
    message: '{VALUE} no es un estado permitido'
  }}
})

const EntryModel: Model<IEntryModel> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel
