import { motion } from "motion/react";
import { LuGraduationCap, LuPlus } from "react-icons/lu";

function Navbar({ onAddClick, studentCount }) {
  return (
    <motion.nav
      className="navbar glass"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar-inner">
        <motion.a
          href="#"
          className="navbar-logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="logo-icon">
            <LuGraduationCap size={22} />
          </span>
          <span className="logo-text">Student Management System</span>
        </motion.a>

        <div className="navbar-links">
          <a href="#stats" className="nav-link">
            Overview
          </a>
          <a href="#students" className="nav-link">
            Students
            <span className="nav-badge">{studentCount}</span>
          </a>
        </div>

        <motion.button
          className="btn-add"
          onClick={onAddClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LuPlus size={18} />
          <span>Add Student</span>
        </motion.button>
      </div>
      <div className="navbar-glow" />
    </motion.nav>
  );
}

export default Navbar;
