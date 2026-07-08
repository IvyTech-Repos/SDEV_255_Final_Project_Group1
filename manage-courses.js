document.addEventListener('DOMContentLoaded', () => {
  const courseList = document.getElementById('courseList');

  if (!courseList) {
    return;
  }

  function renderCourses() {
    const courses = getCourses();
    courseList.innerHTML = '';

    if (courses.length === 0) {
      courseList.innerHTML = '<li class="empty-state">No courses yet. Add one to get started.</li>';
      return;
    }

    const listItems = courses.map((course) => `
      <li class="course-card">
        <div>
          <strong>${course.courseName}</strong>
          <p>${course.description}</p>
          <span>${course.subjectArea} • ${course.credits} credits</span>
        </div>
        <div class="button-group">
          <a class="button secondary" href="edit-course.html?id=${course.id}">Edit</a>
          <button class="button danger" type="button" data-id="${course.id}">Delete</button>
        </div>
      </li>
    `);

    courseList.innerHTML = listItems.join('');
  }

  courseList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('button[data-id]');

    if (!deleteButton) {
      return;
    }

    const courseId = deleteButton.getAttribute('data-id');
    deleteCourse(courseId);
    renderCourses();
  });

  renderCourses();
});
