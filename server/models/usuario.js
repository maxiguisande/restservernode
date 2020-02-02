const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    imagen: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: 'USER_ROL',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: 'El campo {PATH} debe ser unico'
});

module.exports = mongoose.model('Usuario', usuarioSchema);