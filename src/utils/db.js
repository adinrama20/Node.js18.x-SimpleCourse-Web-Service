const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rama:V6xFVIaBcUFIogvR@dbdeployments.bgpd7js.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Success connect to MongoDB"))
  .catch((err) => console.error("Failed connect to MongoDB", err));

module.exports = mongoose;
