import Notes from "../model/notes.entity";
import { v1 } from "uuid";

class NotesService {
    private notes;
    constructor() {
        this.notes = Notes;
    }

    async createNotes(data: any) {
        try {
            const { notePriority, noteTitle } = data;
            if (!notePriority || !noteTitle) {
                return 0;
            } else {
                const createdNotes = await this.notes.create({
                    noteId: v1(),
                    ...data
                });
                const newNote = await createdNotes.save();
                return newNote;
            }
        } catch (error) {
            console.log("Note's Service Error : ", error)
        }
    }

    async getAllNotes(creatorId: string) {
        try {
            const allNotesByCreator = await this.notes.findAll({
                where: {
                    creatorId
                }
            });
            return allNotesByCreator;
        } catch (error) {
            console.log("Note's Service Error : ", error)
        }
    }

    async getANote(noteId: string) {
        try {
            const singleNote = await this.notes.findOne({
                where: {
                    noteId
                }
            });
            return singleNote;
        } catch (error) {

        }
    }

    async updateNote(noteId: string, data: any) {
        try {
            const { notePriority, noteDescription, noteTitle } = data;
            const isUpdated = await this.notes.update({
                noteDescription,
                notePriority,
                noteTitle
            }, {
                where: {
                    noteId
                }
            })
            return isUpdated;
        } catch (error) {
            console.log("Note's Service Error : ", error)
        }
    }

    async deleteNote(noteId: string) {
        try {
            const isDeleted = await this.notes.destroy({
                where: {
                    noteId
                }
            });
            return isDeleted;
        } catch (error) {
            console.log("Note's Service Error : ", error)
        }
    }

    async deleteALlNotes(creatorId: string) {
        try {
            const isDeleted = await this.notes.destroy({
                where: {
                    creatorId
                }
            });
            return isDeleted;
        } catch (error) {
            console.log("Note's Service Error : ", error)
        }
    }
}

export default NotesService;