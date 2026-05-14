const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");


// const testJwtRouter = require("./controllers/test-jwt");
const authRouter = require("./controllers/auth");
const usersRouter = require("./controllers/users");
const moviesRouter = require("./controllers/movies");
const postsRouter = require("./controllers/posts");
const commentsRouter = require("./controllers/comments");
require("./db/connection");

app.use(cors({ origin: "https://cinelog81.netlify.app" }));
app.use(express.json());
app.use(logger("dev"));

// Routes go here

app.use("/auth", authRouter);
// app.use("/test-jwt", testJwtRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/", postsRouter);
app.use("/", commentsRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
