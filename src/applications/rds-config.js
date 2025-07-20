const { Pool } = require('pg');

let pool;

async function createPool() {
  return new Pool({
    user: global.gConfig.USER_BD,
    host: global.gConfig.HOST_BD,
    database: global.gConfig.NAME_BD,
    password: global.gConfig.PASS_BD,
    port: global.gConfig.PORT_BD,
  });
}

async function getPoolConnectionBD(retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      if (!pool) {
        pool = await createPool();
        console.log("✅ Conexión exitosa a PostgreSQL");
        
        // Si hay un error en el Pool, lo invalida y reintenta la conexión
        pool.on('error', async (err) => {
          console.error("🔥 Error en la conexión de PostgreSQL:", err.message);
          pool.end(); // Cierra conexiones activas
          pool = null; // Invalida el pool
          await getPoolConnectionBD(); // Reintenta la conexión
        });
      }
      
      return pool;
    } catch (error) {
      console.warn(`⚠️ Intento ${i + 1} fallido: ${error.message}`);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error("🚨 No se pudo conectar a PostgreSQL después de varios intentos.");
        throw error;
      }
    }
  }
}

module.exports = { getPoolConnectionBD };