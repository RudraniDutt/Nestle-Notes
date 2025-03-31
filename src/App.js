import React from "react";
import NoteForm from "./COMPONENTS/NotesForm"; // Fixed component name casing
import NotesList from "./COMPONENTS/NotesList";

const App = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Notes App</h1>
            <NoteForm />
            <NotesList />
        </div>
    );
};

export default App;

