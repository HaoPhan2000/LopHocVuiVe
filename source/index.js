require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require('express-session');
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;
const home = "/classes/home";
const db = require("./config/db/index");

//connect to db
db.connect();
// Routes
const studentsRoutes = require("./routes/studentsRoute");
const classesRoutes = require("./routes/classesRoute");
const billsRoutes = require("./routes/billsRoute");
const emailsRoutes = require("./routes/emailsRoute");
const otherRoutes = require("./routes/otherRoute");
// HTTP logger
app.use(morgan("combined"));
//static img,css
app.use(express.static(path.join(__dirname, "material/assets")));
app.use(express.static(path.join(__dirname, "material/public")));
app.use(express.urlencoded());
app.use(express.json());
// helpers
app.engine(
  "html",
  engine({
    extname: ".html",
    helpers: require("./helpers/helpers")
  })
);
// Template engine
app.set("view engine", "html");
app.set("views", path.join(__dirname, "material/views"));

app.use(session({
  secret: 'MyKey', // Thay bằng một chuỗi bí mật của bạn
  resave: false,            // Không lưu lại session nếu không thay đổi
  saveUninitialized: true,  // Lưu session mới dù chưa có dữ liệu
  cookie: { secure: false,} // Đặt thành true nếu bạn sử dụng HTTPS
}));
// Thiết lập middleware để kiểm tra intro
app.use((req, res, next) => {
  console.log("vào")
  if (!req.session.hasSeenIntro) {
    console.log("1")
      req.session.hasSeenIntro = true;
      res.redirect(`/intro?url=${encodeURIComponent(req.originalUrl)}`);
  } else {
      next();
  }
});
app.use("/classes", classesRoutes);
app.use("/students", studentsRoutes);
app.use("/bills", billsRoutes);
app.use("/emails", emailsRoutes);
app.use("/", otherRoutes);
app.use(function (req, res) {
  res.status(404).render("partials/404");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}${home}`);
});
