import { motion } from "motion/react";
import { LuTriangleAlert } from "react-icons/lu";

function DeleteConfirmModal({ isOpen, student, onConfirm, onCancel }) {
  if (!isOpen || !student) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onCancel}
    >
      <motion.div
        className="modal-content glass modal-sm"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-body delete-body">
          <motion.div
            className="delete-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          >
            <LuTriangleAlert size={32} />
          </motion.div>
          <h3 className="delete-title">Delete Student</h3>
          <p className="delete-text">
            Are you sure you want to delete{" "}
            <strong>{student.fullName}</strong>?
          </p>
          <p className="warning-text">This action cannot be undone.</p>
          <div className="form-actions">
            <motion.button
              className="btn btn-ghost"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              className="btn btn-danger"
              onClick={onConfirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Yes, Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeleteConfirmModal;
