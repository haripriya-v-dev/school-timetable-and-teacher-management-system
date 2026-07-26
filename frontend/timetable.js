document.addEventListener("DOMContentLoaded", () => {
  renderSidebar("timetable");
  loadTimetables();
});

async function loadTimetables() {
  const timetables = await getTimetables();

  timetables.sort((a, b) => {
    const [gradeA, sectionA] = a.className.split("-");
    const [gradeB, sectionB] = b.className.split("-");
    if (Number(gradeA) !== Number(gradeB)) return Number(gradeA) - Number(gradeB);
    return sectionA.localeCompare(sectionB);
  });

  const table = document.getElementById("timetableTable");
  table.innerHTML = "";

  timetables.forEach((tt) => {
    table.innerHTML += `
    <tr>
      <td><strong>Class ${tt.className}</strong></td>
      <td>
        <button class="primary-btn" onclick="viewTimetable('${tt.className}')"><i class="fa-solid fa-table"></i> Grid View</button>
        <button class="danger-btn" onclick="deleteTimetableConfirm('${tt._id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
    `;
  });
}

async function generateTimetable() {
  const response = await fetch("http://localhost:5000/api/timetables/generate", { method: "POST" });
  const data = await response.json();
  showToast(data.message || "Timetable regenerated");
  loadTimetables();
}

async function viewTimetable(className) {
  const response = await fetch(`http://localhost:5000/api/timetables/${className}`);
  const timetable = await response.json();

  document.getElementById("timetableContainer").style.display = "block";
  document.getElementById("classTitle").innerText = `Class Schedule: ${className}`;

  const firstDay = Object.keys(timetable.schedule)[0];
  const periods = timetable.schedule[firstDay].length;

  let html = `<div class="timetable-grid-container"><table class="timetable-grid"><thead><tr><th>Day</th>`;
  for (let i = 1; i <= periods; i++) html += `<th>P${i}</th>`;
  html += `</tr></thead><tbody>`;

  for (const day in timetable.schedule) {
    html += `<tr><td><strong>${day}</strong></td>`;
    timetable.schedule[day].forEach(period => {
      let content = typeof period === "string" ? period : `
        <div class="timetable-cell-card">
          ${period.subject}
          <small>${period.teacher}</small>
        </div>`;
      html += `<td>${content}</td>`;
    });
    html += `</tr>`;
  }
  html += `</tbody></table></div>`;

  document.getElementById("timetableView").innerHTML = html;
}

function deleteTimetableConfirm(id) {
  confirmAction("Delete generated schedule?", () => deleteTimetable(id));
}

async function deleteTimetable(id) {
  await fetch(`http://localhost:5000/api/timetables/${id}`, { method: "DELETE" });
  showToast("Timetable record removed");
  loadTimetables();
}