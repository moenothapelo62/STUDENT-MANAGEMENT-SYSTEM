import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuMenu } from "react-icons/lu";
// My components
import AppBackground from "./components/AppBackground";
import DashboardMenu from "./components/DashboardMenu";
import DashboardOverview from "./components/DashboardOverview";
import StudentStatsCards from "./components/StudentStatsCards";
import StudentSearchFilter from "./components/StudentSearchFilter";
import StudentDashboard from "./components/StudentDashboard";
import StudentModal from "./components/StudentModal";
import StudentForm from "./components/StudentForm";
import DeleteStudentModal from "./components/DeleteStudentModal";
import { useStudents } from "./hooks/useStudents";
import "./App.css";

// Simple fade and slide for switching pages
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function App() {
  // Which menu page is showing: dashboard or students
  const [activeView, setActiveView] = useState("dashboard");
  // true = small icon menu, false = full menu
  const [collapsed, setCollapsed] = useState(false);
  // Mobile menu open or closed
  const [mobileOpen, setMobileOpen] = useState(false);

  // All my student data and functions come from this hook
  const {
    students,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedStudent,
    setSelectedStudent,
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    openEditModal,
    openDeleteModal,
    filteredSortedStudents,
  } = useStudents();

  // Count how many are enrolled
  const enrolledCount = students.filter((s) => s.isEnrolled).length;

  // Press 1 for Dashboard, 2 for Students 
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "1") setActiveView("dashboard");
      if (e.key === "2") setActiveView("students");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`app ${collapsed ? "side-collapsed" : ""}`}>
      <AppBackground />

      {/* Left side menu */}
      <DashboardMenu
        activeView={activeView}
        onNavigate={setActiveView}
        studentCount={students.length}
        enrolledCount={enrolledCount}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        onAddClick={() => setIsAddModalOpen(true)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="app-main">
        
        <button
          className="mobile-fab glass"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <LuMenu size={20} />
        </button>

        {/* Main part of the page */}
        <main className="main-content">
          {/* Page heading with logo */}
          <header className="page-header">
            <img
              src="/limkokwing-logo-cropped.png"
              alt="Limkokwing University logo"
              className="page-logo"
            />
            <div>
              <h1 className="page-title">Student Management System</h1>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeView === "dashboard" ? (
              <motion.div
                key="dashboard"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              >
                <StudentStatsCards students={students} />
                {/* Rich dashboard overview with View Students buttons */}
                <DashboardOverview
                  students={students}
                  onViewStudents={() => setActiveView("students")}
                  onAddClick={() => setIsAddModalOpen(true)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="students"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              >
                <StudentSearchFilter
                  search={search}
                  onSearchChange={setSearch}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
                <StudentDashboard
                  students={filteredSortedStudents}
                  onEditClick={openEditModal}
                  onDeleteClick={openDeleteModal}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="app-footer">
          <p>&copy; 2026 Student Management System</p>
        </footer>
      </div>

    {/* Add student popup */}
      <StudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student"
      >
        <StudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </StudentModal>

      {/* Edit student popup */}
      <StudentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStudent(null);
        }}
        title="Edit Student"
      >
        <StudentForm
          initialData={selectedStudent}
          onSubmit={handleEditStudent}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
        />
      </StudentModal>

    {/* Delete confirm popup */}
      <DeleteStudentModal
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
