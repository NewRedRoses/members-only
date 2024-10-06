const express = require("express");
const app = express();

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
