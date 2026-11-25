import express from "express";
import healthRouter from "./routes/health.routes.js";
import errorHandler from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());

const PORT = 5001;

app.get("/", (req, res) => {
  res.send("Welcome to HireFlow API!");
});

app.use("/health", healthRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});