import express from "express";
import healthRouter from "./routes/health.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import "dotenv/config";
import connectDB from "./config/database.js";
import authRouter from "./routes/auth.routes.js";


const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to HireFlow API!");
});

app.use("/health", healthRouter);

app.use(errorHandler);

const startServer = async()=>{
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();