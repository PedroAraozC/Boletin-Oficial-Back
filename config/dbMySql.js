const mysql = require("mysql2/promise");

const conectarMySql = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST_BOL,
      user: process.env.USER_BOL,
      password: process.env.PASSWORD_BOL,
      database: process.env.DB_BOL,
    });
    return connection;
  } catch (error) {
    console.error("Error de conexiÃ³n MySql:", error);
    throw error;
  }
};
module.exports = { conectarMySql };
