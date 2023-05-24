const courses = require("./courses");
const mongoose = require("mongoose");
const { isValid } = mongoose.Types.ObjectId;

const addCourse = async (req, h) => {
  const course = new courses(req.payload);

  course.uploadAt = new Date().toISOString();
  course.updatedAt = course.uploadAt;

  if (!course.name) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan course. Masukkan nama course terlebih dahulu.",
    });
    response.code(400);
    return response;
  }

  if (!course.instructor) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan course. Masukkan nama instruktur terlebih dahulu.",
    });
    response.code(400);
    return response;
  }

  if (!course.duration_in_minutes) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan course. Masukkan durasi kursus terlebih dahulu.",
    });
    response.code(400);
    return response;
  }

  const savedCourse = await course.save();

  if (savedCourse.id !== undefined) {
    const response = h.response({
      status: "success",
      message: "Data kursus berhasil ditambahkan.",
      data: {
        courseId: savedCourse.id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal menambahkan data kursus.",
  });
  response.code(500);
  return response;
};

const showAllCourses = async (req, h) => {
  const course = await courses.find();

  const response = h.response({
    status: "success",
    data: course,
  });
  response.code(200);
  return response;
};

const showCourseById = async (req, h) => {
  const { id } = req.params;

  if (!isValid(id) || !(await courses.findById(id))) {
    const response = h.response({
      status: "fail",
      message: "Gagal menampilkan kursus. Id tidak ditemukan.",
    });
    response.code(404);
    return response;
  }

  const findCourse = await courses.findById(id);

  const response = h.response({
    status: "success",
    data: {
      findCourse,
    },
  });
  response.code(200);
  return response;
};

const editCourseById = async (req, h) => {
  const { id } = req.params;
  const { name, instructor, duration_in_minutes, summary, price } = req.payload;

  if (!name || !instructor || !duration_in_minutes || !summary || !price) {
    const response = h.response({
      status: "fail",
      message: "Gagal melakukan update. Masukkan data secara lengkap.",
    });
    response.code(400);
    return response;
  }

  if (!isValid(id) || !(await courses.findById(id))) {
    const response = h.response({
      status: "fail",
      message: "Gagal melakukan edit kursus. Id tidak ditemukan.",
    });
    response.code(500);
    return response;
  }

  await courses.findByIdAndUpdate(
    id,
    {
      name,
      instructor,
      duration_in_minutes,
      summary,
      price,
      updatedAt: new Date().toISOString(),
    },
    {
      new: true,
    }
  );

  const response = h.response({
    status: "success",
    message: "Kursus berhasil diupdate.",
  });
  response.code(201);
  return response;
};

const deleteCourseById = async (req, h) => {
  const { id } = req.params;

  if (!isValid(id) || !(await courses.findById(id))) {
    const response = h.response({
      status: "fail",
      message: "Gagal menghapus kursus. Id tidak ditemukan.",
    });
    response.code(500);
    return response;
  }

  await courses.findByIdAndDelete(id);

  const response = h.response({
    status: "success",
    message: "Kursus berhasil dihapus",
  });
  response.code(200);
  return response;
};

module.exports = {
  addCourse,
  showAllCourses,
  showCourseById,
  editCourseById,
  deleteCourseById,
};
