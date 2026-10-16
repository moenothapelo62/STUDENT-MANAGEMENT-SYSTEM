
  //Student form for Add and Edit.
 //I use strings for name/email/course, number for age, boolean for enrolled.
 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuUser, LuCalendar, LuMail, LuBookOpen } from "react-icons/lu";

// My form for adding a new student and editing an old one.
function StudentForm({ initialData, onSubmit, onCancel }) {
  // Empty boxes when adding. age starts as text because inputs give text.
  // isEnrolled is true/false for the switch.
  const emptyForm = {
    fullName: "",
    age: "",
    email: "",
    course: "",
    isEnrolled: false,
  };

  // What I typed + my error messages
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // When I click Edit, fill the boxes with that student
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  // Runs every time I type in a box
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Remove the error for this box once I start fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // I check everything here before saving
  function validate() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Age must be a number between 16 and 100 for college
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || Number(formData.age) < 16 || Number(formData.age) > 100) {
      newErrors.age = "Age must be between 16 and 100";
    }

    // Email must have @ and a dot
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course is required";
    }

    return newErrors;
  }

  // When I press Save: stop reload, check errors, then send up with age as number
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({
      ...formData,
      age: Number(formData.age),
    });
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <div className="form-input-wrapper">
          <LuUser className="form-input-icon" size={18} />
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>
        <AnimatePresence>
          {errors.fullName && (
            <motion.span
              className="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {errors.fullName}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <div className="form-input-wrapper">
          <LuCalendar className="form-input-icon" size={18} />
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="1"
          />
        </div>
        <AnimatePresence>
          {errors.age && (
            <motion.span
              className="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {errors.age}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="form-input-wrapper">
          <LuMail className="form-input-icon" size={18} />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.span
              className="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {errors.email}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="form-group">
        <label htmlFor="course">Course</label>
        <div className="form-input-wrapper">
          <LuBookOpen className="form-input-icon" size={18} />
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter course name"
          />
        </div>
        <AnimatePresence>
          {errors.course && (
            <motion.span
              className="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {errors.course}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="form-group">
        <label>Enrollment Status</label>
        <button
          type="button"
          className={`toggle ${formData.isEnrolled ? "active" : ""}`}
          onClick={() =>
            setFormData((prev) => ({ ...prev, isEnrolled: !prev.isEnrolled }))
          }
          role="switch"
          aria-checked={formData.isEnrolled}
        >
          <span className="toggle-slider" />
        </button>
        <span className="toggle-label">
          {formData.isEnrolled ? "Enrolled" : "Not Enrolled"}
        </span>
      </div>

      <div className="form-actions">
        <motion.button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="btn btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {initialData ? "Update Student" : "Save Student"}
        </motion.button>
      </div>
    </form>
  );
}

export default StudentForm;
