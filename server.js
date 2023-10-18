const express = require("express");
const cors = require("cors");
const eventsRoutes = require("./routes/eventsRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8081;

app.use("/events", eventsRoutes);
app.use("/schedules", scheduleRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Listeneing");
});
