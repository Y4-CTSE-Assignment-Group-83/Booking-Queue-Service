import { body, param } from "express-validator";

export const createBookingValidation = [
  body("customerName")
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ min: 3 }),

  body("customerPhone")
    .notEmpty()
    .withMessage("Customer phone is required")
    .isLength({ min: 10 }),

  body("customerEmail")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Valid email is required"),

  body("serviceId")
    .notEmpty()
    .withMessage("Service ID is required"),

  body("serviceName")
    .notEmpty()
    .withMessage("Service name is required"),

  body("serviceCategory")
    .notEmpty()
    .withMessage("Service category is required"),

  body("servicePrice")
    .notEmpty()
    .withMessage("Service price is required")
    .isNumeric(),

  body("serviceDuration")
    .notEmpty()
    .withMessage("Service duration is required")
    .isNumeric(),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601(),

  body("notes")
    .optional()
    .isLength({ max: 500 }),
];

export const updateBookingStatusValidation = [
  param("id").isMongoId(),

  body("status")
    .notEmpty()
    .isIn(["PENDING", "CONFIRMED", "INPROGRESS", "COMPLETED", "CANCELED"]),
];

export const bookingIdValidation = [
  param("id").isMongoId(),
];