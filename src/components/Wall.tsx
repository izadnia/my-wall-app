import  { useState, useEffect } from "react";
import initialNotes from "../data/initialNotes.js";
import Note from "./Note.js";

interface NoteType {
  id: string;
  text: string;
  date: string;
  deadline: string;
}

function Wall() {
  const [notes, setNotes] = useState<NoteType[]>([]); // نوت‌های خالی به عنوان مقدار اولیه

  // بارگذاری نوت‌ها از LocalStorage یا استفاده از نوت‌های پیش‌فرض
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes)); // بارگذاری نوت‌ها از LocalStorage
    } else {
      setNotes(initialNotes); // استفاده از نوت‌های پیش‌فرض
      localStorage.setItem("notes", JSON.stringify(initialNotes)); // ذخیره نوت‌های اولیه در LocalStorage
    }
  }, []);

  // ذخیره نوت‌ها در LocalStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes)); // ذخیره در LocalStorage
    }
  }, [notes]);

  // اضافه کردن نوت جدید
  const addNote = () => {
    const newNote: NoteType = {
      id: Date.now().toString(),
      text: "نوت جدید",
      date: new Date().toISOString(),
      deadline: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // ددلاین یک هفته بعد
    };
    setNotes([...notes, newNote]);
  };

  // ویرایش نوت
  const editNote = (id: string, newText: string, newDeadline: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, text: newText, deadline: newDeadline }
          : note
      )
    );
  };

  // حذف نوت
  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // مرتب‌سازی نوت‌ها بر اساس ددلاین
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={addNote}
        style={{ marginBottom: "2px", padding: "10px", fontSize: "16px" }}
      >
        اضافه کردن نوت
      </button>
      <p>نمایش به ترتیب اولویت ددلاین:</p>
      <div style={{width:'90%', display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note, index) => (
            <Note
              key={note.id}
              note={note}
              index={index}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>نوتی موجود نیست. لطفاً نوتی اضافه کنید.</p> // پیام اگر نوتی موجود نباشد
        )}
      </div>
    </div>
  );
};

export default Wall;
