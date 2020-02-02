const express = require('express');
const app = express();
const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const salt = bcrypt.genSaltSync(10);

app.get('/usuario', function(req, resp) {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;
    let status = {
        estado: true
    }

    Usuario.find(status, 'nombre email imagen rol google estado')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.count(status, (err, count) => {

                resp.json({
                    ok: true,
                    usuarios,
                    count
                });
            })
        });

});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        rol: body.rol
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.status(201).json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'imagen', 'rol']);

    let options = {
        new: true,
        runValidators: true
    };

    Usuario.findByIdAndUpdate(id, body, options, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    /*
    Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
    */

    let status = { estado: false };

    Usuario.findByIdAndUpdate(id, status, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


module.exports = app;