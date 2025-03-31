import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    selectedTags: []  // Store multiple selected tags for filtering
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action) => {
            const { id, title, content, tags } = action.payload;
            state.notes.push({
                id,
                title,
                content,
                tags: tags && tags.length > 0 ? tags : null // Set null if no tags
            });
        },        
        editNote: (state, action) => {
            const { id, title, content, tags } = action.payload;
            const noteIndex = state.notes.findIndex(note => note.id === id);
            if (noteIndex !== -1) {
                state.notes[noteIndex] = { 
                    ...state.notes[noteIndex], 
                    title, 
                    content, 
                    tags: tags.length > 0 ? tags : state.notes[noteIndex].tags  
                };
            }
        },       
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        addTag: (state, action) => {
            const { id, tag } = action.payload;
            const note = state.notes.find(note => note.id === id);
            if (note && !note.tags.includes(tag)) {
                note.tags.push(tag);
            }
        },
        removeTag: (state, action) => {
            const { id, tag } = action.payload;
            const note = state.notes.find(note => note.id === id);
            if (note) {
                note.tags = note.tags.filter(t => t !== tag);
            }
        },
        toggleFilterTag: (state, action) => {
            const tag = action.payload;
            if (state.selectedTags.includes(tag)) {
                // If tag is already selected, remove it from the filter
                state.selectedTags = state.selectedTags.filter(t => t !== tag);
            } else {
                // Otherwise, add it to the filter
                state.selectedTags.push(tag);
            }
        },
        clearFilter: (state) => {
            state.selectedTags = [];  // Reset tag filtering
        }
    }
});

export const { addNote, editNote, deleteNote, addTag, removeTag, toggleFilterTag, clearFilter } = notesSlice.actions;
export default notesSlice.reducer;

