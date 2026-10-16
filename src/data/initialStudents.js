// Create an array (list) called "initialStudents" that holds student objects
const initialStudents = [
  
 
  // Each object represents ONE student with their details
  {
    id: 1,                                              
    fullName: "Thabo Molefe",                           
    age: 21,                                            
    email: "thabomolefe@gmail.com",                     
    course: "Diploma in Information Technology",        
    isEnrolled: true,                                   
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

export default initialStudents;