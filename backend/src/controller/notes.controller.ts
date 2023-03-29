import { Request, Response } from "express";
import NotesService from "../service/notes.service";
import decodeUser from "../helpers/decodeUser.helper";

class NotesController {
    private req: Request;
    private res: Response;
    private service: NotesService;
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new NotesService();
    }

    async createNotes() {
        try {
            const data = this.req.body;
            const createdNotes = await this.service.createNotes(data);
            if (createdNotes === 0) {
                return this.res.status(200).send({ message: "Please Fill All Fields !!!" });
            } else {
                return this.res.status(200).send({ message: "Note Created Successfully !!!", note: createdNotes });
            }
        } catch (error) {
            console.log("Note's Controller Error : ", error)
        }
    }

    async playNote() {
        try {
            const data = this.req.body;
            await this.service.playNote(data);
        } catch (error) {
            console.log("Note's Controller Error : ", error)
        }
    }
    async getAllNotes() {
        try {
            const creatorId = this.req.params.id;
            const allNotesByCreator = await this.service.getAllNotes(creatorId);
            return this.res.status(200).send(allNotesByCreator)
        } catch (error) {
            console.log("Note's Controller Error : ", error)
        }
    }
    async getANote() {
        try {
            const noteId = this.req.params.id;
            const singleNoteByCreator = await this.service.getANote(noteId);
            return this.res.status(200).send(singleNoteByCreator)
        } catch (error) {
            console.log("Note's Controller Error : ", error)
        }
    }
    async updateNote() {
        try {
            const noteId = this.req.params.id;
            const data = this.req.body;
            const updateTheNote: any = await this.service.updateNote(noteId, data)
            if (updateTheNote[0]) {
                return this.res.status(200).send({ message: "Note Updated Successfully !!! ", update: updateTheNote[0] });
            } else {
                return this.res.status(200).send({ message: "Note Not Updated !!!", update: updateTheNote[0] });
            }
        } catch (error) {
            console.log("Note's Controller Error : ", error)
        }
    }

    async deleteNote() {
        try {
            const noteId = this.req.params.id;
            const deleteTheNote: any = await this.service.deleteNote(noteId);
            if (deleteTheNote) {
                return this.res.status(200).send({ message: "Note Deleted Successfully !!!", delete: deleteTheNote })
            } else {
                return this.res.status(200).send({ message: "Note not Deleted !!!", delete: deleteTheNote })
            }
        } catch (error) {
            console.log("Note's Controller Error : ", error)
        }
    }

    async deleteALlNotes() {
        try {
            const creatorId = this.req.params.id;
            const deleteTheNote: any = await this.service.deleteALlNotes(creatorId);
            if (deleteTheNote) {
                return this.res.status(200).send({ message: "Notes Deleted Successfully !!!", delete: deleteTheNote })
            } else {
                return this.res.status(200).send({ message: "Notes not Deleted !!!", delete: deleteTheNote })
            }
        } catch (error) {
            console.log("Note's Controller Error : ", error)
        }
    }
}

export default NotesController;
