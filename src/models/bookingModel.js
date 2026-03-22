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
      type: String,
      required: [true, "Service ID is required"],
    },

    serviceName: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },

    serviceCategory: {
      type: String,
      required: [true, "Service category is required"],
      trim: true,
    },

    servicePrice: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price cannot be negative"],
    },

    serviceDuration: {
      type: Number,
      required: [true, "Service duration is required"],
      min: [1, "Duration must be at least 1 minute"],
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
      enum: ["PENDING", "CONfirmed", "INPROGRESS", "COMPLETED", "CANCELED"],
      default: "PENDING",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;