import express from "express"
import { CreateNote, DeleteNote, getAllNotes, UpdateNote,GetSpecificNote } from "../controllers/notesController.js";

const NoteRouter = express.Router();


NoteRouter.get("/",getAllNotes)

NoteRouter.get("/:id",GetSpecificNote)

NoteRouter.post("/",CreateNote)

NoteRouter.put("/:id",UpdateNote)

NoteRouter.delete("/:id",DeleteNote)

export default NoteRouter;
