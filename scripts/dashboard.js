// Utilitaires pour LocalStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Initialisation des données
let students = loadFromLocalStorage("students");
let sessions = loadFromLocalStorage("sessions");
let feedbacks = loadFromLocalStorage("feedbacks");

// Gestion des étudiants
function renderStudents() {
    const studentsList = document.querySelector("#students-list");
    studentsList.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.sessions}</td>
            <td>
                <i class="fas fa-edit" title="Modifier" onclick="editStudent(${index})"></i>
                <i class="fas fa-trash" title="Supprimer" onclick="deleteStudent(${index})"></i>
            </td>
        `;
        studentsList.appendChild(row);
    });
}

function openStudentsModal() {
    document.querySelector("#student-modal").style.display = "flex";
}

function closeStudentsModal() {
    document.querySelector("#student-modal").style.display = "none";
}

function addStudent(event) {
    event.preventDefault();
    const name = document.querySelector("#student-name").value;
    const email = document.querySelector("#student-email").value;
    const sessions = parseInt(document.querySelector("#session-realiser").value, 10);
    students.push({ name, email, sessions });
    saveToLocalStorage("students", students);
    renderStudents();
    document.querySelector("#student-form").reset();
    closeStudentsModal();
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveToLocalStorage("students", students);
    renderStudents();
}

function editStudent(index) {
    const student = students[index];
    const newName = prompt("Nom :", student.name) || student.name;
    const newEmail = prompt("Email :", student.email) || student.email;
    students[index] = { ...student, name: newName, email: newEmail };
    saveToLocalStorage("students", students);
    renderStudents();
}

// Gestion des sessions
function renderSessions() {
    const sessionsList = document.querySelector("#sessions-list");
    sessionsList.innerHTML = "";
    sessions.forEach((session, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${session.student}</td>
            <td>${session.date}</td>
            <td>${session.time}</td>
            <td>
                <i class="fas fa-edit" title="Modifier" onclick="editSession(${index})"></i>
                <i class="fas fa-trash" title="Supprimer" onclick="deleteSession(${index})"></i>
            </td>
        `;
        sessionsList.appendChild(row);
    });
}

function openSessionModal() {
    document.querySelector("#session-modal").style.display = "flex";
}

function closeSessionModal() {
    document.querySelector("#session-modal").style.display = "none";
}

function addSession(event) {
    event.preventDefault();
    const student = document.querySelector("#session-student").value;
    const date = document.querySelector("#session-date").value;
    const time = document.querySelector("#session-heure").value;
    sessions.push({ student, date, time });
    saveToLocalStorage("sessions", sessions);
    renderSessions();
    document.querySelector("#session-form").reset();
    closeSessionModal();
}

function deleteSession(index) {
    sessions.splice(index, 1);
    saveToLocalStorage("sessions", sessions);
    renderSessions();
}

function editSession(index) {
    const session = sessions[index];
    const newStudent = prompt("Étudiant :", session.student) || session.student;
    const newDate = prompt("Date :", session.date) || session.date;
    const newTime = prompt("Heure :", session.time) || session.time;
    sessions[index] = { ...session, student: newStudent, date: newDate, time: newTime };
    saveToLocalStorage("sessions", sessions);
    renderSessions();
}

// Gestion des feedbacks
function renderFeedbacks() {
    const feedbacksList = document.querySelector("#feedbacks-list");
    feedbacksList.innerHTML = "";
    feedbacks.forEach(feedback => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${feedback.student}</td>
            <td>${feedback.comment}</td>
        `;
        feedbacksList.appendChild(row);
    });
}

// Exportation en CSV
function exportToCSV(data, filename) {
    if (data.length === 0) {
        alert("Aucune donnée à exporter.");
        return;
    }

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    data.forEach(row => {
        csvRows.push(headers.map(header => JSON.stringify(row[header] || "")).join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.querySelector("#export-students")?.addEventListener("click", () => {
    exportToCSV(students, "students.csv");
});

document.querySelector("#export-sessions")?.addEventListener("click", () => {
    exportToCSV(sessions, "sessions.csv");
});

// Déconnexion
document.querySelector("#deconnecter").addEventListener("click", () => {
    window.location.href = "index.html";
});

// Gestion des événements pour les modales
document.querySelector("#add-student").addEventListener("click", openStudentsModal);
document.querySelector("#close-student-modal").addEventListener("click", closeStudentsModal);
document.querySelector("#student-form").addEventListener("submit", addStudent);

document.querySelector("#add-session").addEventListener("click", openSessionModal);
document.querySelector("#close-session-modal").addEventListener("click", closeSessionModal);
document.querySelector("#session-form").addEventListener("submit", addSession);

// Rendu initial
renderStudents();
renderSessions();
renderFeedbacks();
