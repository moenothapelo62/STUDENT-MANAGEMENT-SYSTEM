import { motion, AnimatePresence } from "motion/react";
import {
  LuLayoutDashboard,
  LuUsers,
  LuPlus,
  LuChevronsLeft,
  LuChevronsRight,
  LuX,
} from "react-icons/lu";

// My left side menu. It has Dashboard and Students.
function DashboardMenu({
  activeView,
  onNavigate,
  studentCount,
  enrolledCount,
  collapsed,
  onToggleCollapse,
  onAddClick,
  mobileOpen,
  onCloseMobile,
}) {
  // Percent enrolled for the ring
  const pct =
    studentCount > 0 ? Math.round((enrolledCount / studentCount) * 100) : 0;
  // Ring size maths
  const R = 22;
  const C = 2 * Math.PI * R;

  // My two menu buttons
  const items = [
    {
      id: "dashboard",
      label: "Dashboard",
      hint: "Overview & insights",
      icon: LuLayoutDashboard,
      shortcut: "1",
    },
    {
      id: "students",
      label: "Students",
      hint: `${studentCount} records`,
      icon: LuUsers,
      shortcut: "2",
      badge: studentCount,
    },
  ];

  // Go to the page and close the phone menu
  const handleNavigate = (id) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  const menuBody = (
    <>
      {!collapsed && <p className="side-label">Menu</p>}

      <nav className="side-nav">
        {items.map((item) => {
          const active = activeView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`side-item ${active ? "active" : ""} ${
                collapsed ? "is-collapsed" : ""
              }`}
              onClick={() => handleNavigate(item.id)}
              title={collapsed ? `${item.label} (${item.shortcut})` : ""}
            >
              {active && (
                <motion.span
                  className="side-pill"
                  layoutId="side-active-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="side-item-icon">
                <Icon size={19} />
              </span>
              {!collapsed && (
                <span className="side-item-text">
                  <span className="side-item-label">{item.label}</span>
                  <span className="side-item-hint">{item.hint}</span>
                </span>
              )}
              {!collapsed && item.badge !== undefined && (
                <span className="side-badge">{item.badge}</span>
              )}
              {!collapsed && <kbd className="side-kbd">{item.shortcut}</kbd>}
              {collapsed && active && <span className="side-dot" />}
            </button>
          );
        })}
      </nav>

      <div className="side-action">
        <motion.button
          className={`side-add ${collapsed ? "is-collapsed" : ""}`}
          onClick={onAddClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          title="Add student"
        >
          <LuPlus size={18} />
          {!collapsed && <span>New Student</span>}
        </motion.button>
      </div>

      <div className={`side-footer ${collapsed ? "is-collapsed" : ""}`}>
        <div className="ring-wrap">
          <svg viewBox="0 0 56 56" className="ring-svg">
            <circle cx="28" cy="28" r={R} className="ring-track" />
            <motion.circle
              cx="28"
              cy="28"
              r={R}
              className="ring-fill"
              strokeDasharray={C}
              initial={false}
              animate={{ strokeDashoffset: C - (C * pct) / 100 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <span className="ring-pct">{pct}%</span>
        </div>
        {!collapsed && (
          <div className="ring-text">
            <span className="ring-title">Enrolled</span>
            <span className="ring-sub">
              {enrolledCount}/{studentCount} active
            </span>
          </div>
        )}
      </div>

      <button
        className="side-collapse"
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
      >
        {collapsed ? (
          <LuChevronsRight size={16} />
        ) : (
          <LuChevronsLeft size={16} />
        )}
        {!collapsed && <span>Collapse</span>}
      </button>
    </>
  );

  return (
    <>
      <motion.aside
        className={`sidebar glass ${collapsed ? "collapsed" : ""}`}
        initial={{ x: -90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {menuBody}
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="side-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
            />
            <motion.aside
              className="sidebar mobile-open glass"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <button
                className="side-close"
                onClick={onCloseMobile}
                aria-label="Close menu"
              >
                <LuX size={18} />
              </button>
              {menuBody}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default DashboardMenu;
