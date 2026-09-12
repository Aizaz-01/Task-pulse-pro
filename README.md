# 🚀 Task Pulse Pro — Workforce & Task Management Portal

Task Pulse Pro is a web-based **workforce and task management portal** developed to help software houses and teams organize tasks, monitor employee progress, manage priorities, and track overall team performance through a centralized dashboard.

The project was developed as part of my **Internship at Code Bean Software House**, where I worked on implementing a practical task management solution with role-based access, interactive analytics, task tracking, and reporting features.

---

## 📌 Project Overview

Task Pulse Pro provides separate experiences for **Super Admins** and **Employees**.

The Super Admin can create and manage tasks, assign work to team members, modify deadlines and priorities, monitor employee performance, and access reporting features.

Employees have a restricted workspace where they can view their assigned tasks and update their task progress.

The application is built as a **standalone HTML application** using HTML5, CSS3, and Vanilla JavaScript, with browser `localStorage` used for client-side data persistence.

---

## ✨ Key Features

### 👑 Super Admin Dashboard

* Create and assign tasks to employees
* Edit task information and deadlines
* Change task priorities
* Monitor team members and assigned workloads
* View task completion and performance statistics
* Manage employee login credentials
* Search and review task history
* Soft-delete tasks while maintaining deleted-task history
* Export task reports as CSV
* Generate print-ready PDF reports

### 👥 Employee Portal

Employees have access to a focused workspace containing only their assigned tasks.

Features include:

* View assigned tasks
* Track task priorities
* Update task status
* Progress workflow:

  * `To Do`
  * `In Progress`
  * `Completed`
* View upcoming deadlines
* Receive deadline reminders
* Restricted access to administrative functions

### 📊 Team Analytics

The dashboard includes interactive SVG-based visualizations for monitoring team activity.

Metrics include:

* Assigned Tasks
* Completed Tasks
* Overdue Tasks
* Deleted Tasks
* Individual Efficiency Score

These visualizations provide a quick overview of workload distribution and employee progress.

### 🔐 Role-Based Access Control

Task Pulse Pro implements role-based permissions to separate administrative and employee functionality.

**Super Admin**

* Full task management access
* Employee management
* Deadline and priority modification
* Reporting and analytics

**Employee**

* View assigned tasks
* Update task progress
* No access to administrative task creation or management

### 🎨 User Interface

The interface follows a modern dashboard design with:

* Midnight Slate & Sapphire color scheme
* Responsive layouts
* Glassmorphism-inspired components
* CSS custom properties
* Interactive cards
* Status indicators
* Priority-based visual styling
* SVG data visualization

### 🚦 Task Priority System

| Priority              | Description                                       |
| --------------------- | ------------------------------------------------- |
| 🔥 Very Important     | Critical tasks requiring immediate attention      |
| ⚡ Important           | High-priority tasks that should be completed soon |
| 🔹 Not Much Important | Lower-priority tasks                              |

### 📑 Reporting

Task Pulse Pro supports:

* **CSV Export** — Export task and sprint information for spreadsheet analysis
* **PDF/Print Reports** — Generate clean, print-friendly task reports using CSS print styles

---

## 🛠️ Technology Stack

| Technology            | Purpose                                                      |
| --------------------- | ------------------------------------------------------------ |
| **HTML5**             | Application structure and semantic markup                    |
| **CSS3**              | UI design, responsive layouts, animations, and design system |
| **JavaScript (ES6+)** | Application logic, state management, and interactions        |
| **SVG**               | Interactive performance and trajectory graphs                |
| **Web Storage API**   | Client-side data persistence using `localStorage`            |
| **Git & GitHub**      | Version control and project hosting                          |

### Architecture

The project follows a **single-file standalone architecture**:

```text
Task Pulse Pro
│
└── index.html
    ├── HTML Structure
    ├── CSS Styling
    ├── SVG Graphics
    └── JavaScript Application Logic
```

No external frontend framework or build system is required.

---

## 🔑 Demo Credentials

The following credentials can be used to explore the demonstration version.

| Role               | Email                      | Password      | Name         |
| ------------------ | -------------------------- | ------------- | ------------ |
| Super Admin        | `admin@softwarehouse.com`  | `admin123`    | Aizaz Nisar  |
| Frontend Developer | `alex@softwarehouse.com`   | `employee123` | Alex Johnson |
| Backend Lead       | `maria@softwarehouse.com`  | `employee123` | Maria Garcia |
| UI/UX Designer     | `david@softwarehouse.com`  | `employee123` | David Miller |
| QA Lead            | `samira@softwarehouse.com` | `employee123` | Samira Ahmed |

> **Note:** These credentials are intended for demonstration purposes only. This standalone version uses browser-side storage and should not be considered production-grade authentication.

---

## 🚀 Getting Started

### 1. Clone the Repository

https://github.com/Aizaz-01/Task-pulse-pro/tree/main

### 2. Open the Project

Navigate to the project directory and open:

```text
index.html
```

You can simply double-click the file or open it in a modern browser.

### 3. No Installation Required

Task Pulse Pro does not require:

* Node.js
* npm
* Package installation
* Database setup
* Backend server
* Build tools

It runs directly in a modern web browser.

---

## 📂 Project Structure

```text
task-pulse-pro/
│
├── index.html
├── README.md
└── LICENSE
```

The core application is contained within `index.html`.

---

## 🎯 Learning Objectives

This project provided practical experience in:

* Frontend web development
* JavaScript application logic
* DOM manipulation
* Event handling and event delegation
* Role-based UI permissions
* Client-side state management
* Browser `localStorage`
* SVG-based data visualization
* Responsive UI development
* Dashboard design
* CSV report generation
* Print/PDF report styling
* Git and GitHub workflow
* Building a complete application from requirements

---

## 🏢 Internship Project

**Developed during my Software Engineering Internship at Code Bean Software House.**

This project allowed me to apply frontend development concepts in a practical software-house environment and gain hands-on experience with application design, task management workflows, UI development, JavaScript functionality, and project documentation.

**Intern:** Aizaz Nisar
**Organization:** Code Bean Software House
**Project:** Task Pulse Pro
**Technology:** HTML5, CSS3, JavaScript (ES6+)

---

## 🔮 Future Improvements

Potential improvements for a production-ready version include:

* Backend API integration
* Database-based data persistence
* Secure server-side authentication
* Password hashing and account security
* Multi-company/tenant support
* Real-time notifications
* Advanced analytics
* User profile management
* Cloud deployment
* Automated testing
* API-based reporting

---

## 🙏 Acknowledgments

Special thanks to **Code Bean Software House** for providing the internship environment and opportunity to work on practical software development projects.

---

### ⭐ Project Summary

**Task Pulse Pro** demonstrates how a lightweight frontend application can provide a structured workflow for task assignment, employee progress tracking, team analytics, and reporting while maintaining a clean and responsive user experience.
