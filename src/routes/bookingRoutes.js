import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  bookingIdValidation,
  createBookingValidation,
  updateBookingStatusValidation,
} from "../utils/bookingValidation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking and queue management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               serviceId:
 *                 type: string
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
router.post("/", createBookingValidation, validateRequest, createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get("/", getAllBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking found
 *       404:
 *         description: Booking not found
 */
router.get("/:id", bookingIdValidation, validateRequest, getBookingById);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking status updated
 */
router.patch(
  "/:id/status",
  updateBookingStatusValidation,
  validateRequest,
  updateBookingStatus,
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted
 */
router.delete("/:id", bookingIdValidation, validateRequest, deleteBooking);

export default router;