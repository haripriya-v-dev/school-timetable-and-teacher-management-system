document.addEventListener("DOMContentLoaded", () => {
  renderSidebar("subjects");
  loadSubjects();
});

async function loadSubjects() {
  const subjects = await getSubjects();
  const table = document.getElementById("subjectTable");
  table.innerHTML = "";

  subjects.forEach((subject) => {
    table.innerHTML += `
    <tr>
      <td><strong>${subject.subjectName}</strong></td>
      <td>${subject.periodsPerWeek}</td>
      <td>${subject.teacherCapacity}</td>
      <td>${subject.grades.join(", ")}</td>
      <td>
        <button class="danger-btn" onclick="deleteSubjectConfirm('${subject._id}')">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    </tr>
    `;
  });
}

async function addSubject() {
  const subjectName = document.getElementById("subjectName").value;
  const periodsPerWeek = Number(document.getElementById("periodsPerWeek").value);
  const teacherCapacity = Number(document.getElementById("teacherCapacity").value);
  const grades = document.getElementById("grades").value.split(",").map(Number);

  await fetch("http://localhost:5000/api/subjects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subjectName, periodsPerWeek, teacherCapacity, grades })
  });

  showToast("Subject added successfully");
  loadSubjects();
}

function deleteSubjectConfirm(id) {
  confirmAction("Are you sure you want to delete this subject?", () => deleteSubject(id));
}

async function deleteSubject(id) {
  await fetch(`http://localhost:5000/api/subjects/${id}`, { method: "DELETE" });
  showToast("Subject removed");
  loadSubjects();
}