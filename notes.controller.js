const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const { title } = require("process");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.blue.inverse("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.title, note.id));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const indexRemove = notes.filter((note) => note.id !== id);

  await saveNotes(indexRemove);
  console.log(chalk.redBright.inverse("Note was deleted!"));
}

async function editNote(id, newTitle) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === id);
  notes[index] = { ...notes[index], title: newTitle };

  await saveNotes(notes);

  console.log(chalk.yellow.inverse("Note was edited!"));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
