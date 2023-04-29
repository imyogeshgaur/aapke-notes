import { Request, Response } from "express";
import Service from "../service/Service";

namespace Controller {

    export class UserController {
        private req: Request;
        private res: Response;
        private service: Service.UserService;
        constructor(request: Request, response: Response) {
            this.req = request;
            this.res = response;
            this.service = new Service.UserService();
        }

        async signUpUser() {
            try {
                const data = this.req.body;
                const value: any = await this.service.signUpUser(data);
                switch (value.user) {
                    case -1:
                        return this.res.status(200).send({ message: "Please Fill ALl Data !!!" })
                    case 0:
                        return this.res.status(200).send({ message: "User already exist !!!" })
                    default:
                        return this.res.status(200).send({ message: "Welcome to our Platform !!!", user: value.user })
                }
            } catch (error) {
                console.log("User's Controller Error : ", error)
            }
        }

        async loginUser() {
            try {
                const email = this.req.body.email;
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                    const value: any = await this.service.loginUserByEmail(this.req.body);
                    switch (value.token) {
                        case -1:
                            return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                        case 0:
                            return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                        default:
                            return this.res.status(200).send({ token: value.token })
                    }
                } else {
                    const value: any = await this.service.loginUserByUserName(this.req.body);
                    switch (value.token) {
                        case -1:
                            return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                        case 0:
                            return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                        default:
                            return this.res.status(200).send({ token: value.token })
                    }
                }
            } catch (error) {
                console.log("User's Controller Error : ", error)
            }
        }

        async forgetPassword() {
            try {
                const email = this.req.body.email;
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                    const value: any = await this.service.forgetPasswordEmail(email);
                    switch (value.token) {
                        case 0:
                            return this.res.status(200).send({ message: "Invalid Credentials !!!", })
                        default:
                            return this.res.status(200).send({ message: value.message })
                    }
                } else {
                    const value: any = await this.service.forgetPasswordUserName(email);
                    switch (value) {
                        case 0:
                            return this.res.status(200).send({ message: "Invalid Credentials !!!", value })
                        default:
                            return this.res.status(200).send({ message: value.message })
                    }
                }
            } catch (error) {
                console.log("User's Controller Error : ", error)
            }
        }

        async resetPassword() {
            try {
                const password = this.req.body.password;
                const userId = this.req.params.id;
                const data: any = await this.service.resetPassword(password, userId);
                if (data[0]) {
                    return this.res.status(200).send({ message: "Password Reset Successfully !!!" })
                } else {
                    return this.res.status(200).send({ message: "Password Not Reset Successfully !!!" })
                }
            } catch (error) {
                console.log("User's Controller Error : ", error)
            }
        }
    }

    //! User Controller 
    export class NotesController {
        private req: Request;
        private res: Response;
        private service: Service.NotesService;
        constructor(request: Request, response: Response) {
            this.req = request;
            this.res = response;
            this.service = new Service.NotesService();
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
}

export default Controller;