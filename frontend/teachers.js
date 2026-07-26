document.addEventListener("DOMContentLoaded", () => {
  renderSidebar("teachers");
  loadTeachers();
  loadRequirements();
});

async function loadTeachers() {
  const teachers = await getTeachers();
  const table = document.getElementById("teacherTable");
  table.innerHTML = "";

  teachers.forEach((teacher) => {
    table.innerHTML += `
    <tr>
      <td><strong>${teacher.name}</strong></td>
      <td>${teacher.subject}</td>
      <td><span class="badge badge-${teacher.status === 'Available' ? 'available' : 'pending'}">${teacher.status}</span></td>
      <td>
        <button class="primary-btn" onclick="viewTeacher('${teacher._id}')"><i class="fa-solid fa-eye"></i> View</button>
        <button class="danger-btn" onclick="deleteTeacherConfirm('${teacher._id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
    `;
  });
}

async function loadRequirements() {
  const requirements = await getTeacherRequirements();
  const table = document.getElementById("requirementTable");
  table.innerHTML = "";

  requirements.forEach((item) => {
    table.innerHTML += `
    <tr>
      <td>${item.subject}</td>
      <td>${item.required}</td>
      <td>${item.available}</td>
      <td>${item.pending}</td>
    </tr>
    `;
  });

  const stats = await getDashboardStats();
  document.getElementById("requiredCount").innerText = stats.totalRequired || 0;
  document.getElementById("availableCount").innerText = stats.totalAvailable || 0;
  document.getElementById("pendingCount").innerText = stats.totalPending || 0;
}

async function addTeacher() {
  const name = document.getElementById("teacherName").value;
  const subject = document.getElementById("teacherSubject").value;
  const email = document.getElementById("teacherEmail").value;

  await fetch("http://localhost:5000/api/teachers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, subject, email })
  });

  showToast("Teacher onboarded successfully");
  loadTeachers();
  loadRequirements();
}

function deleteTeacherConfirm(id) {
  confirmAction("Remove teacher profile?", () => deleteTeacher(id));
}

async function deleteTeacher(id) {
  await fetch(`http://localhost:5000/api/teachers/${id}`, { method: "DELETE" });
  showToast("Teacher record deleted");
  loadTeachers();
  loadRequirements();
}

function viewTeacher(id) {
  localStorage.setItem("teacherId", id);
  window.location.href = "teacher-details.html";
}