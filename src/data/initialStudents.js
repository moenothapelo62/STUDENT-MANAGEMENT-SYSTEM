/**
 * Initial Student Data
 *
 * DATA TYPES USED:
 * - Object: Each student is an object (non-primitive type) with key-value pairs
 * - number: id and age use the numeric data type for arithmetic operations
 * - string: fullName, email, and course use the string data type for text
 * - boolean: isEnrolled uses true/false for binary enrollment status
 * - Array: initialStudents is an array (non-primitive) holding all student objects
 *
 * WHY THESE TYPES:
 * - id is a number because we use Math.max() for ID generation
 * - age is a number because we sort numerically and calculate averages
 * - isEnrolled is a boolean because it's a binary state (true/false)
 * - Array is used because it allows .filter(), .map(), .sort() methods
 */

// Using const because the array reference should never be reassigned.
// The contents can still be mutated (push, splice), but we use immutable
// patterns (spread operator, filter, map) in the hook instead.
const initialStudents = [
  {
    id: 1,                    // number — unique identifier for each student
    fullName: "Thabo Molefe",  // string — student's full name
    age: 21,                   // number — used for sorting and average calculation
    email: "thabo.molefe@example.com",  // string — used for search filtering
    course: "Diploma in Information Technology",  // string — used for sorting
    isEnrolled: true,          // boolean — true = enrolled, false = not enrolled
  },
  {
    id: 2,
    fullName: "Lerato Nkosi",
    age: 19,
    email: "lerato.nkosi@example.com",
    course: "Diploma in Business Information Technology",
    isEnrolled: true,
  },
  {
    id: 3,
    fullName: "Neo Mokoena",
    age: 22,
    email: "neo.mokoena@example.com",
    course: "Diploma in Information Technology",
    isEnrolled: false,
  },
];

export default initialStudents;
