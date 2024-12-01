import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

const NotesWidget = () => {
  const theme = useSelector((state) => state.theme.mode);

  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (noteInput.trim() !== "") {
      const newNote = { text: noteInput, id: Date.now() };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNoteInput("");
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div
      className={`widget w-[256px] h-48 shadow-lg rounded-lg p-4 text-center flex flex-col gap-2 overflow-auto ${
        theme === "light" ? "bg-[#00000030]" : "bg-[#61546b]"
      }`}
    >
      <h2
        className={`text-xl font-bold ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        Notes
      </h2>

      {/* Note Input */}
      <form onSubmit={addNote} className="flex items-center gap-2 mb-2">
        <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          className={`w-full bg-transparent px-2 py-1 rounded focus-within:outline-none duration-200 border ${
            theme === "light"
              ? "border-black placeholder:text-black"
              : "border-white placeholder:text-[#FFF9BF]"
          }`}
          placeholder="Write a note..."
        />
        <button
          type="submit"
          className={`bg-[#00000030] font-semibold px-2 py-1 rounded hover:scale-110 active:scale-95 duration-200 ${
            theme === "light" ? "text-black" : "text-[#FFF9BF]"
          }`}
        >
          Add
        </button>
      </form>

      {/* Notes List */}
      <div className="flex flex-col gap-2">
        {notes.length === 0 ? (
          <p
            className={`text-sm ${
              theme === "light" ? "text-black" : "text-[#FFF9BF]"
            }`}
          >
            No notes added yet.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`flex items-center justify-between ${
                theme === "light" ? "text-black" : "text-[#FFF9BF]"
              }`}
            >
              <p className="flex-1">{note.text}</p>
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => deleteNote(note.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesWidget;
