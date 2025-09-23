import { useState } from "react";
import { addNote, deleteNote, updateNote } from "../services/notesService";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const handleAdd = () => {
        if (input.trim() === "") return;
        if (editIndex !== null) {
            setNotes(updateNote(notes, editIndex, input));
            setEditIndex(null);
        } else {
            setNotes(addNote(notes, input));
        }
        setInput("");
    };

    const handleEdit = (idx) => {
        setInput(notes[idx]);
        setEditIndex(idx);
    };

    const handleDelete = (idx) => {
        setNotes(deleteNote(notes, idx));
        if (editIndex === idx) {
            setInput("");
            setEditIndex(null);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Notas</h2>
            <div className="flex gap-2 mb-4">
                <input
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Escribe una nota"
                />
                <button
                    className={`px-4 py-2 rounded text-white ${editIndex !== null ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}
                    onClick={handleAdd}
                >
                    {editIndex !== null ? "Modificar" : "Agregar"}
                </button>
            </div>
            <ul>
                {notes.map((note, idx) => (
                    <li
                        key={idx}
                        className="flex items-center justify-between bg-gray-100 rounded px-3 py-2 mb-2"
                    >
                        <span>{note}</span>
                        <div className="flex gap-2">
                            <button
                                className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
                                onClick={() => handleEdit(idx)}
                            >
                                Editar
                            </button>
                            <button
                                className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
                                onClick={() => handleDelete(idx)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
