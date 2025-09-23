export function addNote(notes, note) {
    return [...notes, note];
}

export function updateNote(notes, index, newNote) {
    const updated = [...notes];
    updated[index] = newNote;
    return updated;
}

export function deleteNote(notes, index) {
    return notes.filter((_, i) => i !== index);
}