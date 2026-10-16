import { motion } from "motion/react";
import { LuTrendingUp, LuBookOpen, LuClock, LuArrowRight } from "react-icons/lu";

// This is what shows on the Dashboard page.
// It counts top courses and shows the newest students.
// The buttons take you to the Students page.
function DashboardOverview({ students, onViewStudents, onAddClick }) {
  const total = students.length;
  const enrolled = students.filter((s) => s.isEnrolled).length;

  // I count how many students are in each course
  const courseMap = {};
  for (const s of students) {
    const key = (s.course || "Undeclared").trim() || "Undeclared";
    courseMap[key] = (courseMap[key] || 0) + 1;
  }
  const courses = Object.entries(courseMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCourse = courses.length > 0 ? courses[0][1] : 1;

  // My 4 newest students 
  const recent = [...students].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="dash-view">
      <motion.div
        className="dash-hero glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="dash-eyebrow">
            <LuTrendingUp size={13} /> Live overview
          </p>
          <h2 className="dash-hero-title">
            Welcome back — {enrolled} of {total} students enrolled
          </h2>
          <p className="dash-hero-sub">
            Track enrollment, top courses and the latest records at a glance.
          </p>
          <div className="dash-hero-actions">
            <button className="btn btn-primary" onClick={onViewStudents}>
              View Students <LuArrowRight size={15} />
            </button>
            <button className="btn btn-ghost" onClick={onAddClick}>
              Add Student
            </button>
          </div>
        </div>
        <div className="dash-hero-orb" aria-hidden="true" />
      </motion.div>

      <div className="dash-grid">
        {/* Which courses have most students */}
        <motion.div
          className="dash-card glass"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          <div className="dash-card-head">
            <span className="dash-card-icon">
              <LuBookOpen size={17} />
            </span>
            <div>
              <h3>Top Courses</h3>
              <p>By student count</p>
            </div>
          </div>
          {courses.length === 0 && (
            <p className="dash-muted">No course data yet.</p>
          )}
          <div className="course-bars">
            {courses.map(([name, count]) => (
              <div key={name} className="course-row">
                <div className="course-meta">
                  <span className="course-name">{name}</span>
                  <span className="course-count">{count}</span>
                </div>
                <div className="course-track">
                  <motion.div
                    className="course-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCourse) * 100}%` }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newest students list */}
        <motion.div
          className="dash-card glass"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5 }}
        >
          <div className="dash-card-head">
            <span className="dash-card-icon">
              <LuClock size={17} />
            </span>
            <div>
              <h3>Recently Added</h3>
              <p>Latest {recent.length} records</p>
            </div>
          </div>
          {recent.length === 0 && (
            <p className="dash-muted">No students yet — add your first one.</p>
          )}
          <ul className="recent-list">
            {recent.map((s) => (
              <li key={s.id} className="recent-row">
                <span className="recent-id">#{s.id}</span>
                <span className="recent-name">{s.fullName}</span>
                <span
                  className={`status-badge ${
                    s.isEnrolled ? "enrolled" : "not-enrolled"
                  }`}
                >
                  {s.isEnrolled ? "Enrolled" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
          <button className="dash-link" onClick={onViewStudents}>
            Open full student list <LuArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardOverview;
