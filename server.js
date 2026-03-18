const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/workers", require("./routes/workerRoutes"));
app.use("/api/payout", require("./routes/payoutRoutes"));
app.use("/api/trigger", require("./routes/triggerRoutes"));
app.use("/api/fraud", require("./routes/fraudRoutes"));

app.get("/", (req, res) => {
  res.send("FIKA Backend Running ");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});