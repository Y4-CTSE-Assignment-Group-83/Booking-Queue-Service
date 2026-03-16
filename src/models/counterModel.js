import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    queueDate: {
      type: String,
      required: true,
      unique: true,
    },
    sequenceValue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;