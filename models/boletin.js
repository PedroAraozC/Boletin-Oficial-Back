// const Sequelize = require('sequelize');
// const sequelize = require('../database/connection'); // Importa la instancia de Sequelize

// const Boletin = sequelize.define('Boletin', {
//   // id_boletin: {
//   //   type: Sequelize.INTEGER,
//   //   primaryKey: true,
//   //   autoIncrement: true
//   // },
//   nro_boletin: {
//     type: Sequelize.STRING(25),
//     unique: true,
//     allowNull: false
//   },
//   fecha_publicacion: {
//     type: Sequelize.DATE,
//     allowNull: false
//   },
//   // habilita: {
//   //   type: Sequelize.BOOLEAN,
//   //   allowNull: false
//   // }
// });

// module.exports = Boletin;


// const { Schema, model } = require("mongoose");
// const mongooseUniqueValidator = require("mongoose-unique-validator");

// const BoletinSchema = new Schema(
//   {
//     fechaBoletin: {
//       type: String,
//       required: [true, "La fecha es requerida"],
//       ref: "fechaBoletin",
//     },
//     estado: {
//       //borrado logico
//       type: Boolean,
//       default: true,
//       ref: "estado",
//     },
//     nroBoletin: {
//       type: Number,
//       unique: [true, "Ya existe un Boletin con ese número"],
//       required: [true, "El Nº de Boletin es requerido"],
//       ref: "nroBoletin",
//     },
//     // rutaPdf: {
//     //   type: String,
//     //   trim: true,
//     // },
//     // archivoBoletin:{
//     //   type: Buffer,
//     //   ref: "archivoBoletin",
//     // },
//     nroDecreto: [
//       {
//         type: Number,
//         ref: "nroDecreto",
//       },
//     ],
//     nroOrdenanza: [
//       {
//         type: Number,
//         ref: "nroOrdenanza",
//         // required: [true, "El numero de ordenanza es requerido"],
//       },
//     ],
//     nroResolucion: [
//       {
//         type: Number,
//         ref: "nroResolucion",
//         // required: [true, "El numero de resolucion es requerido"],
//       },
//     ],
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// BoletinSchema.plugin(mongooseUniqueValidator, {
//   message: "{PATH} debe ser único",
// });

// module.exports = model("boletin", BoletinSchema);
