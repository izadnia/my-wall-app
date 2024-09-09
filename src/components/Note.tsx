import { useState } from "react";
import "./styles.css"; // فایل CSS برای استایل‌دهی

interface NoteType {
  id: string;
  text: string;
  date: string;
  deadline: string;
}

interface NoteProps {
  note: NoteType;
  index: number;
  editNote: (id: string, newText: string, newDeadline: string) => void;
  deleteNote: (id: string) => void;
}

function Note({ note, editNote, deleteNote }: NoteProps) {
  /***************** دکمه ای ویرایش ***********************/
  const [isEditing, setIsEditing] = useState(false);

  /*******************ویرایش متن نوت******************/
  const [newText, setNewText] = useState(note.text);

  /*******************ویرایش ددلاین نوت******************/
  const [newDeadline, setNewDeadline] = useState(note.deadline);

  /************محاسبه میزان اختلاف برای تغییر رنگ نوت******/
  const deadlineDate = new Date(note.deadline);
  const now = new Date();
  const timeDiff = deadlineDate.getTime() - now.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  //***************  رنگ نوت با توجه به ددلاین  ***************/
  let noteColor = "";
  if (daysDiff <= 0) {
    noteColor = "#FFC0CB"; //  صورتی برای امروز و کمتر
  } else if (daysDiff < 7) {
    noteColor = "#FFFF99"; // زرد برای کمتر از یک هفته
  } else {
    noteColor = "#CCFFCC"; // سبز برای بیشتر از یک هفته
  }

  /***************** دکمه ای ذخیره ***********************/
  const handleSave = () => {
    editNote(note.id, newText, newDeadline);
    setIsEditing(false); // بعد از ذخیره، حالت ویرایش را غیرفعال کن
  };

  /************** دکمه ی انصراف **********************/
  const handleCancel = () => {
    setIsEditing(false); // بازگشت به حالت اولیه بدون تغییرات
    setNewText(note.text); // بازگردانی متن اصلی
    setNewDeadline(note.deadline); // بازگردانی ددلاین اصلی
  };

  return (

      <div className="quote-container">
      <i className="pin"></i>

      <div
        className="note yellow"
        style={{ backgroundColor: noteColor }}
      >
        {isEditing ? (
          <div className="">
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              style={{
                border:'0',
                width: "90%",
                margin: "5px",
                padding: "5px",
                fontFamily: "Tahoma",
              }}
            />
            <input
              type="date"
              value={newDeadline.split("T")[0]}
              onChange={(e) => setNewDeadline(e.target.value)}
              style={{

                border:'0',
                width: "90%",
                margin: "5px",
                padding: "5px",
                marginTop: "10px",
                fontFamily: "Tahoma",
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <button className="save-btn" onClick={handleSave}>
                ذخیره
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                انصراف
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{note.text}</p>
            <br />
            <cite className="ddLine">
              <p>
                تاریخ ددلاین:{" "}
                {new Date(note.deadline).toLocaleDateString("fa-IR")}
              </p>
            </cite>

            <div style={{ marginTop: "10px" }}>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                ویرایش
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                حذف
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default Note;
