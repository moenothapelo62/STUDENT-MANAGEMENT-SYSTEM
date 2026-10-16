import { useEffect, useRef } from "react";
import { motion, animate } from "motion/react";
import { LuUsers, LuUserCheck, LuUserX, LuCalendar } from "react-icons/lu";

// Small number that counts up when the value changes, looks nice
function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const prevValue = useRef(0);

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v);
      },
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>0</span>;
}

// Cards slide in one by one (i is the card number)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Four small cards: total, enrolled, not enrolled, average age
function StudentStatsCards({ students }) {
  // I used let here because the numbers change inside the loop
  let enrolled = 0;
  let ageTotal = 0;
  for (const s of students) {
    if (s.isEnrolled) enrolled++;
    ageTotal += Number(s.age) || 0;
  }
  const notEnrolled = students.length - enrolled;
  const averageAge =
    students.length > 0 ? Math.round(ageTotal / students.length) : 0;

  const stats = [
    { icon: LuUsers, label: "Total Students", value: students.length },
    { icon: LuUserCheck, label: "Enrolled", value: enrolled },
    { icon: LuUserX, label: "Not Enrolled", value: notEnrolled },
    { icon: LuCalendar, label: "Average Age", value: averageAge },
  ];

  return (
    <div className="stats-grid" id="stats">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="stat-card glass"
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.15)" }}
        >
          <div className="stat-icon">
            <stat.icon size={20} />
          </div>
          <span className="stat-value">
            <AnimatedNumber value={stat.value} />
          </span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default StudentStatsCards;
