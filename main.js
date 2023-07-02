const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const { jwtverify } = require("./auth");
app.use(cors(
    {
        origin:"http://localhost:4000",
        methods:["GET","POST"]
    }
));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/dashboard",jwtverify, (req, res) => {
  res.render("dashboard");
});
app.post("/auth/singin", (req, res) => {
  console.log(req.body);
  if (!req.body?.email||!req.body?.password) return res.status(401);
  const { email, password } = req.body;
  const token = jwt.sign({ email }, "ahmed", { expiresIn: 10 });
  res.cookie("jwt", token, { httpOnly: true, maxAge: 10000 });
  res.json({ res: true });
});
app.post("/auth/logout", (req, res) => {
    res.clearCookie("jwt").render("index")
  });
app.listen(4000, () => {
  console.log("http://localhost:4000");
});
