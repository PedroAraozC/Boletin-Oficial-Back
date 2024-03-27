// const Sequelize = require("sequelize");
// const sequelize = require("../database/connection"); // Importa la instancia de Sequelize

// const Norma = sequelize.define("Norma", {
//   id_norma: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   tipo_norma: {
//     type: Sequelize.STRING(25),
//     allowNull: false,
//   },
//   habilita: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//   },
// });

// module.exports = Norma;

// // const { Schema, model } = require('mongoose');
// // const mongooseUniqueValidator = require('mongoose-unique-validator');

// // const NormaSchema = new Schema(
// //   {
// //     tipoNorma: {
// //       type: String,
// //       unique: true,
// //       trim: true,
// //       lowercase: true,
// //       minLength: [3, "Debe tener al menos 4 caracteres"],
// //       maxLength: [30, "Debe tener como máximo 20 caracteres"],
// //       required: [true, "El tipo de norma es requerida"],
// //     },
// //     estado: {
// //       //borrado logico
// //       type: Boolean,
// //       default: true,
// //     },
// //   },
// //   {
// //     versionKey: false,
// //     timestamps: false,
// //   }
// // );

// // UserSchema.plugin(mongooseUniqueValidator, {
// //   message: '{PATH} debe ser único'
// // })

// // module.exports = model('TipoNorma', NormaSchema)
