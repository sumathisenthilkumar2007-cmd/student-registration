const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const count = document.getElementById("studentCount");

let students = JSON.parse(localStorage.getItem("students")) || [];

function displayStudents() {
    table.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const values = [
            student.name,
            student.regNo,
            student.email,
            student.phone,
            student.gender,
            student.department,
            student.year
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteStudent(index);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        table.appendChild(row);
    });

    count.textContent = "Total: " + students.length;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        regNo: document.getElementById("regNo").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        department: document.getElementById("department").value,
        year: document.getElementById("year").value,
        address: document.getElementById("address").value.trim()
    };

    if (students.some(s => s.regNo.toLowerCase() === student.regNo.toLowerCase())) {
        alert("Register number already exists!");
        return;
    }

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    alert("Student registered successfully!");

    form.reset();
});

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();
    }
}

displayStudents();