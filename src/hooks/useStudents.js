/**
 * useStudents Hook
 *
 * Central state management hook for the Student Management System.
 * Demonstrates: useState, useEffect, useMemo, useCallback, localStorage,
 * CRUD operations, array methods, arrow functions, and conditional logic.
 */
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import initialStudents from "../data/initialStudents";

// CONSTANT: Using const because the key string never changes.
// A constant prevents accidental reassignment of the storage key.
const STORAGE_KEY = "students";

/*
 * VAR DEMONSTRATION (for educational purposes):
 *
 * var is function-scoped, meaning it's accessible throughout the entire
 * function regardless of where it's declared. This can cause bugs.
 *
 * Example:
 *   function example() {
 *     var x = 1;
 *     if (true) {
 *       var x = 2;  // Same variable! Reassigns the outer x.
 *     }
 *     console.log(x); // 2 (not 1 as you might expect)
 *   }
 *
 * In modern JavaScript, we use let and const instead:
 *   - const: block-scoped, cannot be reassigned (used for most variables here)
 *   - let: block-scoped, can be reassigned (used for loop counters, accumulators)
 *   - var: function-scoped, can be reassigned (AVOID — legacy behavior)
 *
 * This application uses const and let exclusively.
 */

/**
 * loadStudents — Reads student data from localStorage.
 *
 * VARIABLE DECLARATIONS:
 * - `saved` uses let because we check if it exists (could be null or string)
 * - `parsed` would use const since it's assigned once
 *
 * DATA TYPES:
 * - localStorage.getItem() returns string | null
 * - JSON.parse() converts the string back to an Array of student Objects
 *
 * @returns {Array<Object>} Array of student objects
 */
function loadStudents() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY); // string | null
    // Ternary operator: if saved exists, parse it; otherwise use default array
    return saved ? JSON.parse(saved) : initialStudents;
  } catch {
    // If JSON is corrupted, fall back to the default student array
    return initialStudents;
  }
}

/**
 * useStudents — Custom React hook managing all student state and operations.
 *
 * REACT STATE (useState):
 * Each piece of state uses useState, which returns [value, setterFunction].
 * We use const because we never reassign the destructured variables directly.
 *
 * @returns {Object} All state values, setters, and CRUD handler functions
 */
