const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

const indexRouter = require("./routes/indexRouter");
const clubsRouter = require("./routes/clubsRouter");
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");
const signupRouter = require("./routes/signupRouter");

app.use("", indexRouter);
app.use("/clubs", clubsRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

app.listen(PORT, () => console.log(`Launched on ${PORT}`));
