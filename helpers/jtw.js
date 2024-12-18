const jwt = require('jsonwebtoken');


const generarJWT = (uid, password) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, password};
        console.log(payload)

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err){
                console.log(error);
                reject('No se pudo generar el token')
            };
            resolve(token)
        })
    })

};

module.exports = {
    generarJWT
}