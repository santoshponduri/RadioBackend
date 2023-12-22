const express = require("express");
const cors = require("cors");
const eventsRoutes = require("./routes/eventsRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const errorHandler = require("./middleware/errorHandler");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "150mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "150mb",
    parameterLimit: 1000000,
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8081;

app.use("/api/events", eventsRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/banners", bannerRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Listeneing");
});
