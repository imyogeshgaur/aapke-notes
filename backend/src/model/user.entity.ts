import { config } from 'dotenv'
import { resolve } from 'path'
import { DataTypes, Sequelize } from 'sequelize';
config({ path: resolve("src/.env") })

const sequelize = new Sequelize(process.env.DB_URL as string,{
    dialectOptions:{
        timezone: "+05:30"
    },
    timezone: "+05:30", 
});

const User = sequelize.define("User", {
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

User.sync({ alter: true })

export default User;
