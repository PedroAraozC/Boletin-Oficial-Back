const sftp = require("ssh2-sftp-client"); // Importar el módulo completo

const conectarSFTP = async () => {
  try {
    const client = new sftp(); // Crear una instancia del cliente
    await client.connect({
      host: process.env.HOST_WINSCP,
      username: process.env.USER_WINSCP,
      password: process.env.PASSWORD_WINSCP,
    });
    return client;
  } catch (error) {
    console.error("Error de conexión SFTP:", error);
    throw error;
  }
};

module.exports = { conectarSFTP };
