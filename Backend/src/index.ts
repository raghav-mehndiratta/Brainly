import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import contentRoutes from "./routes/contentRoutes";
import shareRoutes from "./routes/shareRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

// Global req.userId extension
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


app.use("/api/v1", userRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", shareRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
