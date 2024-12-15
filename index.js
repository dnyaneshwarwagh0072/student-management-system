let students = [];

fetch('students.json')
    .then(response => response.json())
    .then(data => {
        students = data;
        displayTable(students);
    })
    .catch(error => console.error('Error loading data:', error));

function displayTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    data.forEach(student => {
        const row = `
      <tr>
        <td>${student.id}</td>
        <td>
          ${student.first_name} ${student.last_name}
        </td>
        <td>${student.email}</td>
        <td>${student.gender}</td>
        <td>${student.class}</td>
        <td>${student.marks}</td>
        <td>${student.passing ? 'Passing' : 'Failed'}</td>
      </tr>
    `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.first_name.toLowerCase().includes(query) ||
        student.last_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    displayTable(filteredStudents);
});

document.getElementById('sortAZ').addEventListener('click', () => {
    students.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
    displayTable(students);
});

document.getElementById('sortZA').addEventListener('click', () => {
    students.sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
    displayTable(students);
});

document.getElementById('sortByMarks').addEventListener('click', () => {
    students.sort((a, b) => a.marks - b.marks);
    displayTable(students);
});

document.getElementById('sortByPassing').addEventListener('click', () => {
    const passingStudents = students.filter(student => student.passing);
    displayTable(passingStudents);
});

document.getElementById('sortByClass').addEventListener('click', () => {
    students.sort((a, b) => a.class - b.class);
    displayTable(students);
});

document.getElementById('sortByGender').addEventListener('click', () => {
    const maleStudents = students.filter(student => student.gender === 'Male');
    const femaleStudents = students.filter(student => student.gender === 'Female');
    displayTable(femaleStudents);
    const tableBody = document.getElementById('tableBody');
    tableBody.insertAdjacentHTML('beforeend', '<tr><td colspan="7"><strong>Male Students</strong></td></tr>');
    displayTable(maleStudents);
});
