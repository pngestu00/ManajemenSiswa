class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}

class Classroom {
    constructor() {
        this.students = [];
    }

    displayStudents() {
        const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
        studentTable.innerHTML = '';
        if (this.students.length === 0) {
            const row = studentTable.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 3;
            cell.innerText = 'Tidak ada siswa di kelas.';
        } else {
            this.students.forEach((student, index) => {
                const row = studentTable.insertRow();
                row.insertCell(0).innerText = student.name;
                row.insertCell(1).innerText = student.grade;
                
                const actionCell = row.insertCell(2);

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Hapus';
                deleteButton.onclick = () => removeStudent(student.name);
                deleteButton.style.padding = '5px 10px';
                deleteButton.style.border = 'none';
                deleteButton.style.backgroundColor = '#dc3545';
                deleteButton.style.color = 'white';
                deleteButton.style.borderRadius = '4px';
                deleteButton.style.cursor = 'pointer';
                actionCell.appendChild(deleteButton);

                const editButton = document.createElement('button');
                editButton.innerText = 'Edit';
                editButton.onclick = () => editStudent(student.name);
                editButton.style.padding = '5px 10px';
                editButton.style.border = 'none';
                editButton.style.backgroundColor = '#ffc107';
                editButton.style.color = 'white';
                editButton.style.borderRadius = '4px';
                editButton.style.cursor = 'pointer';
                editButton.style.marginLeft = '10px';
                actionCell.appendChild(editButton);
            });
        }
    }

    addStudent(name, grade) {
        const newStudent = new Student(name, grade);
        this.students.push(newStudent);
        this.displayStudents();
    }

    removeStudent(name) {
        const index = this.students.findIndex(student => student.name === name);
        if (index !== -1) {
            this.students.splice(index, 1);
        }
        this.displayStudents();
    }

    editStudent(name) {
        const student = this.students.find(student => student.name === name);
        if (student) {
            const newGrade = prompt(`Masukkan nilai baru untuk ${student.name}:`, student.grade);
            if (newGrade !== null) {
                student.grade = parseInt(newGrade, 10);
                this.displayStudents();
            }
        }
    }

    calculateAverageGrade() {
        const results = document.getElementById('results');
        if (this.students.length === 0) {
            results.innerHTML = 'Tidak ada siswa di kelas untuk menghitung nilai rata-rata.';
            return;
        }
        const totalGrades = this.students.reduce((sum, student) => sum + student.grade, 0);
        const average = totalGrades / this.students.length;
        results.innerHTML = `Nilai rata-rata kelas adalah ${average.toFixed(2)}.`;
    }

    displayHighestAndLowestGrades() {
        const results = document.getElementById('results');
        if (this.students.length === 0) {
            results.innerHTML = 'Tidak ada siswa di kelas untuk menentukan nilai tertinggi dan terendah.';
            return;
        }
        let highest = this.students[0];
        let lowest = this.students[0];
        this.students.forEach(student => {
            if (student.grade > highest.grade) highest = student;
            if (student.grade < lowest.grade) lowest = student;
        });
        results.innerHTML = `Nilai tertinggi: ${highest.name} dengan ${highest.grade}<br>Nilai terendah: ${lowest.name} dengan ${lowest.grade}`;
    }
}

const myClassroom = new Classroom();

function addStudent() {
    const name = document.getElementById('studentName').value;
    const grade = parseInt(document.getElementById('studentGrade').value, 10);
    if (name && !isNaN(grade)) {
        myClassroom.addStudent(name, grade);
        document.getElementById('studentName').value = '';
        document.getElementById('studentGrade').value = '';
    } else {
        alert('Harap masukkan nama dan nilai yang valid.');
    }
}

function removeStudent(name) {
    myClassroom.removeStudent(name);
}

function editStudent(name) {
    myClassroom.editStudent(name);
}

function calculateAverageGrade() {
    myClassroom.calculateAverageGrade();
}

function displayHighestAndLowestGrades() {
    myClassroom.displayHighestAndLowestGrades();
}