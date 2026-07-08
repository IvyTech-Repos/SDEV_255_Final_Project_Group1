document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('courseForm');

  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const courseName = document.getElementById('courseName').value.trim();
    const description = document.getElementById('description').value.trim();
    const subjectArea = document.getElementById('subjectArea').value.trim();
    const credits = parseInt(document.getElementById('credits').value, 10);

    if (!courseName || !description || !subjectArea || Number.isNaN(credits) || credits <= 0) {
      alert('Please complete every field with valid values.');
      return;
    }

    addCourse({
      courseName,
      description,
      subjectArea,
      credits,
    });

    form.reset();
    window.location.href = 'manage-courses.html';
  });
});
