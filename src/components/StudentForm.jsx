/**
 * StudentForm Component
 *
 * A reusable form modal for adding and editing student records.
 * Demonstrates: React state, event handling, form validation,
 * controlled inputs, and conditional rendering.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuUser, LuCalendar, LuMail, LuBookOpen } from "react-icons/lu";

/**
 * StudentForm — Form component for adding/editing a student.
 *
 * FUNCTION PARAMS (destructured from props Object):
 * - initialData: Object | null — student data for edit mode, null for add mode
 * - onSubmit: function — callback with form data when valid
 * - onCancel: function — callback to close without saving
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */
function StudentForm({ initialData, onSubmit, onCancel }) {
  // OBJECT: Default empty form values
  // DATA TYPES: strings (fullName, age, email, course) + boolean (isEnrolled)
  // Using const — we never reassign emptyForm, only read from it
  const emptyForm = {
    fullName: "",   // string — starts empty, filled by user input
    age: "",        // string initially (input type=string), converted to number on submit
    email: "",      // string — validated with regex
    course: "",     // string — required field
    isEnrolled: false, // boolean — toggle switch, default not enrolled
  };

  // STATE: formData holds the current values of all form fields
  // Initialized with emptyForm for add mode, or student data for edit mode
  const [formData, setFormData] = useState(emptyForm);

  // STATE: errors is an object with keys matching field names
  // Each value is a string error message (or undefined if no error)
  const [errors, setErrors] = useState({});

  /**
   * useEffect — Resets form when initialData changes (add → edit or edit → edit different).
   * If initialData exists (edit mode), populate form with student data.
   * Otherwise (add mode), reset to empty form.
   */
  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Populate with existing student data
    } else {
      setFormData(emptyForm);   // Reset to empty for new student
    }
  }, [initialData]);

  /**
   * handleChange — Updates form data when any input changes.
   *
   * EVENT HANDLING: e.target contains name, value, type, and checked properties.
   *
   * CONDITIONAL: Checkboxes store boolean (checked), other inputs store string (value).
   *
   * IMMUTABLE UPDATE: Spread operator creates a new object to avoid direct mutation.
   *
   * CLEAR ERROR: When user fixes a field, remove its error message immediately.
   *
   * @param {Event} e — The change event from the input element
   */
  function handleChange(e) {
    // Destructure properties from the event target
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,                              // Keep all other fields unchanged
      [name]: type === "checkbox" ? checked : value, // Update only the changed field
    }));
    // CONDITIONAL: Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  /**
   * validate — Checks all form fields for errors.
   *
   * RETURNS: An object where keys are field names and values are error strings.
   * Empty object {} means no errors (form is valid).
   *
   * VALIDATION RULES:
   * - fullName: required (must not be empty after trimming whitespace)
   * - age: required, must be a positive number (> 0)
   * - email: required, must match email format using regex
   * - course: required (must not be empty)
   *
   * @returns {Object} — { fieldName: "error message", ... } or {} if valid
   */
  function validate() {
    const newErrors = {}; // Start with empty object — no errors yet

    // FULL NAME: Check if empty after removing whitespace
    // .trim() removes leading/trailing spaces; empty string is falsy
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // AGE: Two checks — first if empty, then if not a positive number
    // isNaN() checks if value is "Not a Number"
    // Number() converts string to number for comparison
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    // EMAIL: Two checks — first if empty, then regex pattern match
    // Regex \S+@\S+\.\S+ means: one or more non-space chars, @, non-space, dot, non-space
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // COURSE: Required field check
    if (!formData.course.trim()) {
      newErrors.course = "Course is required";
    }

    return newErrors; // Return the errors object (may be empty)
  }

  /**
   * handleSubmit — Processes form submission.
   *
   * EVENT HANDLING: preventDefault() stops the browser's default form submission
   * (which would reload the page). We handle everything in React instead.
   *
   * CONDITIONAL: If validation fails, show errors and stop.
   * If valid, convert age from string to number and call onSubmit.
   *
   * TYPE CONVERSION: age is stored as string in the form (HTML input),
   * but needs to be a number in the data model for sorting/averaging.
   *
   * @param {Event} e — The submit event
   */
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    const validationErrors = validate();

    // CONDITIONAL: If errors object has any keys, form is invalid
    // .length > 0 means at least one field failed validation
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show error messages under each field
      return; // Stop — do not submit
    }

    // Form is valid — clear errors and submit data
    setErrors({});
    onSubmit({
      ...formData,                      // Spread all form fields
      age: Number(formData.age),        // Convert age from string to number
    });
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      {/* 
        noValidate disables browser's default validation messages.
        We use our own validate() function for consistent, styled error messages.
      */}

      {/* FULL NAME FIELD */}
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
        {/* CONDITIONAL RENDERING: Only show error if it exists */}
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

      {/* AGE FIELD */}
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

      {/* EMAIL FIELD */}
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

      {/* COURSE FIELD */}
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

      {/* ENROLLMENT STATUS — Custom toggle switch */}
      <div className="form-group">
        <label>Enrollment Status</label>
        <button
          type="button"
          className={`toggle ${formData.isEnrolled ? "active" : ""}`}
          onClick={() =>
            // IMMUTABLE UPDATE: Toggle boolean, create new object
            setFormData((prev) => ({ ...prev, isEnrolled: !prev.isEnrolled }))
          }
          role="switch"
          aria-checked={formData.isEnrolled}
        >
          <span className="toggle-slider" />
        </button>
        <span className="toggle-label">
          {/* CONDITIONAL: Show text based on boolean value */}
          {formData.isEnrolled ? "Enrolled" : "Not Enrolled"}
        </span>
      </div>

      {/* FORM ACTION BUTTONS */}
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
          {/* CONDITIONAL TEXT: Different label for add vs edit mode */}
          {initialData ? "Update Student" : "Save Student"}
        </motion.button>
      </div>
    </form>
  );
}

export default StudentForm;
