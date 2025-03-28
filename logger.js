const fs = require('fs').promises;
const path = require('path');

const errorsLogPath = path.join(__dirname, 'errors.log');

const logError = async (error) => {
    try {
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp}: ${error}\n-----\n`;
        await fs.appendFile(errorsLogPath, logEntry);
    } catch (error) {
        console.log(`Error during saving log file\nerror: ${error.message}`);
    }
};

module.exports = logError;
module.exports.errorsLogPath = errorsLogPath;