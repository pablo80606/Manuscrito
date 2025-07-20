const { insertDataBase } = require("../adapters/rds-operations-adapter");

async function calcular(manuscript) {

    const rows = manuscript.length;
    const cols = manuscript[0].length;

    // Verificar horizontalmente
    /*
      [X][X][X][X]
    */
    function horizontal() {
        for (let i = 0; i < rows; i++) {
            let count = 1;
            for (let j = 1; j < cols; j++) {
                if (manuscript[i][j] === manuscript[i][j - 1] && manuscript[i][j] !== undefined) {
                    count++;
                    if (count === 4) {
                        console.log(horizontal);
                        return true;
                    }
                } else {
                    count = 1;
                }
            }
        }
        return false;
    }

    // Verificar verticalmente
    /*
    [X]
    [X]
    [X]
    [X]
  */
    function vertical() {
        for (let j = 0; j < cols; j++) {
            let count = 1;
            for (let i = 1; i < rows; i++) {
                if (manuscript[i][j] === manuscript[i - 1][j] && manuscript[i][j] !== undefined) {
                    count++;
                    if (count === 4) {
                        console.log(vertical);
                        return true;
                    }
                } else {
                    count = 1;
                }
            }
        }
        return false;
    }

    // Verificar diagonal (de izquierda a derecha)
        /*
    [X]
        [X]
            [X]
                [X]
  */
    function diagonalIzquierda() {
        for (let i = 0; i < rows - 3; i++) {
            for (let j = 0; j < cols - 3; j++) {
                let char = manuscript[i][j];
                if (
                    char === manuscript[i + 1][j + 1] &&
                    char === manuscript[i + 2][j + 2] &&
                    char === manuscript[i + 3][j + 3]
                ) {
                    console.log(diagonalIzquierda);
                    return true;
                }
            }
        }
        return false;
    }

    // Verificar diagonal ↙ (de derecha a izquierda)
    /*
                [X]
            [X]
        [X]
    [X]
  */
    function diagonalDerecha() {
        for (let i = 0; i < rows - 3; i++) {
            for (let j = 3; j < cols; j++) {
                let char = manuscript[i][j];
                if (
                    char === manuscript[i + 1][j - 1] &&
                    char === manuscript[i + 2][j - 2] &&
                    char === manuscript[i + 3][j - 3]
                ) {
                    console.log(diagonalDerecha);
                    return true;
                }
            }
        }
        return false;
    }
    const responseState = horizontal() || vertical() || diagonalIzquierda() || diagonalDerecha()
    const data = [manuscript, responseState]
    await insertDataBase(global.gConfig.SQL_INSERT_TBL_MANUSCRITO, data);
    return responseState
}

module.exports = {
    calcular
}