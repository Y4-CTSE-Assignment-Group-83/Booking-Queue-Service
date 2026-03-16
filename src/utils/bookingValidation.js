import { body, param } from "express-validator";

export const createBookingValidation = [
  body("customerName")
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ min: 3 })
    .withMessage("Customer name must be at least 3 characters"),

  body("customerPhone")
    .notEmpty()
    .withMessage("Customer phone is required")
    .isLength({ min: 10 })
    .withMessage("Customer phone must be at least 10 characters"),

  body("customerEmail")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Valid email is required"),

  body("serviceId")
    .notEmpty()
    .withMessage("Service ID is required")
    .isMongoId()
    .withMessage("Service ID must be a valid Mongo ID"),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Appointment date must be a valid date"),

  body("notes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Notes must not exceed 500 characters"),
];

export const updateBookingStatusValidation = [
  param("id").isMongoId().withMessage("Booking ID must be valid"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"])
    .withMessage("Invalid booking status"),
];

export const bookingIdValidation = [
  param("id").isMongoId().withMessage("Booking ID must be valid"),
];