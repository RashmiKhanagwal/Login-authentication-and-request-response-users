const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

mongoose.connect('mongodb://localhost/employee-management-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB")).catch((err) => console.log(err));

const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);

const {adminAuth, userAuth} = require("./middlewares/auth");
app.get("/hr", adminAuth);
app.get("/employee", userAuth);

const empRoute = require("./routes/empRoute");
app.use("/emp", empRoute);

const hrRoute = require("./routes/hrRoute");
app.use("/manager", hrRoute);

app.listen("3000", () => {
  console.log("server is running on port 3000");
});
