import * as mongoose from 'mongoose'

export interface IView extends mongoose.Document {
  visitedAt: Date
  visitedBy: string
}

const ViewSchema = new mongoose.Schema({
  visitedAt: Date,
  visitedBy: String,
})

export const View = mongoose.model<IView>('View', ViewSchema)
