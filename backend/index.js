import express from "express";
import cors from "cors";
import { PORT, db } from "./config.js";
import bookRoutes from "./routes/booksRoute.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Middleware to log incoming requests
app.get("/", (req, res) => {
  console.log(req.method, req.url);
  return res.status(200).send("welcome to mern stack tutorial");
});

app.use("/api/books", bookRoutes);

db.connect()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
