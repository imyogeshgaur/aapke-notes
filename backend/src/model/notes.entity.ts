import { config } from 'dotenv'
import { resolve } from 'path'
import { DataTypes, Sequelize } from 'sequelize';
config({ path: resolve("src/.env") })

const sequelize = new Sequelize(process.env.DB_URL as string, {
    dialectOptions: {
        timezone: "+05:30"
    },
    timezone: "+05:30",
});

const Notes = sequelize.define("Notes", {
    noteId: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    notePriority: {
        type: DataTypes.STRING,
        defaultValue: "LOW",
        allowNull:false
    },
    noteTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noteDescription: {
        type: DataTypes.STRING,
    },
    creatorId:{
        type:DataTypes.UUID
    }
})

Notes.sync({ alter: true })

export default Notes;
