import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteNote,
    editNote,
    toggleFilterTag,
    clearFilter,
    removeTag,
} from "../FEATURES/Notes/NotesSlice";
import { FaTrash, FaEdit } from "react-icons/fa";

const pastelColors = [
    "#FFF8DC", "#E6E6FA", "#FFC9DE", "#AFEEEE", "#FFE4C4",
    "#ACE7FF", "#BFFCC6", "#EBCCFF", "#FFA4A9", "#E7FFAC"
];

const NotesList = () => {
    const notes = useSelector((state) => state.notes.notes);
    const selectedTags = useSelector((state) => state.notes.selectedTags);
    const dispatch = useDispatch();

    const [editId, setEditId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [updatedTags, setUpdatedTags] = useState("");
    const [expandedNotes, setExpandedNotes] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [editedNote, setEditedNote] = useState(null); // Holds the note being edited

    const handleEdit = (note) => {
        setEditId(note.id);
        setUpdatedTitle(note.title);
        setUpdatedContent(note.content);
        setUpdatedTags(note.tags ? note.tags.join(", ") : "");
        setEditedNote(note); // Move note to top
    };

    const handleSave = (id) => {
        const tagsArray = updatedTags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        dispatch(editNote({ id, title: updatedTitle, content: updatedContent, tags: tagsArray }));
        setEditId(null);
        setEditedNote(null); // Reset edited note
    };

    const toggleExpand = (id) => {
        setExpandedNotes((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const truncateText = (text, id) => {
        if (expandedNotes[id]) return text;
        const words = text.split(" ");
        return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
    };

    // Search filter logic
let filteredNotes = notes.filter((note) => {
    const matchesTags =
        selectedTags.length === 0 ||
        (note.tags && selectedTags.every((tag) => note.tags.includes(tag)));

    const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchesTags && matchesSearch;
});

    // Move edited note to the top
    if (editedNote) {
        filteredNotes = [editedNote, ...filteredNotes.filter((note) => note.id !== editedNote.id)];
    }

    return (
        <div className="mt-6 px-4">
            {/*Search Bar */}
            <input
                type="text"
                placeholder="Search notes..."
                className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* 🔹 Selected Tag Filters */}
            {selectedTags.length > 0 && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm flex items-center flex-wrap gap-2">
                    <strong className="text-gray-700">Filtered by:</strong>
                    {selectedTags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm cursor-pointer"
                            onClick={() => dispatch(toggleFilterTag(tag))}
                        >
                            {tag} ✖
                        </span>
                    ))}
                    <button
                        className="ml-auto bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                        onClick={() => dispatch(clearFilter())}
                    >
                        Clear Filter
                    </button>
                </div>
            )}

{/* 🔹 Notes Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3" style={{ gridAutoFlow: "dense" }}>
  {filteredNotes.map((note, index) => {
    const backgroundColor = pastelColors[index % pastelColors.length];

    return (
      <div
        key={note.id}
        className={`p-4 border rounded-lg shadow-md hover:shadow-lg transition-all relative min-h-48 flex flex-col
          ${(editId === note.id || expandedNotes[note.id]) ? "lg:col-span-3 md:col-span-2 col-span-1" : ""}
        `}
        style={{ backgroundColor }}
      >
        {/* Check if note is in edit mode */}
        {editId === note.id ? (
          <>
            <input
              className="w-full p-2 border mb-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 border mb-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
            <input
              className="w-full p-2 border mb-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type="text"
              value={updatedTags}
              onChange={(e) => setUpdatedTags(e.target.value)}
              placeholder="Enter tags separated by commas"
            />
            <div className="flex flex-wrap gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex-1 min-w-[120px]"
                onClick={() => handleSave(note.id)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex-1 min-w-[120px]"
                onClick={() => {
                  setEditId(null);
                  setEditedNote(null);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Title & Actions */}
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
              <h2 className="text-lg font-bold flex-1">{note.title}</h2>
              <div className="flex space-x-3">
                <button
                  className="text-gray-600 hover:text-gray-800 transition"
                  onClick={() => handleEdit(note)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 transition"
                  onClick={() => dispatch(deleteNote(note.id))}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 mt-1 text-sm leading-relaxed">
              {expandedNotes[note.id] ? note.content : truncateText(note.content, note.id)}
            </p>

            {note.content.split(" ").length > 20 && (
              <button
                className="text-blue-500 text-sm mt-2 font-medium hover:underline"
                onClick={() => toggleExpand(note.id)}
              >
                {expandedNotes[note.id] ? "Show Less" : "Read More"}
              </button>
            )}

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
              <div className="mt-auto pt-4 flex flex-wrap gap-2 items-center">
                {note.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-xs cursor-pointer hover:bg-gray-300 transition"
                    onClick={() => dispatch(toggleFilterTag(tag))}
                  >
                    {tag}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeTag({ id: note.id, tag }));
                      }}
                      className="ml-2 text-gray-600 hover:text-gray-700 transition"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  })}
</div>

        </div>
    );
};

export default NotesList;













