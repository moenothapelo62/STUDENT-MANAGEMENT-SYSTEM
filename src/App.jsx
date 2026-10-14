/**
 * App Component — Root component of the Student Management System
 *
 * REACT COMPONENT STRUCTURE:
 * - App: Root component, composes all child components
 * - Navbar: Fixed header with navigation and Add button
 * - StatsCards: Grid of animated statistic cards
 * - SearchFilter: Search input + filter/sort dropdowns
 * - StudentDashboard: Table of student records
 * - Modal: Reusable modal wrapper for add/edit forms
 * - StudentForm: Form for adding/editing students
 * - DeleteConfirmModal: Confirmation dialog for deletion
 *
 * STATE MANAGEMENT:
 * All student state is managed in the useStudents custom hook.
 * App receives state and handlers via destructuring.
 * Child components receive data via props.
 *
 * EVENT FLOW:
 * 1. User clicks "Add Student" → setIsAddModalOpen(true)
 * 2. Modal opens with StudentForm inside
 * 3. User fills form and submits → handleAddStudent(data)
 * 4. Hook updates students state → table re-renders immediately
 * 5. Modal closes automatically
 */
import { motion } from "motion/react";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import SearchFilter from "./components/SearchFilter";
import StudentDashboard from "./components/StudentDashboard";
import Modal from "./components/Modal";
import StudentForm from "./components/StudentForm";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useStudents } from "./hooks/useStudents";
import "./App.css";

/**
 * pageVariants — Framer Motion variants for the main content entrance.
 * Animates from invisible (opacity 0, offset down) to visible.
 */
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * App — Root functional component.
 * Uses the useStudents hook for all student data and operations.
 *
 * @returns {JSX.Element}
 */
function App() {
  // DESTRUCTURING: Extract all state and functions from the hook.
  // This object contains state values, setter functions, and CRUD handlers.
  const {
    students,                    // Array<Object> — all students
    search,                      // string — current search text
    setSearch,                   // function — update search
    statusFilter,                // string — current filter
    setStatusFilter,             // function — update filter
    sortBy,                      // string — current sort field
    setSortBy,                   // function — update sort
    isAddModalOpen,              // boolean — add modal state
    setIsAddModalOpen,           // function — toggle add modal
    isEditModalOpen,             // boolean — edit modal state
    setIsEditModalOpen,          // function — toggle edit modal
    isDeleteModalOpen,           // boolean — delete modal state
    setIsDeleteModalOpen,        // function — toggle delete modal
    selectedStudent,             // Object | null — student being edited/deleted
    setSelectedStudent,          // function — set selected student
    handleAddStudent,            // function — add a new student
    handleEditStudent,           // function — update existing student
    handleDeleteStudent,         // function — remove a student
    openEditModal,              // function — open edit modal with student
    openDeleteModal,             // function — open delete modal with student
    filteredSortedStudents,      // Array<Object> — processed student list
  } = useStudents();

  return (
    <div className="app">
      {/* Animated background with floating orbs */}
      <AnimatedBackground />

      {/* Fixed glass navbar */}
      <Navbar
        onAddClick={() => setIsAddModalOpen(true)}
        studentCount={students.length}
      />

      {/* Main content area */}
      <main className="main-content">
        <motion.div
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Statistics cards showing totals */}
          <StatsCards students={students} />

          {/* Search bar and filter controls */}
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Student records table */}
          <StudentDashboard
            students={filteredSortedStudents}
            onEditClick={openEditModal}
            onDeleteClick={openDeleteModal}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2025 Student Management System — DIWA2110</p>
      </footer>

      {/* MODALS — CONDITIONALLY RENDERED */}
      {/* Add Student Modal — shown when isAddModalOpen is true */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student"
      >
        <StudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Student Modal — shown when isEditModalOpen is true */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStudent(null); // Clear selection on close
        }}
        title="Edit Student"
      >
        <StudentForm
          initialData={selectedStudent} // Pass student data to pre-fill form
          onSubmit={handleEditStudent}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal — shown when isDeleteModalOpen is true */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        student={selectedStudent}
        onConfirm={handleDeleteStudent}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(null);
        }}
      />
    </div>
  );
}

export default App;
