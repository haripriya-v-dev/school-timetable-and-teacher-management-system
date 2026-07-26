document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("dashboard");

  try {
    const stats = await getDashboardStats();
    document.getElementById("requiredTeachers").innerText = stats.totalRequired || 0;
    document.getElementById("availableTeachers").innerText = stats.totalAvailable || 0;
    document.getElementById("pendingTeachers").innerText = stats.totalPending || 0;

    const timetables = await getTimetables();
    document.getElementById("generatedTimetables").innerText = timetables.length || 0;

    const requirements = await getTeacherRequirements();
    const table = document.getElementById("requirementTable");
    table.innerHTML = "";

    requirements.forEach((item) => {
      table.innerHTML += `
        <tr>
          <td><strong>${item.subject}</strong></td>
          <td>${item.required}</td>
          <td><span class="badge badge-available">${item.available}</span></td>
          <td><span class="badge badge-pending">${item.pending}</span></td>
        </tr>
      `;
    });
  } catch (error) {
    console.error(error);
  }
});