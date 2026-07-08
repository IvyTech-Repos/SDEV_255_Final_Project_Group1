let courses = [];

const courseNameInput = document.getElementById('courseName');
const descriptionInput = document.getElementById('description');
const subjectAreaInput = document.getElementById('subjectArea');
const creditsInput = document.getElementById('credits');
const addCourseButton = document.getElementById('addCourseButton');
const courseList = document.getElementById('courseList');

addCourseButton.addEventListener('click', () => {
  const courseName = courseNameInput.value.trim();
  const description = descriptionInput.value.trim();
  const subjectArea = subjectAreaInput.value.trim();
  const credits = parseInt(creditsInput.value, 10) || 0;

  if (!courseName || !description || !subjectArea || credits <= 0) {
    alert('Please complete all course fields with valid values.');
    return;
  }

  const course = {
    courseName,
    description,
    subjectArea,
    credits,
  };

  courses.push(course);
  displayCourses();
  clearForm();
});

function displayCourses() {
  courseList.innerHTML = '';

  courses.forEach((course, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${course.courseName}</strong> - ${course.subjectArea} (${course.credits} credits)
      <p>${course.description}</p>
    `;
    courseList.appendChild(listItem);
  });
}

function clearForm() {
  courseNameInput.value = '';
  descriptionInput.value = '';
  subjectAreaInput.value = '';
  creditsInput.value = '';
}
