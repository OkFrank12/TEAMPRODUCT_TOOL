import mongoose from "mongoose";

interface iTask {
  task?: string;
  priority?: string;
  name?: string;
  avatar?: string;
  steps?: {}[];
}

interface iTaskData extends iTask, mongoose.Document {}

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      require: true,
    },
    priority: {
      type: String,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    steps: [
      {
        type: mongoose.Types.ObjectId,
        ref: "steps",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iTaskData>("tasks", taskSchema);
