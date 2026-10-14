# Student Management System

**DIWA2110 — Web Application Development**
**Individual Assignment — 10%**

An interactive student management system built with React, allowing users to view, add, edit, and delete student records through a modern glassmorphic web interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [JavaScript Concepts Demonstrated](#javascript-concepts-demonstrated)
- [React Architecture](#react-architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Testing Checklist](#testing-checklist)
- [Deployment](#deployment)
- [Academic Integrity](#academic-integrity)

---

## Project Overview

This application is a fully interactive Student Management System that demonstrates understanding of:

- JavaScript data types, variables, and functions
- React components, state management, and event handling
- Modal creation and interaction
- Form validation and error handling
- Responsive UI design

Users can perform full CRUD (Create, Read, Update, Delete) operations on student records with immediate UI updates, all without page refreshes.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| **React 19** | UI framework for component-based architecture |
| **Vite** | Build tool and development server |
| **Motion (Framer Motion)** | Declarative animations and transitions |
| **Sonner** | Toast notification system |
| **React Icons (Lucide)** | SVG icon library |
| **localStorage** | Client-side persistent storage |
| **CSS3 (Glassmorphism)** | Modern UI styling with backdrop-filter |

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/student-management-system.git

# Navigate to the project folder
cd student-management-system

# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## JavaScript Concepts Demonstrated

### Data Types

The application uses all five JavaScript primitive types plus objects and arrays:

```javascript
// STRING — used for names, emails, courses
const fullName = "Thabo Molefe";  // string
const email = "thabo@example.com"; // string

// NUMBER — used for IDs and ages (supports arithmetic)
const id = 1;    // number
const age = 21;  // number

// BOOLEAN — used for binary enrollment status
const isEnrolled = true;   // true or false

// ARRAY — used to store the collection of student objects
const students = [];  // array of objects

// OBJECT — each student is an object with key-value pairs
const student = {
  id: 1,              // number
  fullName: "Thabo",  // string
  age: 21,            // number
  email: "thabo@example.com",  // string
  course: "Diploma in IT",     // string
  isEnrolled: true    // boolean
};

// NULL — used when no student is selected
let selectedStudent = null;
```

**Why these types were selected:**

- **number** for `id` and `age` — required for arithmetic operations (`Math.max`, sorting, average calculation)
- **string** for text fields — natural representation of names, emails, courses
- **boolean** for `isEnrolled` — binary state is most efficient (true/false)
- **Array** for the student list — enables `.filter()`, `.map()`, `.sort()` methods
- **Object** for each student — groups related properties together logically
- **null** for unselected state — explicitly means "nothing selected"

### Variable Declarations

```javascript
// CONST — used when the variable should never be reassigned
const STORAGE_KEY = "students";        // Constant string
const emptyForm = { fullName: "" };    // Constant object reference
const initialStudents = [...];         // Constant array reference

// LET — used when the value needs to change
let hash = 0;                    // Changes during avatar color calculation
let initials = "";               // Builds up string in a loop
let matchesStatus = true;        // Conditionally reassigned in filter
```

#### var Demonstration

```javascript
/*
 * VAR — Function-scoped (legacy, avoid in modern JS)
 *
 * var is function-scoped, meaning it's accessible throughout the entire
 * function regardless of where it's declared. This can cause bugs.
 *
 * Example:
 */
function legacyExample() {
  var message = "Hello";        // Declared at function level
  if (true) {
    var message = "World";      // SAME variable! Reassigns the outer one.
  }
  console.log(message);         // "World" (not "Hello" as you might expect)
}

/*
 * WHY THIS IS PROBLEMATIC:
 * - var ignores block scope (if, for, while blocks)
 * - Variables are hoisted to the top of the function
 * - Can lead to unexpected reassignment bugs
 *
 * MODERN ALTERNATIVE (used in this application):
 */
function modernExample() {
  const message = "Hello";      // Block-scoped, cannot be reassigned
  if (true) {
    let message = "World";      // DIFFERENT variable, block-scoped to the if
  }
  console.log(message);         // "Hello" (unchanged, as expected)
}
```

**Why const and let are preferred:**

| Declaration | Scope | Reassignable | Hoisted | Use Case |
|---|---|---|---|---|
| `const` | Block | No (reference fixed) | No (temporal dead zone) | Values that never change |
| `let` | Block | Yes | No (temporal dead zone) | Values that change over time |
| `var` | Function | Yes | Yes (as `undefined`) | Legacy code (avoid in modern JS) |

In this application, **const** is used whenever a variable doesn't need reassignment (most cases), and **let** is used for loop counters and accumulating values. `var` is not used.

### Functions and Application Logic

The application demonstrates multiple function patterns:

#### Arrow Functions (shorter syntax)

```javascript
// Arrow function with implicit return
const openEditModal = (student) => {
  setSelectedStudent(student);
  setIsEditModalOpen(true);
};

// Arrow function in array methods
students.map((s) => s.id)           // Extract all IDs
students.filter((s) => s.id !== 3)  // Remove student with id 3
students.sort((a, b) => a.id - b.id) // Sort by ID
```

#### Regular Functions (with explicit return)

```javascript
function validate() {
  const newErrors = {};
  // ... validation logic ...
  return newErrors; // Explicit return of the errors object
}
```

#### Function Parameters and Return Values

```javascript
// Takes a student object parameter, returns void (nothing)
function handleAddStudent(newStudent) {
  // Logic here...
  // No return needed — side effects only
}

// Takes no parameters, returns an object
function validate() {
  return { fullName: "Name required" }; // Returns errors object
}
```

#### Conditional Statements

```javascript
// Ternary operator — concise conditional
const newId = students.length > 0 ? Math.max(...) + 1 : 1;

// If/else — multi-branch logic
if (statusFilter === "enrolled") {
  matchesStatus = student.isEnrolled;
} else if (statusFilter === "not-enrolled") {
  matchesStatus = !student.isEnrolled;
}

// Short-circuit evaluation
if (!selectedStudent) return; // Guard clause
```

#### Array Methods

```javascript
// .map() — transform each element
students.map((s) => s.id)  // [1, 2, 3]

// .filter() — keep only matching elements
students.filter((s) => s.isEnrolled)  // Only enrolled students

// .includes() — check if substring exists
name.toLowerCase().includes("thabo")  // true/false

// Spread operator — copy and extend arrays/objects
[...prev, newItem]           // Add to array
{ ...prev, name: "New" }     // Update object property
```

---

## React Architecture

### Component Hierarchy

```
App
├── AnimatedBackground    (decorative animated background)
├── Navbar                (fixed header with navigation)
├── StatsCards            (grid of 4 animated stat cards)
├── SearchFilter          (search input + filter/sort selects)
├── StudentDashboard      (table with animated rows)
│   └── (table rows with edit/delete buttons)
├── Modal (Add)           → StudentForm
├── Modal (Edit)          → StudentForm (with initialData)
└── DeleteConfirmModal    (deletion confirmation)
```

### State Management with useStudents Hook

All student data and operations are centralized in the `useStudents` custom hook:

```javascript
// In App.jsx — destructure all state and functions
const {
  students,              // State: array of student objects
  search,                // State: string
  setSearch,             // Setter function
  handleAddStudent,      // CRUD function
  handleEditStudent,     // CRUD function
  handleDeleteStudent,   // CRUD function
  filteredSortedStudents // Computed: filtered + sorted array
} = useStudents();
```

### React Hooks Used

| Hook | Purpose |
|---|---|
| `useState` | Manage component state (students, search, modals, etc.) |
| `useEffect` | Side effects (localStorage persistence) |
| `useMemo` | Memoized computations (filtered/sorted student list) |
| `useCallback` | Memoized callback functions (CRUD handlers) |

### Props Flow (Unidirectional Data Flow)

```
App (owns state via useStudents)
  ├── students → StatsCards
  ├── students → StudentDashboard
  ├── students → Navbar (count only)
  ├── setSearch → SearchFilter
  └── handlers → StudentDashboard (edit/delete callbacks)
```

---

## Features

### CRUD Operations

- **Create (Add)**: Click "Add Student" → fill form → save
- **Read (View)**: Students displayed in animated table
- **Update (Edit)**: Click edit icon → modify form → update
- **Delete**: Click delete icon → confirm → remove

### Form Validation

| Field | Validation |
|---|---|
| Full Name | Required (not empty) |
| Age | Required, must be positive number |
| Email | Required, must match email format |
| Course | Required (not empty) |

### Search & Filter

- Search by full name or email (case-insensitive)
- Filter by enrollment status (All / Enrolled / Not Enrolled)
- Sort by ID, Name, Age, or Course

### Animations

- Page load: staggered fade-in
- Table rows: slide-in/slide-out with layout animation
- Modals: spring scale + fade
- Buttons: hover/tap scale effects
- Stats: animated count-up numbers
- Background: floating gradient orbs

---

## Project Structure

```
student-management-system/
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── public/
│   ├── favicon.svg             # Site icon
│   └── icons.svg               # Icon sprite
├── src/
│   ├── main.jsx                # React entry point with Toaster
│   ├── index.css               # Global styles and CSS variables
│   ├── App.css                 # Component styles (glassmorphism)
│   ├── App.jsx                 # Root component
│   ├── data/
│   │   └── initialStudents.js  # Default student data array
│   ├── hooks/
│   │   └── useStudents.js      # Central state management hook
│   └── components/
│       ├── AnimatedBackground.jsx  # Floating orbs + grid + noise
│       ├── Navbar.jsx              # Fixed glass navbar
│       ├── StatsCards.jsx          # Animated stat cards
│       ├── SearchFilter.jsx        # Search + filter + sort bar
│       ├── StudentDashboard.jsx    # Student records table
│       ├── StudentForm.jsx         # Add/edit form
│       ├── Modal.jsx               # Reusable modal wrapper
│       └── DeleteConfirmModal.jsx  # Delete confirmation
└── README.md                   # This file
```

---

## Testing Checklist

### Add Student
- [ ] Click "Add Student" button — modal opens
- [ ] Fill in all required fields
- [ ] Click "Save Student" — student appears in table
- [ ] Click "Cancel" — modal closes without saving

### Edit Student
- [ ] Click edit icon on a row — modal opens with pre-filled data
- [ ] Change a field value
- [ ] Click "Update Student" — table shows updated data
- [ ] Click "Cancel" — no changes made

### Delete Student
- [ ] Click delete icon on a row — confirmation modal opens
- [ ] Click "Yes, Delete" — student removed from table
- [ ] Click "Cancel" — student remains in table

### Form Validation
- [ ] Submit with empty Full Name — error shown
- [ ] Submit with empty Age — error shown
- [ ] Submit with age 0 or negative — error shown
- [ ] Submit with invalid email format — error shown
- [ ] Submit with empty Course — error shown
- [ ] Fix errors and resubmit — form accepts valid data

### Search & Filter
- [ ] Type in search box — table filters in real-time
- [ ] Clear search — all students shown
- [ ] Select "Enrolled Only" — only enrolled students shown
- [ ] Select "Not Enrolled Only" — only not-enrolled students shown
- [ ] Change sort — table reorders

### Empty State
- [ ] Remove all students or search for non-existent name
- [ ] Empty state message appears
- [ ] Clear search/filter — students reappear

### Data Persistence
- [ ] Add a student, refresh page — student still exists
- [ ] Add a student, close and reopen browser — student persists

---

## Deployment

### GitHub Repository

1. Create a new repository on GitHub
2. Do NOT commit `node_modules`
3. Push all source files:

```bash
git init
git add .
git commit -m "Student Management System — DIWA2110"
git branch -M main
git remote add origin https://github.com/your-username/student-management-system.git
git push -u origin main
```

### Netlify Deployment

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy"
6. Your live URL will be provided (e.g., `https://your-app.netlify.app`)

### Vercel Deployment (Alternative)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" → import your GitHub repository
3. Framework preset: Vite (auto-detected)
4. Click "Deploy"
5. Your live URL will be provided (e.g., `https://your-app.vercel.app`)

---

## Academic Integrity

This is an individual assignment. The code was written to demonstrate understanding of:

- JavaScript data types (string, number, boolean, array, object, null)
- Variable declarations (const, let, and explanation of var)
- Functions (parameters, return values, arrow functions, conditionals)
- Array methods (map, filter, sort, includes)
- React components, JSX, props, and state management
- Event handling and immediate UI updates
- Modal creation and interaction
- Form validation and error handling

Each function includes comments explaining the logic, data types used, and design decisions.

---

## License

This project was created for academic purposes as part of DIWA2110 — Web Application Development.
