const { calcular } = require('./src/usecase/clue-usecase.js');
const { stats } = require('./src/usecase/stats-usecase.js');
require('./src/applications/utils/config')

exports.handler = async (event) => {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  if (method === 'POST' && path === '/clue') {
    const body = JSON.parse(event.body);
    const responseClue = await calcular(body.manuscript);
    const response = {
      statusCode: responseClue ? 200 : 403,
    };
    return response;
  }

  else if (method === 'GET' && path === '/stats') {
    const responseStats = await stats();
    const response = {
      statusCode: responseStats.statusCode,
      body: JSON.stringify(responseStats.body),
    };
    return response;
  }

  else {
    const response = {
      statusCode: 404,
      body: JSON.stringify('Recurso no encontrado'),
    };
    return response;
  }
};