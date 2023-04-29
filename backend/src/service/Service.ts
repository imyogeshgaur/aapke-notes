import { v1 } from "uuid";
import say from "say";
import Model from "../model/Model";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from 'dotenv'
import { resolve } from 'path'
import Helper from "../helpers/Helper";
config({ path: resolve("src/.env") })

namespace Service {
    export class NotesService {
        private notes;
        constructor() {
            this.notes = Model.Notes;
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

        async playNote(data: any) {
            try {
                const { noteDescription, noteTitle, notePriority } = data
                say.speak(`Hey User, this note is of ${notePriority} priority. The Title of note is, "${noteTitle}, and, it's as follows, ${noteDescription}`)
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

    //! User Service
    export class UserService {
        private user;
        constructor() {
            this.user = Model.User;
        }
        async signUpUser(data: any) {
            try {
                const { userName, email, password } = data;
                if (!userName || !email || !password) {
                    return { user: -1 };
                } else {
                    const newPassword = await bcryptjs.hash(password, 12);
                    const isExist = await this.user.findOne({
                        where: {
                            email
                        }
                    });
                    if (isExist) {
                        return { user: 0 };
                    } else {
                        const newUser = await this.user.create({
                            userId: v1(),
                            ...data,
                            password: newPassword
                        });
                        const userToSave = await newUser.save()
                        return { user: userToSave }
                    }
                }
            } catch (error) {
                console.log("User's Service Error : ", error)
            }
        }

        async loginUserByUserName(data: any) {
            try {
                const { email, password } = data;
                const isExist: any = await this.user.findOne({
                    where: {
                        userName: email
                    }
                })
                if (isExist) {
                    const match = await bcryptjs.compare(password, isExist.password)
                    if (match) {
                        const token = jsonwebtoken.sign({ userId: isExist.userId }, process.env.JWT_SECRET as string)
                        return { token }
                    } else {
                        return { token: 0 };
                    }
                } else {
                    return { token: -1 };
                }
            } catch (error) {
                console.log("User's Service Error : ", error)
            }
        }
        async loginUserByEmail(data: any) {
            try {
                const { email, password } = data;
                const isExist: any = await this.user.findOne({
                    where: {
                        email
                    }
                })
                if (isExist) {
                    const match = await bcryptjs.compare(password, isExist.password)
                    if (match) {
                        const token = jsonwebtoken.sign({ userId: isExist.userId }, process.env.JWT_SECRET as string)
                        return { token }
                    } else {
                        return { token: 0 };
                    }
                } else {
                    return { token: -1 };
                }
            } catch (error) {
                console.log("User's Service Error : ", error)
            }
        }

        async forgetPasswordEmail(email: string) {
            try {
                const isExist: any = await this.user.findOne({
                    where: {
                        email
                    }
                })
                if (isExist) {
                    return await Helper.passwordResetMail(isExist.email, isExist.userId)
                } else {
                    return 0;
                }
            } catch (error) {
                console.log("User's Service Error : ", error)
            }
        }
        async forgetPasswordUserName(userName: string) {
            try {
                const isExist: any = await this.user.findOne({
                    where: {
                        userName
                    }
                })
                if (isExist) {
                    return await Helper.passwordResetMail(isExist.email, isExist.userId)
                } else {
                    return 0;
                }
            } catch (error) {
                console.log("User's Service Error : ", error)
            }
        }

        async resetPassword(password: string, userId: string) {
            try {
                const newPassword = await bcryptjs.hash(password, 12);
                const update = await this.user.update({
                    password: newPassword
                }, {
                    where: {
                        userId
                    }
                })
                return update
            } catch (error) {
                console.log("User's Service Error : ", error)
            }
        }
    }
}

export default Service;