const BASE_URL = "http://localhost:5000/api";

// Fetch Helper Wrapper
async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    showToast(err.message || "An error occurred", "error");
    throw err;
  }
}

async function getDashboardStats() { return await apiFetch('/teachers/dashboard-stats'); }
async function getTeacherRequirements() { return await apiFetch('/teachers/requirements'); }
async function getTeachers() { return await apiFetch('/teachers'); }
async function getClasses() { return await apiFetch('/classes'); }
async function getSubjects() { return await apiFetch('/subjects'); }
async function getTimetables() { return await apiFetch('/timetables'); }

// Shared UI Toast system
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <i class="fa-solid fa-xmark" style="cursor:pointer;" onclick="this.parentElement.remove()"></i>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Confirmation Dialog Modal UI
function confirmAction(message, onConfirm) {
  let modal = document.getElementById("confirm-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "confirm-modal";
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-card">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2.5rem; color:var(--danger); margin-bottom:12px;"></i>
        <h3>Are you sure?</h3>
        <p id="modal-msg">${message}</p>
        <div class="modal-actions">
          <button class="btn" style="background:var(--border); color:var(--text-main)" id="modal-cancel">Cancel</button>
          <button class="btn danger-btn" id="modal-ok">Confirm</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    document.getElementById("modal-msg").innerText = message;
  }

  modal.classList.add("active");

  const cancelBtn = document.getElementById("modal-cancel");
  const okBtn = document.getElementById("modal-ok");

  const close = () => modal.classList.remove("active");

  cancelBtn.onclick = close;
  okBtn.onclick = () => {
    close();
    onConfirm();
  };
}

// Universal Navigation Builder
function renderSidebar(activePage) {
  const sidebar = document.createElement("div");
  sidebar.className = "sidebar";
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h2><i class="fa-solid fa-graduation-cap"></i> <span>EduScheduler</span></h2>
    </div>
    <ul>
      <li><a href="index.html" class="${activePage === 'dashboard' ? 'active' : ''}"><i class="fa-solid fa-chart-pie"></i> <span>Dashboard</span></a></li>
      <li><a href="classes.html" class="${activePage === 'classes' ? 'active' : ''}"><i class="fa-solid fa-door-open"></i> <span>Classes</span></a></li>
      <li><a href="subjects.html" class="${activePage === 'subjects' ? 'active' : ''}"><i class="fa-solid fa-book-open"></i> <span>Subjects</span></a></li>
      <li><a href="teacher.html" class="${activePage === 'teachers' ? 'active' : ''}"><i class="fa-solid fa-chalkboard-user"></i> <span>Teachers</span></a></li>
      <li><a href="timetable.html" class="${activePage === 'timetable' ? 'active' : ''}"><i class="fa-solid fa-calendar-days"></i> <span>Timetable</span></a></li>
      <li><a href="leave.html" class="${activePage === 'leave' ? 'active' : ''}"><i class="fa-solid fa-user-clock"></i> <span>Leave</span></a></li>
    </ul>
  `;
  document.body.prepend(sidebar);
}