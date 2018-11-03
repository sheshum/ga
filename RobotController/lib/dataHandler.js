
const fs = require('fs');

/**
 * Saves route to file
 * 
 * @param {Array} route 
 */
function recordRoutes(routes, filename) {
    fs.appendFileSync(filename, JSON.stringify(routes));
} 

function clearData (path) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

function readData(path) {
    let file;
    if(fs.existsSync(path)) {
        file = fs.readFileSync(path);

    }

    if(file) {
        return JSON.parse(file);
    } else {
        return {error: {msg: 'error while reading the data.'}}
    }
}

let dataHandler = {
    recordRoutes: recordRoutes,
    clearData: clearData ,
    readData: readData
};

module.exports = dataHandler;