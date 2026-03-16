import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
      default: "",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Service ID is required"],
    },
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    serviceCategory: {
      type: String,
      required: true,
      trim: true,
    },
    servicePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    serviceDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    queueDate: {
      type: String,
      required: true,
    },
    queueNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;