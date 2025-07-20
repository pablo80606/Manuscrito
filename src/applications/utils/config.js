const config = require('../resources/config.json');

const isRunningOnAWS = !!process.env.AWS_LAMBDA_FUNCTION_NAME;

if (isRunningOnAWS) {
  console.info("🚀 Ejecutando en AWS Lambda");
  global.gConfig = config.cloud;

} else {
  console.info("🖥️ Ejecutando en ambiente local");
  global.gConfig = config.local;
}