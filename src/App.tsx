import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";

import { useEffect, useState } from "react";

import { Textarea } from "./components/ui/textarea";
import { NotesProvider } from "./context/noteContext";
import NoteItems from "./components/noteItems";
import { ScrollArea } from "./components/ui/scroll-area";
import Noteform from "./components/noteform";

function App() {
  //main-working

  const [note, setnote] = useState([]);

  const addNote = (text) => {
    setnote((prev) => [{ id: Date.now(), ...text }, ...prev]);
  };
  const updateNote = (id, text) => {
    setnote((prev) =>
      prev.map((prevNote) =>
        prevNote.id === id ? { ...prevNote, text } : prevNote
      )
    );
  };
  const deleteNote = (id) => {
    setnote((prev) => prev.filter((prevNote) => prevNote.id !== id));
  };
  const pinNote = (id) => {
    setnote((prev) =>
      prev.map((prevNote) =>
        prevNote.id === id
          ? { ...prevNote, isPinned: !prevNote.isPinned }
          : prevNote
      )
    );
  };

  //Local storage implementation using useEffect()

  //Loading data from Local Storage
  useEffect(() => {
    const note = JSON.parse(localStorage.getItem("note"));

    if (note && note.length > 0) {
      //loads the 'notes' from local storage through setnote()
      setnote(note);
    }
  }, []);

  //Storing Data into the local Storage
  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(note));
  }, [note]);

  return (
    <>
      <ThemeProvider>
        <NotesProvider
          value={{ note, addNote, updateNote, deleteNote, pinNote }}
        >
          <div className="bg-background h-screen text-gray-100">
            <div
              id="top-bar"
              className=" h-10 py-6 border border-t-0 border-x-0 border-border flex items-center fixed w-full z-10 bg-background"
            >
              <p className="font-bold tracking-tight text-xl relative w-full px-4 text-foreground">
                PowerNotes
              </p>
              <Noteform /> {/*INPUTTTTTT*/}
              <ThemeToggle />
            </div>

            <ScrollArea className="pt-12">
              <div className="flex flex-col items-center gap-8 p-10 2xl:flex-row xl:flex-row 2xl:flex-wrap xl:flex-wrap transition duration-500 ease-in-out">
                {note.map((note) => (
                  <div key={note.id} className="">
                    <NoteItems note={note} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </NotesProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
