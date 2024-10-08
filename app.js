const express = require("express");
const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const indexRouter = require("./routes/indexRouter");
const clubsRouter = require("./routes/clubsRouter");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");

app.use("", indexRouter);
app.use("/clubs", clubsRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.listen(PORT, () => console.log(`Launched on ${PORT}`));
