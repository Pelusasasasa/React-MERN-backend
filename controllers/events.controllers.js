const eventsCTRL = {};

const Evento = require('../models/Evento');

eventsCTRL.getEventos = async(req, res) => {

    const eventos = await Evento.find().populate('user','name');

    res.json({
        ok: true, 
        eventos
    })
};

eventsCTRL.crearEvento = async(req, res) => {
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const enventoGuardado = await evento.save();

        res.json({
            ok:true,
            evento: enventoGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    } 
};
eventsCTRL.putEventos = async(req, res) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );
        
        if (!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento No existe por ese id'
            })
        };

        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este Evento'
            })
        };

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

        res.json({
            ok: true,
            evento:eventoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })   
    }
};
eventsCTRL.deleteEventos = async(req, res) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );
        
        if (!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento No existe por ese id'
            })
        };

        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este Evento'
            })
        };

        const eventoEliminado = await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
            evento:eventoEliminado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })   
    }
};

module.exports = eventsCTRL;