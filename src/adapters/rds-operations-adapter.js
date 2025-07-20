const { getPoolConnectionBD } = require('../applications/rds-config');

async function selectQuery(query) {
    const client = await getPoolConnectionBD();
    try {
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        
    }
}

async function insertDataBase(query, data) {
    const client = await getPoolConnectionBD();
    try {
      const res = await client.query(query, data);
     } catch (error) {
        if (error.message.includes("duplicate")){
            return "CLUE YA EXISTE"
        }else{
            throw new Error(`Error en la ejecución de consulta ${query} en PG: ${error}`);
        }
    }
};

module.exports = { selectQuery, insertDataBase };