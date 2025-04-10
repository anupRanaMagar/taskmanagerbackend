import express from "express";
import cookieParser from "cookie-parser";
import { PORT, ROOT_ORIGIN } from "./config.js";
import authRouter from "./routes/authRoute.js";
import taskRouter from "./routes/taskRoute.js";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ROOT_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.router.use("/auth", authRouter);
app.router.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
