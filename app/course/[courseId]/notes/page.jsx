"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchNotes();
  }, [courseId]);

  const fetchNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });

      if (!result || !result.data || !result.data.notes) {
        console.error("Invalid response from server. No notes found.");
        setNotes([]);
        return;
      }

      setNotes(result.data.notes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    }
  };

  const styleContent = (content) => {
    // Improved but still INSECURE for production. Use a proper sanitizer!
    content = content.replace(/```html/g, "").replace(/```/g, "").trim();
    return content
      .replace(/<h3>/g, '<h3 style="font-size:24px; font-weight:600; color:#333; margin-bottom:10px;">')
      .replace(/<h4>/g, '<h4 style="font-size:20px; font-weight:500; color:#444; margin-bottom:8px;">')
      .replace(/<p>/g, '<p style="font-size:16px; color:#555; line-height:1.6; margin-bottom:12px;">')
      .replace(/<li>/g, '<li style="font-size:16px; color:#555; line-height:1.6; margin-bottom:12px;">');
  };

  if (!notes || notes.length === 0) {
    return <div>No notes available</div>;
  }

  return (
    <div>
      {/* Top Navigation */}
      <div className="flex gap-5 items-center">
        <Button
          variant="outline"
          size="sm"
          disabled={currentNoteIndex === 0}
          onClick={() => setCurrentNoteIndex((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </Button>

        {notes.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= currentNoteIndex ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentNoteIndex === notes.length - 1}
          onClick={() =>
            setCurrentNoteIndex((prev) => Math.min(prev + 1, notes.length - 1))
          }
        >
          Next
        </Button>
      </div>

      {/* Note Content */}
      <div className="mt-10">
        <div
          className="note-content"
          dangerouslySetInnerHTML={{
            __html: styleContent(notes[currentNoteIndex].notes),
          }}
        ></div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex gap-5 items-center mt-10">
        <Button
          variant="outline"
          size="sm"
          disabled={currentNoteIndex === 0}
          onClick={() => setCurrentNoteIndex((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </Button>

        {notes.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= currentNoteIndex ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentNoteIndex === notes.length - 1}
          onClick={() =>
            setCurrentNoteIndex((prev) => Math.min(prev + 1, notes.length - 1))
          }
        >
          Next
        </Button>
      </div>

      {/* End of Notes Message */}
      {currentNoteIndex === notes.length - 1 && (
        <div className="flex items-center gap-10 flex-col mt-5">
          <h2>📘 End of notes. Ready for the next step? 🚀</h2>
          <Button className="rounded-full" onClick={() => router.back()}>Go to course page</Button>
        </div>
      )}
    </div>
  );
}

export default ViewNotes;
