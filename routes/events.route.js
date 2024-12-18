const { Router } = require("express");
const { getEventos, crearEvento, putEventos, deleteEventos } = require("../controllers/events.controllers");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const { check } = require("express-validator");

const router = Router()
//Obtener eventos
router.use(validarJWT)
router.get('/', getEventos);

router.post(
    '/',
    [
        check('title', 'El titulo es Obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        // check('end', 'La fecha de fin es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearEvento);

router.put('/:id', putEventos);
router.delete('/:id', deleteEventos);


module.exports = router;