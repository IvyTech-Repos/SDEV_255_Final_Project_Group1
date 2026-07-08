document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('editCourseForm');
  const courseIdInput = document.getElementById('courseId');
  const courseNameInput = document.getElementById('courseName');
  const descriptionInput = document.getElementById('description');
  const subjectAreaInput = document.getElementById('subjectArea');
  const creditsInput = document.getElementById('credits');

  if (!form) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('id');
  const course = getCourseById(courseId);

  if (!course) {
    window.location.href = 'manage-courses.html';
    return;
  }

  courseIdInput.value = course.id;
  courseNameInput.value = course.courseName;
  descriptionInput.value = course.description;
  subjectAreaInput.value = course.subjectArea;
  creditsInput.value = course.credits;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const updatedCourse = {
      ...course,
      courseName: courseNameInput.value.trim(),
      description: descriptionInput.value.trim(),
      subjectArea: subjectAreaInput.value.trim(),
      credits: parseInt(creditsInput.value, 10),
    };

    if (!updatedCourse.courseName || !updatedCourse.description || !updatedCourse.subjectArea || Number.isNaN(updatedCourse.credits) || updatedCourse.credits <= 0) {
      alert('Please complete every field with valid values.');
      return;
    }

    updateCourse(updatedCourse);
    window.location.href = 'manage-courses.html';
  });
});
