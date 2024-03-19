const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log("Note was added!");
}

async function getNotes() {
  try {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
  } catch (error) {
    return [];
  }
}

async function printNotes() {
  const notes = await getNotes();

  console.log("Here is the list of notes:");
  notes.forEach((note) => {
    console.log(note.title);
  });
}

async function deleteNote(id) {
  let notes = await getNotes();
  notes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log("Note was deleted!");
}

module.exports = {
  addNote,
  printNotes,
  deleteNote,
};
