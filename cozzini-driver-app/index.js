
const createAzureFunctionHandler = require("azure-function-express").createAzureFunctionHandler;
const app = require('../server');

// Binds the express app to an Azure Function handler
module.exports = createAzureFunctionHandler(app);

