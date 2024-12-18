const mongoose = require('mongoose');
require('dotenv').config();
const DB_CNN = process.env.DB_CNN;

const dbConnection = async() => {
    try {
        await mongoose.connect(`mongodb://${DB_CNN}/calendar`);
        console.log('DB CONNECT')
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar base de datos')
    }
};

module.exports = dbConnection