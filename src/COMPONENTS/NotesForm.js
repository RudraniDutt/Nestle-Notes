import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../FEATURES/Notes/NotesSlice";
import { nanoid } from "nanoid";

const NoteForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(
        addNote({
          id: nanoid(),
          title,
          content,
          tags: tags.trim() ? tags.split(",").map((tag) => tag.trim()) : null,
        })
      );
      setTitle("");
      setContent("");
      setTags("");
    }
  };

  return (
    <form
      className="bg-pastel-blue p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-2 flex flex-col space-y-4"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        type="submit"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;



