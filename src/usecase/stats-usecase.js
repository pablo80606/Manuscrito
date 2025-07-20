const { selectQuery } = require("../adapters/rds-operations-adapter");


async function stats() {

    const conEncontrado = await selectQuery(global.gConfig.SQL_SELECT_TBL_MANUSCRITO_ENCONTRADO);
    const conNoEncontrado = await selectQuery(global.gConfig.SQL_SELECT_TBL_MANUSCRITO_NOENCONTRADO);
    let ratioc = 0;
    if(conNoEncontrado[0].count == 0){
        ratioc = 0;
    }else{
        ratioc = conEncontrado[0].count/conNoEncontrado[0].count;
    }

    return {
        statusCode: 200,
        body: {
            count_clue_found: conEncontrado[0].count,
            count_no_clue: conNoEncontrado[0].count,
            ratio: ratioc
        }
    };

}
module.exports = { stats };