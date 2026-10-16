// My main hook. It keeps all student data and all the add/edit/delete functions.
// I use const for things I never reassign, let for things that change (like counters).
// I used var only in the small demo at the bottom, because var is old
// and can cause bugs (it does not respect block scope like let does).
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import initialStudents from "../data/initialStudents";

// The key I save under in localStorage. const because it never changes.
const STORAGE_KEY = "students";

// Read my saved students when the app starts
function loadStudents() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    // If I saved before, use that. If not, use the 3 starter students.
    return saved ? JSON.parse(saved) : initialStudents;
  } catch {
    return initialStudents;
  }
}

export function useStudents() {
  // My student list. It is an array of objects.
  const [students, setStudents] = useState(loadStudents);

  // Search text and dropdowns, all strings
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");

  // Which popup is open, true/false
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // The student I clicked Edit or Delete on. null means none.
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Save to localStorage every time my list changes, so refresh keeps data
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // Add: I find the biggest id and +1, then add to the end of the array
  const handleAddStudent = useCallback(
    (newStudent) => {
      const newId =
        students.length > 0
          ? Math.max(...students.map((s) => s.id)) + 1
          : 1;
      setStudents((prev) => [...prev, { ...newStudent, id: newId }]);
      setIsAddModalOpen(false);
      toast.success("Student added successfully");
    },
    [students]
  );

  // Edit: I loop with map and swap only the one with the same id
  const handleEditStudent = useCallback((updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    setIsEditModalOpen(false);
    setSelectedStudent(null);
    toast.success("Student updated successfully");
  }, []);

  // Delete: I keep everyone except the selected one
  const handleDeleteStudent = useCallback(() => {
    if (!selectedStudent) return;
    setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
    setIsDeleteModalOpen(false);
    const name = selectedStudent.fullName;
    setSelectedStudent(null);
    toast.success(`Deleted ${name}`);
  }, [selectedStudent]);

  // Open the edit popup with this student inside
  const openEditModal = useCallback((student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  }, []);

  // Open the delete popup with this student inside
  const openDeleteModal = useCallback((student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  }, []);

  // My search + filter + sort. useMemo means it only runs again when these change.
  const filteredSortedStudents = useMemo(() => {
    // First keep only matching students
    const result = students.filter((s) => {
      const text = search.toLowerCase();
      const matchesSearch =
        s.fullName.toLowerCase().includes(text) ||
        s.email.toLowerCase().includes(text);

      let matchesStatus = true;
      if (statusFilter === "enrolled") matchesStatus = s.isEnrolled;
      if (statusFilter === "not-enrolled") matchesStatus = !s.isEnrolled;

      return matchesSearch && matchesStatus;
    });

    // Then sort a copy of that list
    return [...result].sort((a, b) => {
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      if (sortBy === "age") return Number(a.age) - Number(b.age);
      if (sortBy === "course") return a.course.localeCompare(b.course);
      return a.id - b.id;
    });
  }, [students, search, statusFilter, sortBy]);

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

// Small demo of var vs let vs const for class.
// var is function scoped, let and const are block scoped.
// I only use var here to show I know the difference.
// In my real app above I use const and let.
export function demoVariableScopes() {
  let result = "const stays same, let can change, ";
  if (true) {
    var oldStyle = "var leaks out of the block, ";
    let newStyle = "let stays in the block";
    result += newStyle;
  }
  result += oldStyle;
  return result;
}
