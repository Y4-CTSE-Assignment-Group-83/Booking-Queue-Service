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

app.use(
  cors({
    origin: "*", // allow gateway + frontend
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Booking & Queue API is running",
  });
});

// ✅ Health check (VERY IMPORTANT for API Gateway / Docker / Cloud)
app.get("/health", (req, res) => {
  res.status(200).json({
    service: "Booking & Queue Service",
    status: "Healthy",
  });
});

// Swagger only in development
if (process.env.NODE_ENV !== "production") {
  swaggerDocs(app);
}

// Routes
app.use("/api/bookings", bookingRoutes);

// Global error handler
app.use(errorHandler);

export default app;