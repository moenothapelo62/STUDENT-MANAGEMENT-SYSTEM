import { motion, AnimatePresence } from "motion/react";
import { LuPencil, LuTrash2, LuSearchX } from "react-icons/lu";

// How each table row moves in and out
const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

// I take the first letters of the name for the circle, e.g. "Thabo Molefe" -> "TM"
function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  let initials = "";
  for (let i = 0; i < parts.length && i < 2; i++) {
    if (parts[i]) initials += parts[i][0].toUpperCase();
  }
  return initials;
}

// Just 4 background colours for the circles
const avatarShades = [
  "rgba(255,255,255,0.12)",
  "rgba(255,255,255,0.18)",
  "rgba(255,255,255,0.24)",
  "rgba(255,255,255,0.30)",
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarShades[Math.abs(hash) % avatarShades.length];
}

// students = my filtered list, the two functions handle edit and delete clicks.
function StudentDashboard({ students, onEditClick, onDeleteClick }) {
  return (
    <div className="dashboard" id="students">
      <div className="dashboard-header">
        <h2 className="section-title">Student Records</h2>
        <p className="section-subtitle">
          Showing {students.length} student{students.length !== 1 ? "s" : ""}
        </p>
      </div>

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
                  <td className="cell-id">{student.id}</td>
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
                  <td>{student.age}</td>
                  <td className="cell-email">{student.email}</td>
                  <td className="cell-course">{student.course}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        student.isEnrolled ? "enrolled" : "not-enrolled"
                      }`}
                    >
                      {student.isEnrolled ? "Enrolled" : "Not Enrolled"}
                    </span>
                  </td>
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
