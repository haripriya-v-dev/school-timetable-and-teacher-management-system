document.addEventListener("DOMContentLoaded", () => {
  renderSidebar("classes");
  loadClasses();
});

async function loadClasses() {
  const classes = await getClasses();
  const table = document.getElementById("classTable");
  table.innerHTML = "";

  classes.forEach((cls) => {
    table.innerHTML += `
    <tr>
      <td><strong>Grade ${cls.grade}</strong></td>
      <td>${cls.sections} Sections</td>
      <td>${cls.periodsPerDay} Periods</td>
      <td>
        <button class="danger-btn" onclick="deleteClassConfirm('${cls._id}')">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    </tr>
    `;
  });
}

async function addClass() {
  const grade = Number(document.getElementById("grade").value);
  const sections = Number(document.getElementById("sections").value);

  if (!grade || !sections) {
    showToast("Please enter valid Grade and Section entries.", "error");
    return;
  }

  let periodsPerDay = 9;
  if (grade >= 1 && grade <= 5) periodsPerDay = 7;
  else if (grade >= 6 && grade <= 8) periodsPerDay = 8;

  await fetch("http://localhost:5000/api/classes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ grade, sections, periodsPerDay })
  });

  showToast("Class created successfully!");
  loadClasses();
}

function deleteClassConfirm(id) {
  confirmAction("Are you sure you want to remove this grade configuration?", () => deleteClass(id));
}

async function deleteClass(id) {
  await fetch(`http://localhost:5000/api/classes/${id}`, { method: "DELETE" });
  showToast("Class deleted successfully!");
  loadClasses();
}