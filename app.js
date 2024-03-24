require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// security packages
const helemt = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("rate-limiter");

// invoke packages
app.use(express.json());
app.use(helemt());
app.use(cors());
app.use(xss());

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

app.get("/", (req, res) => {
  res.send("jobs api");
});

// routes
app.use("jobs-api-project-9ehk.onrender.com/api/v1/auth", authRouter);
app.use(
  "jobs-api-project-9ehk.onrender.com/api/v1/jobs",
  authenticateUser,
  jobsRouter
);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
