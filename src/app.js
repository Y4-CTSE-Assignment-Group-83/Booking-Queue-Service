import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { swaggerDocs } from "./docs/swagger.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Booking & Queue API is running",
  });
});

// Swagger docs
swaggerDocs(app);

// Routes
app.use("/api/bookings", bookingRoutes);

// Global error handler
app.use(errorHandler);

export default app;