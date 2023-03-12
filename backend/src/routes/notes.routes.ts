import { Request, Response, Router } from 'express'
import NotesController from '../controller/notes.controller';
const notesRouter = Router();

notesRouter.post("/createNote", async (req: Request, res: Response) => {
    try {
        const notesController = new NotesController(req, res)
        await notesController.createNotes();
    } catch (error) {
        console.log("Note's Global Error : ", error)
    }
})

notesRouter.get("/allNotes/:id", async (req: Request, res: Response) => {
    try {
        const notesController = new NotesController(req, res)
        await notesController.getAllNotes()
    } catch (error) {
        console.log("Note's Global Error : ", error)
    }
})

notesRouter.get("/note/:id", async (req: Request, res: Response) => {
    try {
        const notesController = new NotesController(req, res)
        await notesController.getANote()
    } catch (error) {
        console.log("Note's Global Error : ", error)
    }
})

notesRouter.put("/updateNote/:id", async (req: Request, res: Response) => {
    try {
        const notesController = new NotesController(req, res)
        await notesController.updateNote();
    } catch (error) {
        console.log("Note's Global Error : ", error)
    }
})

notesRouter.delete("/deleteNote/:id", async (req: Request, res: Response) => {
    try {
        const notesController = new NotesController(req, res)
        await notesController.deleteNote();
    } catch (error) {
        console.log("Note's Global Error : ", error)
    }
})

notesRouter.delete("/allNotes/:id", async (req: Request, res: Response) => {
    try {
        const notesController = new NotesController(req, res)
        await notesController.deleteALlNotes();
    } catch (error) {
        console.log("Note's Global Error : ", error)
    }
})

export default notesRouter;