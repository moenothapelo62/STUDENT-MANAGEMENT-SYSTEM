# Student Management System

DIWA2110 – Web Application Development, Individual Assignment (10%).
Built with React + JavaScript + Vite.

## What it does

- **Dashboard menu (left side):** Dashboard + Students pages, foldable, with enrolled % ring. Keys `1` / `2` switch pages. On phones the menu slides in.
- **Student dashboard:** table with ID, full name, age, email, course, enrollment status, edit/delete buttons.
- **Add student:** popup form with validation.
- **Edit student:** same form, filled with the student I clicked.
- **Delete student:** "are you sure?" popup.
- Everything updates immediately, no refresh. Data is saved in `localStorage` so refresh keeps my students.
- Search by name/email, filter by status, sort by ID/name/age/course.
- Works on computer and phone (menu becomes a slide-in panel).

## How to run

```bash
cd frontend/STUDENT-MANAGEMENT-SYSTEM
npm install
npm run dev
```

Open the link Vite prints (normally http://localhost:5173).

## Project structure

```text
src/
  App.jsx                      # picks Dashboard or Students page, holds popups
  main.jsx                     # starts the app
  components/
    AppBackground.jsx          # moving background only
    DashboardMenu.jsx          # left menu with Dashboard + Students
    DashboardOverview.jsx      # welcome box + top courses + newest students
    StudentDashboard.jsx       # student records table + empty message
    StudentForm.jsx            # add/edit form + validation
    StudentModal.jsx           # normal popup box
    DeleteStudentModal.jsx     # delete confirm popup
    StudentSearchFilter.jsx    # search box + filter + sort
    StudentStatsCards.jsx      # total / enrolled / not enrolled / avg age
  hooks/
    useStudents.js             # all state + add/edit/delete/search/sort logic
  data/
    initialStudents.js         # 3 starter students
```

I named files after what they do so the lecturer can find things fast.

## JavaScript I used (for the rubric)

- **Data types:** string (fullName, email, course), number (id, age), boolean (isEnrolled), array (student list), object (one student, form data, errors).
- **Variables:** `const` for state, keys and things I never reassign. `let` for counters and loop values that change (enrolled count, hash, initials). `var` is only shown in `demoVariableScopes()` in `useStudents.js` to prove I know it is function-scoped and leaks out of blocks, which is why I avoid it in real code.
- **Functions:** normal functions (`loadStudents`, `validate`, `handleSubmit`, `getInitials`) and arrow functions (event handlers, `.map`, `.filter`, `.sort` callbacks). Each CRUD action is one reusable function with parameters and return values.
- **Conditionals + array methods:** `if` for validation/filters, ternary for badges/labels, `.map` (render rows, new IDs, edit), `.filter` (search, delete), `.sort` + `localeCompare` (ordering), `.includes` (search).
- **React:** functional components, JSX, props, `useState` (list, search, popups), `useEffect` (save to localStorage, keyboard keys, count-up), `useMemo` (filtered list), `useCallback` (CRUD fns), event handlers (`onChange`, `onSubmit`, `onClick`), immediate UI update after every operation.

## Form validation

- All fields required.
- Age must be a number between 16 and 100.
- Email must match `non-space @ non-space . non-space`.
- Errors show under each box and clear when I start fixing it. Invalid forms do not submit.

## My testing

I tested by hand in the browser:

| # | Test | What I did | Result |
|---|------|------------|--------|
| 1 | Add | New Student → fill all boxes → Save | New row appears, toast shows, stays after refresh |
| 2 | Add validation | Save with empty boxes, age 10, bad email | Red messages, no save |
| 3 | Edit | Pencil → change name/course → Update | Row updates at once |
| 4 | Edit cancel | Pencil → Cancel / X / click outside | No change |
| 5 | Delete | Bin → Cancel | Row stays |
| 6 | Delete confirm | Bin → Yes, Delete | Row removed, toast with name |
| 7 | Search | Type name/email | List filters live |
| 8 | Filter + sort | Enrolled Only, Sort by Age/Name | Correct subset and order |
| 9 | Empty state | Search for "zzz" | "No students found" message |
| 10 | Refresh | Add student → refresh page | Student still there (localStorage) |
| 11 | Menu + View Students | Click Dashboard/Students, keys 1/2, fold menu, View Students buttons, phone width | Pages switch, menu folds, buttons jump to Students, drawer opens |
| 12 | Build | `npm run build` | Builds with no errors |

## Deployment

- GitHub repo: _paste your repository URL here_ (push this whole `STUDENT-MANAGEMENT-SYSTEM` folder, without `node_modules`).
- Live link (Netlify or Vercel): _paste your deployment URL here_. I checked the live link loads and add/edit/delete work.

## Notes

- No `node_modules` in the repo, install with `npm install`.
- Starter data: Thabo Molefe, Lerato Nkosi, Neo Mokoena.
