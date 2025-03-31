# 📝 Nestle Notes (A Notes making app - The front-end Developer's Assignment)
It is a **React.js-based Notes App** implemented with **Redux Toolkit for state management** and **Tailwind CSS for styling**.  
The app enables users to **add, edit, delete, filter, and search notes** with a modern UI design.

##  Features  

### 1️. Add a Note
- Users can create a note by entering the following details:  
  - *Title* (Single-line input)  
  - *Content* (Multi-line textarea)  
  - *Tags* (Comma-separated values)- Any note without tag could also be added.
- Clicking the **"Add Note"** button adds the note to the grid.  

### 2️. Display Notes in a Grid Layout 
- All notes are displayed in an organized manner in *grid format*.  
- Each note created will have a unique background color to present a more attractive look.    

### 3️. Edit a Note  
- Each note features an **Edit** button.   
- Click on **Edit** to make the fields of the note (Title, Content, and Tags) editable.  
- After making changes, clicking **Save** updates the note or **Cancel** to keep the note as it was.  

### 4️. Delete a Note 
- Each note features a **Delete** button.   
- Clicking on it permanently removes the note from the list.  

### 5️. Tag-Based Filtering 
- Each note supports **multiple tags**.  
- Tags are displayed as **clickable buttons**.  
- Clicking on a tag **filters all notes containing that tag**.  

### 6️. Search Functionality 
- A **search bar** allows users to search notes *by title or tags*.  
- The list dynamically updates to show matching results.  

### 7️. Show More / Show Less Functionality 
- If the note content is too long, only a preview is shown.  
- Clicking **Show More** expands the content.  
- Clicking **Show Less** collapses the content back.  


##  Tech Stack  
- Frontend: React.js  
- State Management: Redux Toolkit  
- Styling: Tailwind CSS  
- React Hooks: useState, useEffect, useDispatch, useSelector  
- Package Manager: npm 


##  Major Project Structure 
📦 Nestle Notes
┣ 📂 node_modules
┣ 📂 public
┣ 📂 src
┃ ┣ 📂 APPS
┃ ┃ ┣ 📜 ReStore.js # Redux functionality
┃ ┣ 📂 COMPONENTS
┃ ┃ ┣ 📜 NotesForm.js # Form component for adding/editing notes
┃ ┃ ┣ 📜 NotesList.js # Displays notes in a list/grid format
┃ ┣ 📂 FEATURES\Notes
┃ ┃ ┣ 📜 NotesSlice.js # Redux Toolkit slice for managing notes
┃ ┣ 📜 App.js # Main application component
┃ ┣ 📜 App.test.js # Test file for App component
┃ ┣ 📜 index.js # React entry point
┣ 📂 npm
┣ 📜 .gitignore # Git ignore file
┣ 📜 postcss.config.js # PostCSS configuration
┣ 📜 README.md # Project documentation
┗ 📜 tailwind.config.js # Tailwind CSS configuration


##  Installation and Setup  

### 1️. Clone the Repository
       git clone https://github.com/RudraniDutt/Nestle-Notes.git
       cd Nestle-Notes

### 2️. Install Dependencies
       npm install

### 3️. Run the App
       npm start

The app will run at http://localhost:3000.


##  Challenges Faced  

### 1️. State Management with Redux  
- The challenge was state management for adding, editing, searching, and filtering notes.
- **Redux Toolkit** helped in efficiently structuring and updating the application state.  

### 2️. Real-Time UI Updates with React Hooks  
- To ensure that the UI updates on every change, correct usage of **React Hooks** (`useState`, `useEffect`) and Redux state updates was important to avoid unwanted re-renders.  

### 3️. Styling and Responsiveness with Tailwind CSS  
- Building a clean and responsive UI with **Tailwind CSS** required careful decisions with utility classes and some layout-handling operations on different screen sizes.

##  Future Enhancements
- Persistent Storage: Save notes in localStorage or Firebase.
- Dark Mode Support.
- Drag-and-Drop Reordering of Notes.
- Note Categorization (Folders/Labels).
- User Authentication


## Author
 Name: Rudrani
 LinkedIn: [Rudrani Dutt] (http://www.linkedin.com/in/rudrani-dutt)
 GitHub: [RudraniDutt] (https://github.com/RudraniDutt)