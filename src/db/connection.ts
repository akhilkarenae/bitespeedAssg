import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

const result = dotenv.config({path:"./.env.dev"})

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as  string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD as string
const dbPort = process.env.DB_PORT as unknown as number

// console.log("db name: "+dbName,"db user: "+dbUser,"db host: "+dbHost,"db password: "+dbPassword,"db port: "+dbPort)
export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host:dbHost,
    port: dbPort,
    dialect: 'mysql'
})

const dbConnection = async() =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default dbConnection;