export function useStudents() {
  // ARRAY STATE: students is an array of objects, initialized from localStorage
  // Using const — the variable binding never changes, only the array contents
  const [students, setStudents] = useState(loadStudents);

  // STRING STATES: search, statusFilter, sortBy — all strings with specific values
  const [search, setSearch] = useState("");           // string — current search text
  const [statusFilter, setStatusFilter] = useState("all"); // string — "all" | "enrolled" | "not-enrolled"
  const [sortBy, setSortBy] = useState("id");           // string — sort field name

  // BOOLEAN STATES: Modal open/close flags — true = open, false = closed
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);    // boolean
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // boolean
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // boolean

  // OBJECT STATE: selectedStudent holds a single student object or null
  // null = no student selected for edit/delete
  const [selectedStudent, setSelectedStudent] = useState(null);

  /**
   * useEffect — Persists students to localStorage whenever the array changes.
   * This is a side effect: it runs after render, not during.
   * Dependency array [students] means it only runs when students changes.
   */
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  /**
   * handleAddStudent — Adds a new student to the array.
   *
   * FUNCTION PARAMETERS: newStudent is an Object with fullName, age, email,
   * course, and isEnrolled properties.
   *
   * ARRAY METHODS USED:
   * - .map() — transforms each student to its id
   * - Math.max() — finds the highest existing ID
   * - Spread operator [...prev] — creates a new array (immutable update)
   *
   * CONDITIONAL: Uses ternary to handle empty array case (default to id 1)
   *
   * @param {Object} newStudent — The student data from the form
   * @returns {void}
   */
  const handleAddStudent = useCallback(
    (newStudent) => {
      // Calculate next ID: if array has items, find max id and add 1; otherwise start at 1
      const newId =
        students.length > 0
          ? Math.max(...students.map((s) => s.id)) + 1
          : 1;
      // Immutable update: spread old array, append new object with computed id
      setStudents((prev) => [...prev, { ...newStudent, id: newId }]);
      setIsAddModalOpen(false); // Close the modal (boolean state change)
      toast.success("Student added successfully");
    },
    [students] // Dependency: needs current students to calculate next ID
  );

  /**
   * handleEditStudent — Replaces an existing student in the array.
   *
   * ARRAY METHOD: .map() — iterates and replaces the matching student.
   * CONDITIONAL: Ternary checks if id matches; if yes, replace; if no, keep original.
   *
   * @param {Object} updatedStudent — The modified student data
   * @returns {void}
   */
  const handleEditStudent = useCallback((updatedStudent) => {
    // .map() creates a new array; ternary conditionally replaces the matching student
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    setIsEditModalOpen(false);   // Close modal
    setSelectedStudent(null);    // Clear selection (set to null)
    toast.success("Student updated successfully");
  }, []); // No external dependencies needed — uses functional setState

  /**
   * handleDeleteStudent — Removes a student from the array.
   *
   * ARRAY METHOD: .filter() — keeps only students whose id does NOT match.
   * CONDITIONAL: Early return if selectedStudent is null (safety check).
   *
   * @returns {void}
   */
  const handleDeleteStudent = useCallback(() => {
    // Guard clause: prevent errors if no student is selected
    if (!selectedStudent) return;
    // .filter() returns a new array excluding the matching student
    setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
    setIsDeleteModalOpen(false);  // Close modal
    const name = selectedStudent.fullName; // Store name before clearing
    setSelectedStudent(null);     // Clear selection
    toast.success(`Deleted ${name}`);
  }, [selectedStudent]); // Dependency: needs the selected student's id

  /**
   * openEditModal — Sets the selected student and opens the edit modal.
   * Arrow function (shorter syntax) — no return needed for single expression.
   *
   * @param {Object} student — The student object to edit
   */
  const openEditModal = useCallback((student) => {
    setSelectedStudent(student);  // Store student object for the form
    setIsEditModalOpen(true);    // Open the modal (boolean)
  }, []);

  /**
   * openDeleteModal — Sets the selected student and opens the delete modal.
   * @param {Object} student — The student object to delete
   */
  const openDeleteModal = useCallback((student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  }, []);

  /**
   * filteredSortedStudents — Computed (memoized) list of students after search,
   * filter, and sort operations.
   *
   * useMemo: Prevents recalculating on every render — only recalculates
   * when students, search, statusFilter, or sortBy changes.
   *
   * ARRAY METHODS CHAINED:
   * 1. .filter() — removes students that don't match search/status
   * 2. .sort() — orders the filtered results
   *
   * CONDITIONALS: Ternary operators select the sort comparison function
   *
   * @returns {Array<Object>} Filtered and sorted array of student objects
   */
  const filteredSortedStudents = useMemo(() => {
    // STEP 1: Filter — keep only students matching search text AND status filter
    const result = students.filter((s) => {
      // Convert search text to lowercase for case-insensitive comparison
      const text = search.toLowerCase();
      // .includes() checks if fullName or email contains the search text
      const matchesSearch =
        s.fullName.toLowerCase().includes(text) ||
        s.email.toLowerCase().includes(text);

      // CONDITIONAL: Check enrollment status filter
      // Default is true (matches all); only restrict if filter is set
      let matchesStatus = true;
      if (statusFilter === "enrolled") matchesStatus = s.isEnrolled;
      if (statusFilter === "not-enrolled") matchesStatus = !s.isEnrolled;

      return matchesSearch && matchesStatus; // Both must be true
    });

    // STEP 2: Sort — create a copy and sort by the selected field
    // Spread operator [...result] creates a shallow copy to avoid mutating original
    return [...result].sort((a, b) => {
      // TERNARY CHAIN: Select comparison based on sortBy value
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName); // string sort
      if (sortBy === "age") return Number(a.age) - Number(b.age);          // numeric sort
      if (sortBy === "course") return a.course.localeCompare(b.course);    // string sort
      return a.id - b.id; // Default: sort by id (number, ascending)
    });
  }, [students, search, statusFilter, sortBy]); // Recalculate only when these change

  // Return all state and functions as an object (non-primitive type)
  // This makes them available to any component that calls useStudents()
  return {
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
  };
}
