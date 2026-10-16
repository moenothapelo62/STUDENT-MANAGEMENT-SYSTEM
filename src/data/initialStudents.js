// Create an array (list) called "initialStudents" that holds student objects
const initialStudents = [
  
 
  // Each object represents ONE student with their details
  {
    id: 1,                                              // Unique number to identify this student
    fullName: "Thabo Molefe",                           // Student's full name (text/string)
    age: 21,                                            // Student's age (number)
    email: "thabomolefe@gmail.com",                     // Student's email address
    course: "Diploma in Information Technology",        // Course the student is studying
    isEnrolled: true,                                   // true = student is currently enrolled
  },

  // Second student object
  {
    id: 2,
    fullName: "Lerato Nkosi",
    age: 19,
    email: "leratonkosi@gmail.com",
    course: "Diploma in Business Information Technology",
    isEnrolled: true,
  },

  // Third student object
  {
    id: 3,
    fullName: "Neo Mokoena",
    age: 22,
    email: "neomokoena@gmail.com",
    course: "Diploma in Information Technology",
    isEnrolled: false,                                  // false = student is NOT enrolled
  },
];

// "export default" means this is the main thing being shared from this file
export default initialStudents;