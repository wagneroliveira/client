var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    name: {
        type: String
        // required: [true, 'O campo NOME é obrigatório!']
    },
    cpf: {
        type: String,
        // index: true,
        // unique: [true, 'O CPF inserido já está cadastrado'],
        // sparse: true
    },
    phone: {
        type: String,
        // required: [true, 'O campo TELEFONE é obrigatório!']
    },
    address: String,
}, {versionKey: false});

module.exports = mongoose.model("Client", clientSchema);
