/**
 * StudentDashboard Component
 *
 * Displays student records in a structured table with animated rows.
 * Demonstrates: React props, array .map() iteration, AnimatePresence
 * for enter/exit animations, and conditional rendering.
 */
import { motion, AnimatePresence } from "motion/react";
import { LuPencil, LuTrash2, LuSearchX } from "react-icons/lu";

/**
 * rowVariants — Animation variants for table row enter/exit.
 * - hidden: starts invisible and offset to the left
 * - visible: fully opaque at normal position
 * - exit: fades out and slides right
 */
const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

/**
 * getInitials — Extracts initials from a full name string.
 *
 * STRING METHODS:
 * - .trim() removes leading/trailing whitespace
 * - .split(/\s+/) splits on one or more spaces (handles double spaces)
 * - .toUpperCase() converts first character to uppercase
 *
 * CONDITIONAL: Returns "?" if name is empty/null.
 * Loops at most 2 times (first name + last name initials).
 *
 * @param {string} name — Full name string
 * @returns {string} — 1-2 character initials
 */
function getInitials(name) {
  if (!name) return "?"; // Guard clause for null/undefined
  // Split by one or more whitespace characters, take first 2 words
  const parts = name.trim().split(/\s+/);
  let initials = "";
  // Loop: extract first character of each word, up to 2 words
  for (let i = 0; i < parts.length && i < 2; i++) {
    if (parts[i]) initials += parts[i][0].toUpperCase();
  }
  return initials;
}

/**
 * avatarShades — Array of RGBA color strings for avatar backgrounds.
 * Different shades of white at varying opacity for visual variety.
 */
const avatarShades = [
  "rgba(255,255,255,0.12)",
  "rgba(255,255,255,0.18)",
  "rgba(255,255,255,0.24)",
  "rgba(255,255,255,0.30)",
];

/**
 * getAvatarColor — Deterministically picks an avatar color based on the name.
 * Uses a simple hash function so the same name always gets the same color.
 *
 * @param {string} name — Student's full name
 * @returns {string} — RGBA color string
 */
function getAvatarColor(name) {
  let hash = 0;
  // Simple hash: sum character codes with bit shifting
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Modulo ensures index is within array bounds
  return avatarShades[Math.abs(hash) % avatarShades.length];
}

/**
 * StudentDashboard — Main table component.
 *
 * PROPS (Object):
 * - students: Array<Object> — filtered and sorted student objects
 * - onEditClick: function — callback when edit button is clicked
 * - onDeleteClick: function — callback when delete button is clicked
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */
function StudentDashboard({ students, onEditClick, onDeleteClick }) {
  return (
    <div className="dashboard" id="students">
      {/* Section Header */}
      <div className="dashboard-header">
        <h2 className="section-title">Student Records</h2>
        {/* CONDITIONAL: "student" vs "students" based on count */}
        <p className="section-subtitle">
          Showing {students.length} student{students.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Glass Container with Table */}
      <div className="table-container glass">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Course</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/*
              AnimatePresence + .map() — renders each student as a table row.
              mode="popLayout" removes exiting rows from layout flow immediately,
              so remaining rows animate to their new positions smoothly.
              key={student.id} is REQUIRED — React uses it to track which
              rows were added/removed for correct exit animations.
            */}
            <AnimatePresence mode="popLayout">
              {students.map((student) => (
                <motion.tr
                  key={student.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* ID column — displays with # prefix */}
                  <td className="cell-id">{student.id}</td>

                  {/* Name column — avatar circle with initials + full name */}
                  <td>
                    <div className="name-cell">
                      <span
                        className="avatar"
                        style={{ backgroundColor: getAvatarColor(student.fullName) }}
                      >
                        {getInitials(student.fullName)}
                      </span>
                      <span className="student-name">{student.fullName}</span>
                    </div>
                  </td>

                  {/* Age, Email, Course columns */}
                  <td>{student.age}</td>
                  <td className="cell-email">{student.email}</td>
                  <td className="cell-course">{student.course}</td>

                  {/* Status — CONDITIONAL: enrolled vs not-enrolled styling */}
                  <td>
                    <span
                      className={`status-badge ${
                        student.isEnrolled ? "enrolled" : "not-enrolled"
                      }`}
                    >
                      {student.isEnrolled ? "Enrolled" : "Not Enrolled"}
                    </span>
                  </td>

                  {/* Actions — Edit and Delete buttons */}
                  <td>
                    <div className="actions">
                      <motion.button
                        className="btn-icon"
                        onClick={() => onEditClick(student)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Edit ${student.fullName}`}
                      >
                        <LuPencil size={16} />
                      </motion.button>
                      <motion.button
                        className="btn-icon btn-icon-danger"
                        onClick={() => onDeleteClick(student)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Delete ${student.fullName}`}
                      >
                        <LuTrash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {/* EMPTY STATE — CONDITIONAL: shown only when no students match */}
        {students.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LuSearchX size={48} className="empty-icon" />
            <p className="empty-title">No students found</p>
            <p className="empty-subtitle">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
