const db = require("./utils/db");

const courseSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration_in_minutes: {
    type: Number,
    required: true,
  },
  summary: String,
  price: {
    type: Number,
    required: true,
  },
  uploadAt: String,
  updatedAt: String,
});

const courses = db.model("courses", courseSchema);

module.exports = courses;
