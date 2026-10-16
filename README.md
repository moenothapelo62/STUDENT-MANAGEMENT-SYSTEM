STUDENT MANAGEMENT SYSTEM
 DIWA2110 – Web Application Development


Student Name: THAPELO MOENO 
Programme: Diploma in Business Information Technology  
Institution: Limkokwing University of Creative Technology, Lesotho
Student Number: 901020404
Individual Assignment


 1. Introduction

For my DIWA2110 Web Application Development assignment, I developed a Student Management System using React and JavaScript. I chose to build this system to practise what I have learned in web development and to understand how a website can be used to manage information.

The system allows users to view student details, add new students, edit existing records and delete students when necessary. I also included search, filtering and sorting features to make it easier to find student information. Another important part of the project was making the website easy to use on both computers and mobile phones.

While working on this project, I gained practical experience with React components, JavaScript functions, form validation and managing data. I also learned how to upload my code to GitHub and publish the finished website using Netlify.

2. Objectives of the Project

The main aim of this project was to develop a working student management application using the programming skills I have learned.

The specific objectives were:

- To create a website for managing student records.
- To allow users to add, view, edit and delete student information.
- To check that the information entered into forms is valid.
- To make it easier to search for students and organize their records.
- To design a layout that works on computers and mobile phones.
- To practise using JavaScript and React in a real project.
- To save student information so that it remains available after refreshing the page.

3. Technologies Used

I used several technologies to develop the Student Management System.

React: I used React to build the different parts of the website. It helped me divide the application into smaller components and update the screen when student information changed.

JavaScript: JavaScript was used to make the application interactive. I used it to manage student records, check form inputs and implement the search, filtering and sorting features.

HTML and JSX: HTML provides the basic structure of a web page, while JSX allows me to write the interface inside React components.

CSS: I used CSS to improve the appearance of the website. It was used for the dashboard, student table, forms, buttons, popup windows and mobile layout.

Vite:Vite helped me run the application while developing it and prepare the files needed for deployment.

Local Storage: I used browser local storage to save student records. This means the information can remain available after refreshing the page in the same browser.

GitHub:I uploaded my source code to GitHub so that the project could be stored online and accessed when needed.

Netlify: I used Netlify to publish the application. This allowed me to open the website through a public link instead of running it only on my computer.

 4. Features of the System

4.1 Dashboard and Navigation

The application has two main sections: Dashboard and Students. The navigation menu allows users to move between these sections.

I also included an option to fold the menu when more screen space is needed. The application supports keyboard shortcuts using the number keys 1 and 2 to switch between pages. On a phone, the menu opens as a slide-in panel to make navigation easier on a smaller screen.

4.2 Viewing Student Records

The Students page displays student information in a table. The information includes the student ID, full name, age, email address, course and enrollment status.

Each student record has options for editing and deleting. This makes it possible to manage student information directly from the table.

4.3 Adding a Student

When a user wants to register a student, they can open the add-student form and enter the required details. The form checks the information before saving it.

If the information is valid, the new student appears in the table immediately. The page does not need to be refreshed to show the new record.

4.4 Editing Student Information

The edit feature allows users to correct or update existing student details. When the edit button is clicked, the form opens with the selected student's information already filled in.

The user can change the necessary details and save the changes. If they decide not to continue, they can cancel the operation without changing the original record.

4.5 Deleting a Student

The application allows users to delete student records. Before the record is removed, a confirmation popup appears and asks the user to confirm the deletion.

I included this step to reduce the chances of deleting a student by mistake. If the user cancels, the record remains in the table.

 4.6 Searching, Filtering and Sorting

I added these features to make it easier to work with student records.

- Search: Users can search for students by name or email address.
- Filter:Users can display students according to their enrollment status.
- Sort: Users can arrange student records by ID, name, age or course.

These features are useful because they help users find specific information without having to go through every record manually.

4.7 Form Validation

Form validation was included to help prevent users from submitting incomplete or incorrect information.

The system checks that all required fields have been completed, that the student's age is between 16 and 100, and that the email address follows a basic email format.

If the user enters invalid information, an error message appears below the relevant field. The form cannot be submitted until the validation requirements are met.

 4.8 Saving Student Information

The application uses local storage to save student records in the browser. This allows the records to remain available after the page is refreshed.

However, local storage saves information on the current browser and device. It does not automatically share student records with other users or devices because the application does not use a shared database.

 5. JavaScript Concepts Used

During development, I applied several JavaScript concepts that I have studied in class.

5.1 Data Types

I used different data types depending on the information being stored.

- Strings were used for student names, email addresses and course names.
- Numbers were used for student IDs and ages.
- Booleans were used to represent whether a student is enrolled.
- Arrays were used to keep a list of student records.
- Objects were used to store the details of individual students and form information.

This helped me organize the information and work with it more easily.

 5.2 Variables

I used `const` for variables that did not need to be reassigned and `let` when a variable's value needed to change.

The project also contains a demonstration of `var` to show how its scope differs from `let` and `const`. In the main application code, I mainly used `let` and `const` because they make variable scope easier to manage.

5.3 Functions

Functions were used to carry out different tasks in the application. These included loading student records, validating forms, handling submissions and managing student information.

I also used arrow functions when working with event handlers and array methods. Using functions helped me separate different tasks and avoid repeating the same code unnecessarily.

5.4 Conditional Statements

I used `if` statements to check whether form information was valid and to decide what should happen next.

Conditional expressions were also used to display information depending on the application's current state. For example, the interface can display different labels or messages depending on the enrollment status or whether a validation error exists.

 5.5 Array Methods

Array methods helped me work with student records.

