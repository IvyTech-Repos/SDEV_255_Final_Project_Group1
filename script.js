let courses = [];

function getCourses() {
  return courses;
}

function addCourse(course) {
  const newCourse = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...course,
  };

  courses.push(newCourse);
  return newCourse;
}

function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId);
}

function updateCourse(updatedCourse) {
  courses = courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course));
  return updatedCourse;
}

function deleteCourse(courseId) {
  courses = courses.filter((course) => course.id !== courseId);
}
