// const Sequelize = require("sequelize");
// const sequelize = require("../database/connection"); // Importa la instancia de Sequelize

// const ContenidoBoletin = sequelize.define("ContenidoBoletin", {
//   id_contenido_boletin: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   id_boletin: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: "Boletin",
//       key: "id_boletin",
//     },
//   },
//   id_norma: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   nro_norma: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   id_origen: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   fecha_norma: {
//     type: Sequelize.DATE,
//     allowNull: false,
//   },
// });

// module.exports = ContenidoBoletin;
