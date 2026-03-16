import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Salon Booking & Queue API",
      version: "1.0.0",
      description:
        "Microservice responsible for managing salon bookings and queue flow in the Smart Appointment & Queue Management System",
    },
    servers: [
      {
        url: "http://localhost:5002",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};