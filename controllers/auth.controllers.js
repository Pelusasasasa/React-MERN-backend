const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require("../helpers/jtw");

const userCTRL = {};

userCTRL.crearUsuario = async(req,res) => {

    try {
        const {name, email, password} = req.body;

        let usuario = await Usuario.findOne({email});

        if (usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correro'
            })
        };

        usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT( usuario._id, usuario.password);

        const errors = validationResult( req );

        res.status(201).json({
            ok: true,
            name,
            email,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

};

userCTRL.loginUsuario = async(req, res) => {

    const {email, password} = req.body;

   try {
     let usuario = await Usuario.findOne({email});

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese mail'
            })
        };


        //confirmar los password
        const validPassword = bcrypt.compareSync(password,  usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            })
        };

        //Generar JTW
        const token = await generarJWT( usuario._id, usuario.password);
        res.json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token

        })

   } catch (error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
    })
   }

   

};

userCTRL.revalidarToken = async(req, res) => {
        const uid = req.uid;
        const password = req.password;

        const token = await generarJWT( uid, password);


        res.json({
            ok: true,
            token
        })
};


module.exports = userCTRL;