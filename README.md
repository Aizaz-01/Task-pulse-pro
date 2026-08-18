# 🚀 Task Pulse Pro — Enterprise Workforce & Agile Task Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS--ES6+-2563eb)](https://developer.mozilla.org/)
[![Status](https://img.shields.io/badge/Build-Single--File%20Standalone-10b981)](index.html)

**Task Pulse Pro** is an executive-grade workforce management and task tracking application engineered for tech companies, digital agencies, and software houses. Built as a 100% self-contained single-file HTML application with zero external framework dependencies, it provides real-time team analytics, role-based access control (RBAC), custom member password management, and interactive SVG trajectory graphs.

Developed during a Software Engineering Internship at **Code Bean Software House**.

---

## 🌟 Key Features Checklist

### 1. 👑 Super Admin Governance & Strict RBAC
* **Exclusive Task Assignment**: Only Super Admin (`Aizaz Nisar`) can assign new work tasks to employees.
* **Exclusive Due Date & Spec Modifications**: Admins can edit task details, adjust due dates with date pickers, and re-prioritize deliverables (`✏️ Edit / Date`).
* **Member Password Management**: Assign and view custom login passwords for team members directly from the Admin Roster view (`🔑 Password: <custom_password>`).
* **Soft-Delete History Archive**: Soft-delete tasks and inspect historical deleted tasks (`Deleted History 🗑️`).

### 2. 📈 Interactive SVG Visual Graphs
* **Per-Developer Curve & Area Graphs**: Pure SVG line and gradient area trajectory graphs plotting 4 metrics per developer:
  * 🔵 **Node 1: Assigned Tasks**
  * 🟢 **Node 2: Completed Tasks**
  * 🔴 **Node 3: Overdue Tasks**
  * ⚪ **Node 4: Deleted Tasks**
* **Real-Time Efficiency Score**: Automated performance score percentage for each team member.

### 3. 👥 Employee Portal (Restricted Mode)
* **Distraction-Free Workspace**: Employees log in to view tasks assigned specifically to them by Super Admin.
* **Status Updates**: Quick dropdown controls to advance task status (`To Do` ➔ `In Progress` ➔ `Completed ✅`).
* **Urgency Reminders**: Automated deadline alert banner for upcoming due dates.
* **Strict Permission Guards**: Task creation and date editing are disabled and guarded on the backend.

### 4. 🎨 Executive Theme & Priority Scheme
* **Sapphire & Midnight Slate Theme**: Built with CSS variables (`--bg-body: #0b1329`, `--primary: #2563eb`), ambient glow lights, and card glassmorphism.
* **Priority Color Coding**:
  * 🔥 **Very Important** (Crimson Red `#dc2626`)
  * ⚡ **Important** (Amber Orange `#f59e0b`)
  * 🔹 **Not Much Important** (Teal Sapphire `#0284c7`)

### 5. 📊 Reporting & Security Tools
* **Excel (CSV) Export**: Instant single-click sprint report generation (`.csv`).
* **PDF Print Report**: `@media print` formatted stylesheet for clean PDF export.
* **Forgot Password OTP Recovery Wizard**: 3-step modal (Enter Email ➔ 4-digit OTP alert ➔ Reset Password).

---

## 🛠️ Technology Stack

* **Frontend**: HTML5 (Semantic Layout), CSS3 (Custom Design Tokens, Glassmorphism, SVG Gradients)
* **Logic**: Vanilla JavaScript (ES6+, Functional State Engine, Event Delegation)
* **Graphics**: Native Inline SVG Engine (Zero heavy Chart.js/D3 dependencies)
* **Storage & State**: Web Storage API (`localStorage`)
* **Architecture**: 100% Standalone Single-File Document (`index.html`)

---

## 🔑 Default Demonstration Credentials

| Role | Email | Password | Full Name |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@softwarehouse.com` | `admin123` | **Aizaz Nisar** |
| **Frontend Dev** | `alex@softwarehouse.com` | `employee123` | **Alex Johnson** |
| **Backend Lead** | `maria@softwarehouse.com` | `employee123` | **Maria Garcia** |
| **UI/UX Designer** | `david@softwarehouse.com` | `employee123` | **David Miller** |
| **QA Lead** | `samira@softwarehouse.com` | `employee123` | **Samira Ahmed** |

---

## 🚀 Quick Start & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/task-pulse-pro.git
   ```
2. **Launch the application**:
   * Double-click `index.html` or open it in any modern web browser (Chrome, Edge, Firefox, Safari).
   * **No Node.js, npm install, or local server required!**

---

## 📜 License & Acknowledgments

This project is open-source under the [MIT License](LICENSE).

Developed with guidance and support during internship at **Code Bean Software House**.
