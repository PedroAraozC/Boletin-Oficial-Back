// // const Sequelize = require('sequelize');
// // const sequelize = require('../database/connection'); // Importa la instancia de Sequelize
// const Boletin = require('./models/boletin');
// const ContenidoBoletin = require('./models/contenidoBoletin');
// const Norma = require ('./models/norma')
// const Origen = require('./models/origen');

// // Relaciones entre Boletin y ContenidoBoletin
// Boletin.hasMany(ContenidoBoletin, { foreignKey: 'id_boletin' });
// ContenidoBoletin.belongsTo(Boletin, { foreignKey: 'id_boletin' });

// // Relación entre ContenidoBoletin y Norma
// ContenidoBoletin.belongsTo(Norma, { foreignKey: 'id_norma' });

// // Relación entre ContenidoBoletin y Origen
// ContenidoBoletin.belongsTo(Origen, { foreignKey: 'id_origen' });

// // Otros tipos de relaciones si es necesario

// module.exports = sequelize;
