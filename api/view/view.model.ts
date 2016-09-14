import * as mongoose from 'mongoose'

export interface IView extends mongoose.Document {
  _id: string,
  visitedAt: Date
  visitedBy: string
  public: {
    visitedAt: Date
    visitedBy: string
  }
}

const ViewSchema = new mongoose.Schema({
  visitedAt: Date,
  visitedBy: String,
})

ViewSchema.virtual('public').get(function () {
  return {
    visitedAt: this.visitedAt,
    visitedBy: this.visitedBy,
  }
})

export const View = mongoose.model<IView>('View', ViewSchema)
