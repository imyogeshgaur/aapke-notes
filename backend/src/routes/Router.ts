import { Request, Response, Router } from 'express'
import Controller from '../controller/Controller';
import MiddleWare from '../middleware/Middleware';

namespace Routers{
    export const notesRouter = Router();
    export const userRouter = Router();

    notesRouter.post("/createNote",MiddleWare.authorization, async (req: Request, res: Response) => {
        try {
            const notesController = new Controller.NotesController(req, res)
            await notesController.createNotes();
        } catch (error) {
            console.log("Note's Global Error : ", error)
        }
    })
    
    notesRouter.post("/playNote",MiddleWare.authorization, async (req: Request, res: Response) => {
        try {
            const notesController = new Controller.NotesController(req, res)
            await notesController.playNote();
        } catch (error) {
            console.log("Note's Global Error : ", error)
        }
    })
    
    notesRouter.get("/allNotes/:id",MiddleWare.authorization, async (req: Request, res: Response) => {
        try {
            const notesController = new Controller.NotesController(req, res)
            await notesController.getAllNotes()
        } catch (error) {
            console.log("Note's Global Error : ", error)
        }
    })
    
    notesRouter.get("/note/:id",MiddleWare.authorization, async (req: Request, res: Response) => {
        try {
            const notesController = new Controller.NotesController(req, res)
            await notesController.getANote()
        } catch (error) {
            console.log("Note's Global Error : ", error)
        }
    })
    
    notesRouter.put("/updateNote/:id",MiddleWare.authorization, async (req: Request, res: Response) => {
        try {
            const notesController = new Controller.NotesController(req, res)
            await notesController.updateNote();
        } catch (error) {
            console.log("Note's Global Error : ", error)
        }
    })
    
    notesRouter.delete("/deleteNote/:id",MiddleWare.authorization, async (req: Request, res: Response) => {
        try {
            const notesController = new Controller.NotesController(req, res)
            await notesController.deleteNote();
        } catch (error) {
            console.log("Note's Global Error : ", error)
        }
    })
    
    notesRouter.delete("/allNotes/:id",MiddleWare.authorization, async (req: Request, res: Response) => {
        try {
            const notesController = new Controller.NotesController(req, res)
            await notesController.deleteALlNotes();
        } catch (error) {
            console.log("Note's Global Error : ", error)
        }
    })

    //! User Routers 
    userRouter.post("/signup", async (req, res) => {
        try {
            const userController = new Controller.UserController(req, res);
            await userController.signUpUser();
        } catch (error) {
            console.log("User's Global Error : ", error)
        }
    })
    
    userRouter.post("/login", async (req, res) => {
        try {
            const userController = new Controller.UserController(req, res);
            await userController.loginUser()
        } catch (error) {
            console.log("User's Global Error : ", error)
        }
    })
    
    userRouter.post("/forgetPass", async (req, res) => {
        try {
            const userController = new Controller.UserController(req, res);
            await userController.forgetPassword();
        } catch (error) {
            console.log("User's Global Error : ", error)
        }
    })
    
    userRouter.post("/resetPass/:id", async (req, res) => {
        try {
            const userController = new Controller.UserController(req, res);
            await userController.resetPassword();
        } catch (error) {
            console.log("User's Global Error : ", error)
        }
    })
}

export default Routers;