import Booking from "../models/bookingModel.js";
import { getServiceByIdFromCatalog } from "../services/serviceCatalogClient.js";
import { generateQueueNumber, getDateKey } from "../utils/queueGenerator.js";

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
      appointmentDate,
      notes,
    } = req.body;

    const service = await getServiceByIdFromCatalog(serviceId);

    if (!service.isAvailable) {
      const error = new Error("Selected service is currently unavailable");
      error.statusCode = 400;
      throw error;
    }

    const { queueDate, queueNumber } = await generateQueueNumber(appointmentDate);

    const booking = await Booking.create({
      customerName,
      customerPhone,
      customerEmail,
      serviceId: service._id,
      serviceName: service.name,
      serviceCategory: service.category,
      servicePrice: service.price,
      serviceDuration: service.duration,
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
Optional query: ?date=YYYY-MM-DD&status=Pending
-----------------------------------------
*/
export const getAllBookings = async (req, res, next) => {
  try {
    const { date, status } = req.query;
    const filter = {};

    if (date) {
      filter.queueDate = date;
    }

    if (status) {
      filter.status = status;
    }

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