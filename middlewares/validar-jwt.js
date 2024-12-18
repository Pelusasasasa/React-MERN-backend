const validarJWT = (req, res, next) => {
    const jwt = require('jsonwebtoken');
    // x-token headers

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la validacion'
        })
    };

    try {

        const {uid, name, password} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = uid;
        req.password = password;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }


    next();
};

module.exports = {
    validarJWT
}