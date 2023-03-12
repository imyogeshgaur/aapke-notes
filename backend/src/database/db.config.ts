import { Sequelize } from 'sequelize'

const connectDb = async (url: string) => {
    console.log(url)
    const sequelize = new Sequelize(url,{
        dialectOptions:{
            timezone: "+05:30"
        },
        timezone: "+05:30", 
    });
    try {
        await sequelize.authenticate();
        console.log("Connected Successfully !!!")
    } catch (error) {
        console.log("Error in  Connection : ", error)
    }
}

export default connectDb;