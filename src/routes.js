const {
  addCourse,
  showAllCourses,
  showCourseById,
  editCourseById,
  deleteCourseById,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/api/courses",
    handler: showAllCourses,
  },
  {
    method: "GET",
    path: "/api/courses/{id}",
    handler: showCourseById,
  },
  {
    method: "POST",
    path: "/api/courses",
    handler: addCourse,
  },
  {
    method: "PUT",
    path: "/api/courses/{id}",
    handler: editCourseById,
  },
  {
    method: "DELETE",
    path: "/api/courses/{id}",
    handler: deleteCourseById,
  },
];

module.exports = routes;
