document.addEventListener("DOMContentLoaded", () => {
  renderSidebar("leave");
  loadLeaves();
});

async function loadLeaves() {
  const response = await fetch("http://localhost:5000/api/leaves");
  const leaves = await response.json();

  const table = document.getElementById("leaveTable");
  table.innerHTML = "";

  leaves.forEach((leave) => {
    const isApproved = leave.status === "Approved";
    table.innerHTML += `
    <tr>
      <td><strong>${leave.teacherName}</strong></td>
      <td>${new Date(leave.fromDate).toLocaleDateString()}</td>
      <td>${new Date(leave.toDate).toLocaleDateString()}</td>
      <td>${leave.reason}</td>
      <td><span class="badge badge-${isApproved ? 'approved' : 'rejected'}">${leave.status}</span></td>
      <td>
        <button class="success-btn" onclick="approveLeave('${leave._id}')"><i class="fa-solid fa-check"></i></button>
        <button class="danger-btn" onclick="rejectLeave('${leave._id}')"><i class="fa-solid fa-xmark"></i></button>
      </td>
    </tr>
    `;
  });
}

async function applyLeave() {
  const teacherName = document.getElementById("teacherName").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const reason = document.getElementById("reason").value;

  await fetch("http://localhost:5000/api/leaves", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teacherName, fromDate, toDate, reason })
  });

  showToast("Leave request filed");
  loadLeaves();
}

async function approveLeave(id) {
  await fetch(`http://localhost:5000/api/leaves/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Approved" })
  });
  showToast("Leave Approved");
  loadLeaves();
}

async function rejectLeave(id) {
  await fetch(`http://localhost:5000/api/leaves/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Rejected" })
  });
  showToast("Leave Rejected", "error");
  loadLeaves();
}