/* ==========================================================================
   TASKPULSE ENTERPRISE PRO v2.0 - JAVASCRIPT APPLICATION CORE
   ========================================================================== */

(function () {
  'use strict';

  // --- LOCAL STORAGE KEYS ---
  const STORAGE_KEYS = {
    USERS: 'taskpulse_users_v2',
    TASKS: 'taskpulse_tasks_v2',
    ACTIVITIES: 'taskpulse_activities_v2',
    CURRENT_USER: 'taskpulse_session_v2',
    THEME: 'taskpulse_theme_v2'
  };

  // --- INITIAL SEED DATA ---
  const INITIAL_USERS = [
    {
      id: 'usr_admin',
      name: 'Aizaz Nisar',
      email: 'admin@softwarehouse.com',
      password: 'admin123',
      role: 'ADMIN',
      title: 'Engineering Director',
      department: 'Management',
      avatar: 'AN'
    },
    {
      id: 'usr_emp1',
      name: 'Alex Johnson',
      email: 'alex@softwarehouse.com',
      password: 'employee123',
      role: 'EMPLOYEE',
      title: 'Senior Frontend Dev',
      department: 'Engineering',
      avatar: 'AJ'
    },
    {
      id: 'usr_emp2',
      name: 'Maria Garcia',
      email: 'maria@softwarehouse.com',
      password: 'employee123',
      role: 'EMPLOYEE',
      title: 'Backend Lead Developer',
      department: 'Engineering',
      avatar: 'MG'
    },
    {
      id: 'usr_emp3',
      name: 'David Miller',
      email: 'david@softwarehouse.com',
      password: 'employee123',
      role: 'EMPLOYEE',
      title: 'Senior UI/UX Designer',
      department: 'Design',
      avatar: 'DM'
    },
    {
      id: 'usr_emp4',
      name: 'Samira Ahmed',
      email: 'samira@softwarehouse.com',
      password: 'employee123',
      role: 'EMPLOYEE',
      title: 'Lead QA Engineer',
      department: 'Quality Assurance',
      avatar: 'SA'
    }
  ];

  const INITIAL_TASKS = [
    {
      id: 'tsk_1',
      title: 'Design Figma Components for Workspace Design System',
      description: 'Create scalable UI component library, color tokens, and accessibility standards for dark/light themes.',
      assignedTo: 'usr_emp3', // David Miller
      category: 'UI/UX Design',
      priority: 'High',
      storyPoints: 5,
      status: 'COMPLETED',
      dueDate: '2026-08-15',
      createdAt: '2026-08-01',
      comments: [
        { author: 'Aizaz Nisar', text: 'Figma tokens look great! Approved for dev implementation.', time: 'Aug 03, 10:30 AM' }
      ]
    },
    {
      id: 'tsk_2',
      title: 'Build RESTful API Endpoints for JWT Auth & RBAC',
      description: 'Develop secure Node.js authentication endpoints with role-based middleware for Admin and Employee permissions.',
      assignedTo: 'usr_emp2', // Maria Garcia
      category: 'Backend',
      priority: 'Urgent',
      storyPoints: 8,
      status: 'IN_PROGRESS',
      dueDate: '2026-08-10', // Overdue relative to current date 2026-08-11!
      createdAt: '2026-08-05',
      comments: [
        { author: 'Maria Garcia', text: 'JWT middleware unit tests completed. Integrating route guards.', time: 'Aug 09, 04:15 PM' }
      ]
    },
    {
      id: 'tsk_3',
      title: 'Refactor React State Management & Custom Hooks',
      description: 'Optimize rendering cycles for task lists and integrate local cache persistence.',
      assignedTo: 'usr_emp1', // Alex Johnson
      category: 'Frontend',
      priority: 'Medium',
      storyPoints: 3,
      status: 'IN_PROGRESS',
      dueDate: '2026-08-18',
      createdAt: '2026-08-07',
      comments: []
    },
    {
      id: 'tsk_4',
      title: 'Automate Cypress E2E Integration Suite',
      description: 'Write end-to-end test cases covering login, task creation, status updates, and employee removal.',
      assignedTo: 'usr_emp4', // Samira Ahmed
      category: 'QA Testing',
      priority: 'Medium',
      storyPoints: 3,
      status: 'TODO',
      dueDate: '2026-08-20',
      createdAt: '2026-08-08',
      comments: []
    },
    {
      id: 'tsk_5',
      title: 'Implement Responsive Drag & Drop Dashboard Widgets',
      description: 'Enable flexible widget rearrangement on mobile and desktop views using touch events.',
      assignedTo: 'usr_emp1', // Alex Johnson
      category: 'Frontend',
      priority: 'Urgent',
      storyPoints: 5,
      status: 'TODO',
      dueDate: '2026-08-16',
      createdAt: '2026-08-10',
      comments: []
    }
  ];

  const INITIAL_ACTIVITIES = [
    { text: 'Sprint initialized with 5 master tasks', time: 'Aug 10, 09:00 AM' },
    { text: 'Maria Garcia moved "RESTful API Endpoints" to In Progress', time: 'Aug 10, 11:30 AM' },
    { text: 'David Miller marked "Figma Design System" as Completed', time: 'Aug 11, 02:15 PM' }
  ];

  // --- APP STATE ---
  let users = [];
  let tasks = [];
  let activities = [];
  let currentUser = null;
  let adminActiveSubTab = 'TASKS'; // 'TASKS' or 'EMPLOYEES'
  let currentTaskViewMode = 'MATRIX'; // 'MATRIX' or 'KANBAN'

  // --- INITIALIZATION ---
  function initApp() {
    loadTheme();
    loadData();
    bindEvents();
    checkExistingSession();
  }

  // --- DATA STORAGE HELPERS ---
  function loadData() {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    const storedActs = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);

    if (storedUsers) {
      users = JSON.parse(storedUsers);
      // Migrate admin name if previously Zain Malik
      const adminUser = users.find(u => u.role === 'ADMIN');
      if (adminUser) {
        adminUser.name = 'Aizaz Nisar';
        adminUser.avatar = 'AN';
        saveUsers();
      }
    } else {
      users = [...INITIAL_USERS];
      saveUsers();
    }

    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    } else {
      tasks = [...INITIAL_TASKS];
      saveTasks();
    }

    if (storedActs) {
      activities = JSON.parse(storedActs);
    } else {
      activities = [...INITIAL_ACTIVITIES];
      saveActivities();
    }
  }

  function saveUsers() { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); }
  function saveTasks() { localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks)); }
  function saveActivities() { localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities)); }

  function logActivity(text) {
    const now = new Date();
    const timeStr = `${now.toLocaleString('en-US', { month: 'short', day: '2-digit' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    activities.unshift({ text: text, time: timeStr });
    if (activities.length > 30) activities.pop(); // keep last 30
    saveActivities();
    renderActivityFeed();
  }

  function checkExistingSession() {
    const session = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (session) {
      currentUser = JSON.parse(session);
      if (currentUser.role === 'ADMIN') {
        currentUser.name = 'Aizaz Nisar';
        currentUser.avatar = 'AN';
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      }
      showWorkspace();
    } else {
      showAuthScreen();
    }
  }

  // --- THEME SYSTEM ---
  function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconSvg = type === 'success' 
      ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
      : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;

    toast.innerHTML = `${iconSvg} <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- AUTHENTICATION FLOW ---
  function handleLogin(email, password) {
    const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    
    if (!foundUser) {
      showToast('User account not found with this email address.', 'error');
      return;
    }

    if (foundUser.password !== password) {
      showToast('Incorrect password. Please try again.', 'error');
      return;
    }

    currentUser = foundUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    showToast(`Welcome back, ${currentUser.name}!`);
    showWorkspace();
  }

  function handleLogout() {
    currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showAuthScreen();
    showToast('Signed out successfully.');
  }

  function showAuthScreen() {
    document.getElementById('authView').style.display = 'flex';
    document.getElementById('appView').style.display = 'none';
  }

  function showWorkspace() {
    document.getElementById('authView').style.display = 'none';
    document.getElementById('appView').style.display = 'flex';

    // Set User Profile UI
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = currentUser.avatar || currentUser.name.substring(0, 2).toUpperCase();
    document.getElementById('userRoleTag').textContent = currentUser.role === 'ADMIN' ? 'Admin / Manager' : currentUser.title;

    renderHeaderNavigation();
    
    if (currentUser.role === 'ADMIN') {
      document.getElementById('adminView').style.display = 'block';
      document.getElementById('employeeView').style.display = 'none';
      renderAdminDashboard();
    } else {
      document.getElementById('adminView').style.display = 'none';
      document.getElementById('employeeView').style.display = 'block';
      renderEmployeePortal();
    }
  }

  // --- HEADER NAVIGATION RENDER ---
  function renderHeaderNavigation() {
    const navContainer = document.getElementById('headerNav');
    navContainer.innerHTML = '';

    if (currentUser.role === 'ADMIN') {
      const taskTab = document.createElement('button');
      taskTab.className = `nav-tab ${adminActiveSubTab === 'TASKS' ? 'active' : ''}`;
      taskTab.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> Task Matrix`;
      taskTab.onclick = () => {
        adminActiveSubTab = 'TASKS';
        renderHeaderNavigation();
        document.getElementById('adminTaskSection').style.display = 'block';
        document.getElementById('adminEmployeeSection').style.display = 'none';
      };

      const empTab = document.createElement('button');
      empTab.className = `nav-tab ${adminActiveSubTab === 'EMPLOYEES' ? 'active' : ''}`;
      empTab.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Team Roster`;
      empTab.onclick = () => {
        adminActiveSubTab = 'EMPLOYEES';
        renderHeaderNavigation();
        document.getElementById('adminTaskSection').style.display = 'none';
        document.getElementById('adminEmployeeSection').style.display = 'block';
        renderAdminEmployees();
      };

      navContainer.appendChild(taskTab);
      navContainer.appendChild(empTab);
    } else {
      const myTaskTab = document.createElement('button');
      myTaskTab.className = 'nav-tab active';
      myTaskTab.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> My Assigned Tasks`;
      navContainer.appendChild(myTaskTab);
    }
  }

  // --- ADMIN DASHBOARD RENDER ---
  function renderAdminDashboard() {
    renderAdminMetrics();
    renderWorkloadDistribution();
    renderActivityFeed();
    populateEmployeeFilterDropdown();

    if (currentTaskViewMode === 'MATRIX') {
      document.getElementById('adminTasksGrid').style.display = 'grid';
      document.getElementById('adminKanbanBoard').style.display = 'none';
      renderAdminTasks();
    } else {
      document.getElementById('adminTasksGrid').style.display = 'none';
      document.getElementById('adminKanbanBoard').style.display = 'grid';
      renderKanbanBoard();
    }

    renderAdminEmployees();
  }

  function renderAdminMetrics() {
    const total = tasks.length;
    const activeEmps = users.filter(u => u.role === 'EMPLOYEE').length;
    const completed = tasks.filter(t => t.status === 'COMPLETED').length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById('metricTotalTasks').textContent = total;
    document.getElementById('metricActiveEmployees').textContent = activeEmps;
    document.getElementById('metricCompletionRate').textContent = `${rate}%`;
    document.getElementById('metricPendingTasks').textContent = pending;
  }

  function renderWorkloadDistribution() {
    const container = document.getElementById('workloadMetersContainer');
    const employees = users.filter(u => u.role === 'EMPLOYEE');

    if (employees.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No employees registered.</div>';
      return;
    }

    const maxCapacity = 5; // standard target workload capacity per developer

    container.innerHTML = employees.map(emp => {
      const empTasks = tasks.filter(t => t.assignedTo === emp.id && t.status !== 'COMPLETED');
      const percentage = Math.min(Math.round((empTasks.length / maxCapacity) * 100), 100);

      return `
        <div class="workload-item">
          <div class="workload-header">
            <span><strong>${escapeHtml(emp.name)}</strong> (${escapeHtml(emp.title)})</span>
            <span>${empTasks.length} active task${empTasks.length !== 1 ? 's' : ''}</span>
          </div>
          <div class="workload-bar-track">
            <div class="workload-bar-fill" style="width: ${percentage}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderActivityFeed() {
    const container = document.getElementById('activityFeedList');
    if (activities.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No recent sprint activity recorded.</div>';
      return;
    }

    container.innerHTML = activities.slice(0, 8).map(act => `
      <div class="activity-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary); flex-shrink: 0; margin-top: 2px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div>
          <div>${escapeHtml(act.text)}</div>
          <div style="font-size: 0.725rem; color: var(--text-muted);">${act.time}</div>
        </div>
      </div>
    `).join('');
  }

  function populateEmployeeFilterDropdown() {
    const select = document.getElementById('adminEmployeeFilter');
    const taskAssigneeSelect = document.getElementById('taskAssignee');
    const editTaskAssigneeSelect = document.getElementById('editTaskAssignee');
    
    let optionsHtml = '<option value="ALL">All Employees</option>';
    let assigneeHtml = '<option value="" disabled selected>Select an Employee</option>';

    const employeesOnly = users.filter(u => u.role === 'EMPLOYEE');
    
    employeesOnly.forEach(emp => {
      optionsHtml += `<option value="${emp.id}">${escapeHtml(emp.name)} (${escapeHtml(emp.title)})</option>`;
      assigneeHtml += `<option value="${emp.id}">${escapeHtml(emp.name)} - ${escapeHtml(emp.title)}</option>`;
    });

    select.innerHTML = optionsHtml;
    taskAssigneeSelect.innerHTML = assigneeHtml;
    if (editTaskAssigneeSelect) editTaskAssigneeSelect.innerHTML = assigneeHtml;
  }

  function getFilteredTasks() {
    const searchQuery = document.getElementById('adminSearchInput').value.toLowerCase().trim();
    const selectedEmp = document.getElementById('adminEmployeeFilter').value;
    const selectedStatus = document.getElementById('adminStatusFilter').value;
    const selectedPriority = document.getElementById('adminPriorityFilter').value;

    return tasks.filter(task => {
      const assignee = users.find(u => u.id === task.assignedTo);
      const assigneeName = assignee ? assignee.name.toLowerCase() : '';

      const matchesSearch = task.title.toLowerCase().includes(searchQuery) ||
                            task.description.toLowerCase().includes(searchQuery) ||
                            task.category.toLowerCase().includes(searchQuery) ||
                            assigneeName.includes(searchQuery);
      
      const matchesEmp = selectedEmp === 'ALL' || task.assignedTo === selectedEmp;
      const matchesStatus = selectedStatus === 'ALL' || task.status === selectedStatus;
      const matchesPriority = selectedPriority === 'ALL' || task.priority === selectedPriority;

      return matchesSearch && matchesEmp && matchesStatus && matchesPriority;
    });
  }

  function checkOverdue(dueDateStr, status) {
    if (status === 'COMPLETED') return { isOverdue: false, text: `Completed` };
    if (!dueDateStr) return { isOverdue: false, text: '' };

    const today = new Date();
    today.setHours(0,0,0,0);
    const due = new Date(dueDateStr);
    due.setHours(0,0,0,0);

    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { isOverdue: true, text: `⚠️ Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}` };
    } else if (diffDays === 0) {
      return { isOverdue: false, text: `Due Today` };
    } else {
      return { isOverdue: false, text: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}` };
    }
  }

  function renderAdminTasks() {
    const container = document.getElementById('adminTasksGrid');
    const filtered = getFilteredTasks();

    document.getElementById('adminTaskCount').textContent = `${filtered.length} task${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <div class="empty-title">No matching tasks found</div>
          <div class="empty-desc">Try adjusting your filters or click "Assign New Task" to create one.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(task => renderSingleTaskCard(task)).join('');
  }

  function renderKanbanBoard() {
    const filtered = getFilteredTasks();

    const todoTasks = filtered.filter(t => t.status === 'TODO');
    const inProgressTasks = filtered.filter(t => t.status === 'IN_PROGRESS');
    const doneTasks = filtered.filter(t => t.status === 'COMPLETED');

    document.getElementById('kanbanTodoCount').textContent = todoTasks.length;
    document.getElementById('kanbanInProgressCount').textContent = inProgressTasks.length;
    document.getElementById('kanbanDoneCount').textContent = doneTasks.length;

    document.getElementById('kanbanTodoContainer').innerHTML = todoTasks.map(t => renderSingleTaskCard(t)).join('') || '<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center; padding: 20px;">No tasks</div>';
    document.getElementById('kanbanInProgressContainer').innerHTML = inProgressTasks.map(t => renderSingleTaskCard(t)).join('') || '<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center; padding: 20px;">No tasks</div>';
    document.getElementById('kanbanDoneContainer').innerHTML = doneTasks.map(t => renderSingleTaskCard(t)).join('') || '<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center; padding: 20px;">No tasks</div>';
  }

  function renderSingleTaskCard(task) {
    const assignee = users.find(u => u.id === task.assignedTo) || { name: 'Unassigned', avatar: '?' };
    const priorityClass = task.priority.toLowerCase();
    const statusClass = task.status.toLowerCase().replace('_', '');
    const dueInfo = checkOverdue(task.dueDate, task.status);

    let statusBadgeLabel = 'To Do';
    if (task.status === 'IN_PROGRESS') statusBadgeLabel = 'In Progress';
    if (task.status === 'COMPLETED') statusBadgeLabel = 'Completed';

    return `
      <div class="task-card priority-${priorityClass}">
        <div>
          <div class="task-header">
            <div class="task-tags">
              <span class="badge badge-category">${escapeHtml(task.category)}</span>
              <span class="badge badge-priority ${priorityClass}">${escapeHtml(task.priority)}</span>
              <span class="badge badge-points">${task.storyPoints || 3} pts</span>
            </div>
            <span class="badge badge-status ${statusClass}">${statusBadgeLabel}</span>
          </div>

          <h4 class="task-title" onclick="window.TaskPulse.openTaskDetails('${task.id}')" title="Click to view details & discussion">${escapeHtml(task.title)}</h4>
          <p class="task-desc">${escapeHtml(task.description || 'No description provided.')}</p>
        </div>

        <div class="task-footer">
          <div class="assignee-info">
            <div class="assignee-avatar" title="${escapeHtml(assignee.name)}">${escapeHtml(assignee.avatar)}</div>
            <div>
              <div class="assignee-name">${escapeHtml(assignee.name)}</div>
              <div class="due-tag ${dueInfo.isOverdue ? 'overdue' : ''}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                ${dueInfo.text}
              </div>
            </div>
          </div>

          <div class="task-actions">
            <!-- Edit Button -->
            <button type="button" class="btn-icon-only" title="Edit Task Specifications" onclick="window.TaskPulse.openEditTask('${task.id}')">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>

            <!-- Quick Status Dropdown -->
            <select class="status-select-btn" onchange="window.TaskPulse.updateTaskStatus('${task.id}', this.value)">
              <option value="TODO" ${task.status === 'TODO' ? 'selected' : ''}>To Do</option>
              <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
              <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
            </select>

            <!-- Delete Task Btn -->
            <button type="button" class="btn-danger" title="Delete Task" onclick="window.TaskPulse.deleteTask('${task.id}')">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdminEmployees() {
    const container = document.getElementById('adminEmployeesGrid');
    const employeesOnly = users.filter(u => u.role === 'EMPLOYEE');
    
    document.getElementById('adminEmployeeCount').textContent = `${employeesOnly.length} member${employeesOnly.length !== 1 ? 's' : ''}`;

    if (employeesOnly.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-title">No software team members registered</div>
          <div class="empty-desc">Click "Add New Team Member" to add employees to the workspace.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = employeesOnly.map(emp => {
      const empTasks = tasks.filter(t => t.assignedTo === emp.id);
      const completedCount = empTasks.filter(t => t.status === 'COMPLETED').length;

      return `
        <div class="employee-card">
          <div class="emp-avatar-large">${escapeHtml(emp.avatar || emp.name.substring(0,2).toUpperCase())}</div>
          <h4 class="emp-name">${escapeHtml(emp.name)}</h4>
          <div class="emp-email">${escapeHtml(emp.email)}</div>
          <span class="emp-dept-badge">${escapeHtml(emp.department)} • ${escapeHtml(emp.title)}</span>
          <div style="font-size: 0.775rem; color: var(--text-secondary); margin-bottom: 12px; background: var(--bg-glass); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: inline-block;">
            🔑 Password: <code style="color: var(--primary); font-weight: 600;">${escapeHtml(emp.password || 'employee123')}</code>
          </div>

          <div class="emp-stats-bar">
            <div class="emp-stat">
              <div class="stat-val">${empTasks.length}</div>
              <div class="stat-lbl">Assigned</div>
            </div>
            <div class="emp-stat">
              <div class="stat-val" style="color: #10b981;">${completedCount}</div>
              <div class="stat-lbl">Completed</div>
            </div>
          </div>

          <button type="button" class="btn-danger" style="width: 100%; justify-content: center;" onclick="window.TaskPulse.deleteEmployee('${emp.id}')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Remove Member
          </button>
        </div>
      `;
    }).join('');
  }

  // --- EMPLOYEE PORTAL RENDER ---
  function renderEmployeePortal() {
    document.getElementById('empGreetingName').textContent = currentUser.name;
    
    // My tasks
    const myTasks = tasks.filter(t => t.assignedTo === currentUser.id);
    const inProgress = myTasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completed = myTasks.filter(t => t.status === 'COMPLETED').length;

    document.getElementById('empMetricTotal').textContent = myTasks.length;
    document.getElementById('empMetricInProgress').textContent = inProgress;
    document.getElementById('empMetricCompleted').textContent = completed;

    renderEmployeeTasks();
  }

  function renderEmployeeTasks() {
    const container = document.getElementById('empTasksGrid');
    const searchQuery = document.getElementById('empSearchInput').value.toLowerCase().trim();
    const selectedStatus = document.getElementById('empStatusFilter').value;

    const myTasks = tasks.filter(t => t.assignedTo === currentUser.id);

    let filtered = myTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery) ||
                            task.description.toLowerCase().includes(searchQuery);
      const matchesStatus = selectedStatus === 'ALL' || task.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    document.getElementById('empTaskCount').textContent = `${filtered.length} task${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <div class="empty-title">All caught up!</div>
          <div class="empty-desc">No assigned tasks match your current filter selection.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(task => {
      const priorityClass = task.priority.toLowerCase();
      const statusClass = task.status.toLowerCase().replace('_', '');
      const dueInfo = checkOverdue(task.dueDate, task.status);

      let statusBadgeLabel = 'To Do';
      if (task.status === 'IN_PROGRESS') statusBadgeLabel = 'In Progress';
      if (task.status === 'COMPLETED') statusBadgeLabel = 'Completed';

      return `
        <div class="task-card priority-${priorityClass}">
          <div>
            <div class="task-header">
              <div class="task-tags">
                <span class="badge badge-category">${escapeHtml(task.category)}</span>
                <span class="badge badge-priority ${priorityClass}">${escapeHtml(task.priority)}</span>
                <span class="badge badge-points">${task.storyPoints || 3} pts</span>
              </div>
              <span class="badge badge-status ${statusClass}">${statusBadgeLabel}</span>
            </div>

            <h4 class="task-title" onclick="window.TaskPulse.openTaskDetails('${task.id}')" title="Click to view details & discussions">${escapeHtml(task.title)}</h4>
            <p class="task-desc">${escapeHtml(task.description || 'No detailed instructions provided.')}</p>
          </div>

          <div class="task-footer">
            <div class="due-tag ${dueInfo.isOverdue ? 'overdue' : ''}">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${dueInfo.text}
            </div>

            <div class="task-actions">
              <!-- Employee Status Select Dropdown -->
              <select class="status-select-btn" style="background: var(--primary-light); color: var(--primary); border-color: var(--border-highlight);" onchange="window.TaskPulse.updateTaskStatus('${task.id}', this.value)">
                <option value="TODO" ${task.status === 'TODO' ? 'selected' : ''}>To Do</option>
                <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress 🚀</option>
                <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed ✅</option>
              </select>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- ACTIONS (CREATE TASK, EDIT TASK, ADD EMPLOYEE, DELETE TASK, DELETE EMP, UPDATE STATUS) ---
  function createNewTask(data) {
    const assignee = users.find(u => u.id === data.assignedTo);
    const newTask = {
      id: 'tsk_' + Date.now(),
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      category: data.category,
      priority: data.priority,
      storyPoints: parseInt(data.storyPoints || 3),
      status: 'TODO',
      dueDate: data.dueDate,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    };

    tasks.unshift(newTask);
    saveTasks();
    logActivity(`Assigned task "${data.title}" to ${assignee ? assignee.name : 'Employee'}`);
    showToast('WorkTask successfully assigned to team member!');
    closeModal('createTaskModal');

    if (currentUser.role === 'ADMIN') renderAdminDashboard();
  }

  function openEditTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    populateEmployeeFilterDropdown();

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description || '';
    document.getElementById('editTaskAssignee').value = task.assignedTo;
    document.getElementById('editTaskPriority').value = task.priority;
    document.getElementById('editTaskCategory').value = task.category;
    document.getElementById('editTaskStoryPoints').value = task.storyPoints || 3;
    document.getElementById('editTaskDueDate').value = task.dueDate;

    openModal('editTaskModal');
  }

  function saveEditedTask(data) {
    const task = tasks.find(t => t.id === data.id);
    if (!task) return;

    task.title = data.title;
    task.description = data.description;
    task.assignedTo = data.assignedTo;
    task.priority = data.priority;
    task.category = data.category;
    task.storyPoints = parseInt(data.storyPoints);
    task.dueDate = data.dueDate;

    saveTasks();
    logActivity(`Updated parameters for task "${task.title}"`);
    showToast('Task details updated successfully!');
    closeModal('editTaskModal');

    if (currentUser.role === 'ADMIN') renderAdminDashboard();
  }

  function openTaskDetails(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const assignee = users.find(u => u.id === task.assignedTo) || { name: 'Unassigned' };
    const dueInfo = checkOverdue(task.dueDate, task.status);

    document.getElementById('detailTaskId').value = task.id;
    document.getElementById('detailModalTitle').textContent = task.title;

    document.getElementById('detailModalContent').innerHTML = `
      <div style="background: var(--bg-glass); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-sm); margin-bottom: 16px;">
        <p style="font-size: 0.925rem; color: var(--text-primary); margin-bottom: 12px;">${escapeHtml(task.description || 'No detailed instructions provided.')}</p>
        
        <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.8rem; color: var(--text-secondary);">
          <div><strong>Assigned To:</strong> ${escapeHtml(assignee.name)}</div>
          <div><strong>Category:</strong> ${escapeHtml(task.category)}</div>
          <div><strong>Priority:</strong> ${escapeHtml(task.priority)}</div>
          <div><strong>Agile Points:</strong> ${task.storyPoints || 3} pts</div>
          <div><strong>Status:</strong> ${task.status}</div>
          <div class="${dueInfo.isOverdue ? 'due-tag overdue' : ''}"><strong>Schedule:</strong> ${dueInfo.text}</div>
        </div>
      </div>
    `;

    renderTaskComments(task);
    openModal('taskDetailsModal');
  }

  function renderTaskComments(task) {
    const container = document.getElementById('commentsContainer');
    const comments = task.comments || [];

    if (comments.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted); font-size: 0.825rem; margin-bottom: 10px;">No comments or PR logs added yet.</div>';
      return;
    }

    container.innerHTML = comments.map(c => `
      <div class="comment-box">
        <div class="comment-author">
          <span>${escapeHtml(c.author)}</span>
          <span class="comment-time">${c.time}</span>
        </div>
        <div class="comment-text">${escapeHtml(c.text)}</div>
      </div>
    `).join('');
  }

  function addCommentToTask(taskId, text) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (!task.comments) task.comments = [];

    const now = new Date();
    const timeStr = `${now.toLocaleString('en-US', { month: 'short', day: '2-digit' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    task.comments.push({
      author: currentUser.name,
      text: text,
      time: timeStr
    });

    saveTasks();
    logActivity(`${currentUser.name} commented on "${task.title}"`);
    showToast('Posted comment to task!');
    renderTaskComments(task);
  }

  function addNewEmployee(data) {
    // Generate avatar initials
    const parts = data.name.trim().split(' ');
    const avatar = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();

    const newEmp = {
      id: 'usr_' + Date.now(),
      name: data.name,
      email: data.email,
      password: data.password || 'employee123',
      role: 'EMPLOYEE',
      title: data.title,
      department: data.department,
      avatar: avatar
    };

    users.push(newEmp);
    saveUsers();
    logActivity(`Registered ${newEmp.name} as ${newEmp.title}`);
    showToast(`Registered ${newEmp.name} as ${newEmp.title}!`);
    closeModal('addEmployeeModal');

    if (currentUser.role === 'ADMIN') renderAdminDashboard();
  }

  function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      saveTasks();
      
      let statusLabel = newStatus === 'COMPLETED' ? 'Completed 🎉' : newStatus === 'IN_PROGRESS' ? 'In Progress 🚀' : 'To Do';
      logActivity(`${currentUser.name} set "${task.title}" to ${newStatus}`);
      showToast(`Task status updated to "${statusLabel}"`);

      if (currentUser.role === 'ADMIN') {
        renderAdminDashboard();
      } else {
        renderEmployeePortal();
      }
    }
  }

  function deleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (confirm('Are you sure you want to delete this task?')) {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      if (task) logActivity(`Deleted task "${task.title}"`);
      showToast('Task deleted successfully.');
      if (currentUser.role === 'ADMIN') renderAdminDashboard();
    }
  }

  function deleteEmployee(empId) {
    const emp = users.find(u => u.id === empId);
    if (!emp) return;

    if (confirm(`Are you sure you want to remove ${emp.name} from the software team? Tasks assigned to them will be unassigned.`)) {
      users = users.filter(u => u.id !== empId);
      tasks.forEach(t => {
        if (t.assignedTo === empId) t.assignedTo = '';
      });

      saveUsers();
      saveTasks();
      logActivity(`Removed ${emp.name} from workspace team`);
      showToast(`Removed ${emp.name} from team.`, 'error');
      if (currentUser.role === 'ADMIN') renderAdminDashboard();
    }
  }

  // --- CSV EXPORTER ---
  function exportSprintCsv() {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Task ID,Title,Category,Priority,Story Points,Assigned Employee,Status,Due Date\n';

    tasks.forEach(t => {
      const assignee = users.find(u => u.id === t.assignedTo) || { name: 'Unassigned' };
      const titleClean = `"${t.title.replace(/"/g, '""')}"`;
      csvContent += `${t.id},${titleClean},${t.category},${t.priority},${t.storyPoints || 3},"${assignee.name}",${t.status},${t.dueDate}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `software_house_sprint_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Downloaded Sprint Report CSV!');
  }

  // --- MODAL CONTROLS ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    // Theme Switcher
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // CSV Export
    document.getElementById('exportCsvBtn').addEventListener('click', exportSprintCsv);

    // View Switcher Buttons
    document.getElementById('viewMatrixBtn').addEventListener('click', () => {
      currentTaskViewMode = 'MATRIX';
      document.getElementById('viewMatrixBtn').classList.add('active');
      document.getElementById('viewKanbanBtn').classList.remove('active');
      renderAdminDashboard();
    });

    document.getElementById('viewKanbanBtn').addEventListener('click', () => {
      currentTaskViewMode = 'KANBAN';
      document.getElementById('viewKanbanBtn').classList.add('active');
      document.getElementById('viewMatrixBtn').classList.remove('active');
      renderAdminDashboard();
    });

    // Quick Demo Preset Buttons
    document.getElementById('demoAdminBtn')?.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'admin@softwarehouse.com';
      document.getElementById('loginPassword').value = 'admin123';
      handleLogin('admin@softwarehouse.com', 'admin123');
    });

    document.getElementById('demoEmpBtn')?.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'alex@softwarehouse.com';
      document.getElementById('loginPassword').value = 'employee123';
      handleLogin('alex@softwarehouse.com', 'employee123');
    });

    // Login Form Submit
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPassword').value;
      handleLogin(email, pass);
    });

    // Admin Modals Triggers
    document.getElementById('openCreateTaskModalBtn').addEventListener('click', () => openModal('createTaskModal'));
    document.getElementById('openAddEmployeeModalBtn').addEventListener('click', () => openModal('addEmployeeModal'));

    // Modal Close Buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });

    // Form Submit: Create Task
    document.getElementById('createTaskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        title: document.getElementById('taskTitle').value.trim(),
        description: document.getElementById('taskDescription').value.trim(),
        assignedTo: document.getElementById('taskAssignee').value,
        priority: document.getElementById('taskPriority').value,
        category: document.getElementById('taskCategory').value,
        storyPoints: document.getElementById('taskStoryPoints').value,
        dueDate: document.getElementById('taskDueDate').value
      };

      if (!data.assignedTo) {
        showToast('Please select an employee to assign this task to.', 'error');
        return;
      }

      createNewTask(data);
      document.getElementById('createTaskForm').reset();
    });

    // Form Submit: Edit Task
    document.getElementById('editTaskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        id: document.getElementById('editTaskId').value,
        title: document.getElementById('editTaskTitle').value.trim(),
        description: document.getElementById('editTaskDescription').value.trim(),
        assignedTo: document.getElementById('editTaskAssignee').value,
        priority: document.getElementById('editTaskPriority').value,
        category: document.getElementById('editTaskCategory').value,
        storyPoints: document.getElementById('editTaskStoryPoints').value,
        dueDate: document.getElementById('editTaskDueDate').value
      };

      saveEditedTask(data);
    });

    // Form Submit: Add Comment
    document.getElementById('addCommentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const taskId = document.getElementById('detailTaskId').value;
      const text = document.getElementById('commentInput').value.trim();
      if (text) {
        addCommentToTask(taskId, text);
        document.getElementById('commentInput').value = '';
      }
    });

    // Form Submit: Add Employee
    document.getElementById('addEmployeeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('empFullName').value.trim(),
        email: document.getElementById('empEmail').value.trim(),
        password: document.getElementById('empPassword').value.trim(),
        department: document.getElementById('empDepartment').value,
        title: document.getElementById('empTitle').value.trim()
      };

      addNewEmployee(data);
      document.getElementById('addEmployeeForm').reset();
    });

    // Admin Filters Listeners
    document.getElementById('adminSearchInput').addEventListener('input', () => {
      if (currentTaskViewMode === 'MATRIX') renderAdminTasks(); else renderKanbanBoard();
    });
    document.getElementById('adminEmployeeFilter').addEventListener('change', () => {
      if (currentTaskViewMode === 'MATRIX') renderAdminTasks(); else renderKanbanBoard();
    });
    document.getElementById('adminStatusFilter').addEventListener('change', () => {
      if (currentTaskViewMode === 'MATRIX') renderAdminTasks(); else renderKanbanBoard();
    });
    document.getElementById('adminPriorityFilter').addEventListener('change', () => {
      if (currentTaskViewMode === 'MATRIX') renderAdminTasks(); else renderKanbanBoard();
    });

    // Employee Filters Listeners
    document.getElementById('empSearchInput').addEventListener('input', renderEmployeeTasks);
    document.getElementById('empStatusFilter').addEventListener('change', renderEmployeeTasks);

    // Set default due date in task modal to 7 days from today
    const defaultDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    document.getElementById('taskDueDate').value = defaultDueDate;
  }

  // --- EXPOSE GLOBAL HELPERS FOR INLINE EVENT HANDLERS ---
  window.TaskPulse = {
    updateTaskStatus,
    openEditTask,
    openTaskDetails,
    deleteTask,
    deleteEmployee
  };

  // Launch app when DOM is ready
  document.addEventListener('DOMContentLoaded', initApp);

})();
