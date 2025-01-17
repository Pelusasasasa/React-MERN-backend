const {Schema, model} = require('mongoose');

const Usuario = new Schema({

    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});


module.exports = model('Usuario', Usuario);