- `map()` was used to display or transform student information.
- `filter()` was used to find matching students and remove records.
- `sort()` was used to arrange student records.
- `includes()` was used to check whether search text matched part of a value.

These methods made it easier to manage the student list.

 5.6 React Components and State

I divided the application into smaller React components instead of putting all the code into one large file. Each component handles a particular part of the system, such as the dashboard, student table, form or popup window.

I used the `useState` hook to manage information that changes while the application is running. The `useEffect` hook was used for tasks such as saving records to local storage and handling keyboard shortcuts. I also used `useMemo` to help calculate filtered student lists and `useCallback` for reusable functions.

Event handlers such as `onClick`, `onChange` and `onSubmit` allow the application to respond when users click buttons, enter information or submit forms.

6. Project Structure

I organized the project into folders to make the files easier to find and understand. The components folder contains the different parts of the interface, while the data and hooks folders contain the initial student information and the main student management logic.

The main structure is shown below.

text
STUDENT-MANAGEMENT-SYSTEM/
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── AppBackground.jsx
    │   ├── DashboardMenu.jsx
    │   ├── DashboardOverview.jsx
    │   ├── DeleteStudentModal.jsx
    │   ├── StudentDashboard.jsx
    │   ├── StudentForm.jsx
    │   ├── StudentModal.jsx
    │   ├── StudentsearcFilter.jsx
    │   └── StudentStatsCards.jsx
    ├── data/
    │   └── initialStudent.js
    └── hooks/
        └── useStudents.js


The main files have different responsibilities:

- `App.jsx` manages the main application and coordinates its pages and popup windows.
- `main.jsx` starts the React application.
- `AppBackground.jsx` handles the background design.
- `DashboardMenu.jsx` provides the navigation menu.
- `DashboardOverview.jsx` displays the dashboard overview, including top courses and recent students.
- `DeleteStudentModal.jsx` asks the user to confirm before deleting a student.
- `StudentDashboard.jsx` displays the student table and the message shown when no records are found.
- `StudentForm.jsx` handles student details and form validation.
- `StudentModal.jsx` provides the popup window used for student form interactions.
- `StudentsearcFilter.jsx` contains the search, filtering and sorting controls.
- `StudentStatsCards.jsx` displays summary information, such as student totals, enrollment figures and average age.
- `initialStudent.js` contains the initial sample student records.
- `useStudents.js` manages student data and the main operations for adding, editing, deleting, searching and sorting records.

Separating these responsibilities made the project easier for me to follow while developing and testing it.

 7. Testing and Results

After completing the main features, I tested the application in the browser to check whether the different operations worked correctly.

| No. | Test | Expected result | Result |
|---|---|---|---|
| 1 | Add a student | The new record appears in the table | Passed |
| 2 | Submit an empty or invalid form | Error messages appear and the record is not saved | Passed |
| 3 | Edit a student | The updated information appears in the table | Passed |
| 4 | Cancel editing | The original record remains unchanged | Passed |
| 5 | Cancel deletion | The record remains in the table | Passed |
| 6 | Confirm deletion | The selected record is removed | Passed |
| 7 | Search by name or email | Matching records are displayed | Passed |
| 8 | Filter and sort records | Records are displayed in the selected order or category | Passed |
| 9 | Search for a nonexistent student | A message indicates that no students were found | Passed |
| 10 | Refresh the page | Saved records remain available in the same browser | Passed |
| 11 | Test navigation and mobile layout | The pages and menu work as expected | Passed |
| 12 | Build the application | The production build completes without errors | Passed |

I also deployed the project to Netlify and opened the live website. I tested the main operations, including adding, editing and deleting student records, and checked that form validation worked. The features worked as expected during my testing.

 8. How to Run the Application

To run the project locally, Node.js and npm must be installed, and the project files must be available on the computer.

I can start the application by opening a terminal in the project folder and running these commands:

bash
npm install
npm run dev


Vite then displays a local development link, normally `http://localhost:5173`. Opening that link in a browser displays the application.

To prepare the application for deployment, I can run:

bash
npm run build


The generated production files are placed in the `dist` folder.

9. Deployment

After working on the application, I uploaded the source code to GitHub and deployed the website through Netlify.

The GitHub repository contains the project's source code, while Netlify provides the public link that can be opened in a browser.

GitHub Repository:**  
https://github.com/moenothapelo62/STUDENT-MANAGEMENT-SYSTEM

Live Website:**  
https://soft-quokka-8d2b7c.netlify.app/

I opened the deployed website and checked that the main student management features worked. This gave me experience in publishing a React application so that it could be accessed online.

10. Challenges and Lessons Learned

While working on this project, I learned that making a website look correct is only one part of development. The application must also handle information properly and respond correctly to user actions.

One area I worked on was managing student records in React. When a record is added, edited or deleted, the table must update without requiring the user to refresh the page. I also learned why form validation is important, especially when users leave fields empty or enter information in the wrong format.

Using local storage helped me understand how data can be preserved after refreshing a page. Organizing the application into separate components also made it easier to locate the code responsible for each feature.

Finally, uploading the project to GitHub and deploying it through Netlify helped me understand how a project can move from development on a computer to a website that other people can access.

 11. Conclusion

This assignment gave me an opportunity to practise the web development concepts I have learned in class. I developed a Student Management System that allows users to add, view, edit and delete student records, as well as search, filter and sort the information.

Through the project, I improved my understanding of JavaScript, React components, state management, form validation and local storage. I also gained experience with GitHub and Netlify by storing my source code online and publishing the application.

The system currently uses local storage rather than a shared database, but it demonstrates the main student management operations included in my project. Overall, completing this assignment helped me gain practical experience in building, testing and deploying a web application.

