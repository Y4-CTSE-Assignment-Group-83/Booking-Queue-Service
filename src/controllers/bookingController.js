import Booking from "../models/bookingModel.js";
import { generateQueueNumber } from "../utils/queueGenerator.js";

/*
-----------------------------------------
Create new booking
POST /api/bookings
-----------------------------------------
*/
export const createBooking = async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      serviceName,
      serviceCategory,
      servicePrice,
      serviceDuration,
      appointmentDate,
      notes,
    } = req.body;

    // 🔥 TIME VALIDATION
    const bookingTime = new Date(appointmentDate);
    const hours = bookingTime.getHours();

    if (hours < 9 || hours >= 20) {
      const error = new Error(
        "Bookings allowed only between 9:00 AM and 8:00 PM"
      );
      error.statusCode = 400;
      throw error;
    }

    const { queueDate, queueNumber } =
      await generateQueueNumber(appointmentDate);

    const booking = await Booking.create({
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      serviceName,
      serviceCategory,
      servicePrice,
      serviceDuration,
      appointmentDate,
      queueDate,
      queueNumber,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });

  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Get all bookings
GET /api/bookings
-----------------------------------------
*/
export const getAllBookings = async (req, res, next) => {
  try {
    const { date, status } = req.query;
    const filter = {};

    if (date) filter.queueDate = date;
    if (status) filter.status = status;

    const bookings = await Booking.find(filter).sort({
      appointmentDate: 1,
      queueNumber: 1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Get single booking by ID
GET /api/bookings/:id
-----------------------------------------
*/
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Update booking status
PATCH /api/bookings/:id/status
-----------------------------------------
*/
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Delete booking
DELETE /api/bookings/:id
-----------------------------------------
*/
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


/*
-----------------------------------------
Update booking date
PATCH /api/bookings/:id/update
-----------------------------------------
*/
export const updateBookingDate = async (req, res, next) => {
  try {
    const { appointmentDate } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 🔥 Only allow update if PENDING
    if (booking.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be updated",
      });
    }

    // 🔥 TIME VALIDATION AGAIN
    const bookingTime = new Date(appointmentDate);
    const hours = bookingTime.getHours();

    if (hours < 9 || hours >= 20) {
      return res.status(400).json({
        success: false,
        message: "Booking allowed only between 9AM - 8PM",
      });
    }

    booking.appointmentDate = appointmentDate;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });

  } catch (error) {
    next(error);
  }
};