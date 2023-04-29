import { config } from 'dotenv'
import { resolve } from 'path'
import { DataTypes, Sequelize } from 'sequelize';
config({ path: resolve("src/.env") })

namespace Model {
    const sequelize = new Sequelize(process.env.DB_URL as string, {
        dialectOptions: {
            timezone: "+05:30"
        },
        timezone: "+05:30",
    });

    //? Notes Model
    export const Notes = sequelize.define("Notes", {
        noteId: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        notePriority: {
            type: DataTypes.STRING,
            defaultValue: "LOW",
            allowNull: false
        },
        noteTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        noteDescription: {
            type: DataTypes.STRING,
        },
        creatorId: {
            type: DataTypes.UUID
        }
    })

    //! User Model
    export const User = sequelize.define("User", {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Notes.sync({ alter: true })
    User.sync({ alter: true })
}

export default Model;