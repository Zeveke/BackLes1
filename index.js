const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, deleteNote } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add a new note to the list",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  handler() {
    printNotes();
  },
});

yargs.command({
  command: "delete",
  describe: "Delete a note from the list",
  builder: {
    id: {
      describe: "ID of the note to delete",
      demandOption: true,
      type: "string",
    },
  },
  handler({ id }) {
    deleteNote(id);
  },
});

yargs.parse();
