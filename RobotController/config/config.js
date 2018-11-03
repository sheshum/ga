const path = require('path');

let rel_path = path.join(__dirname, '../dist/routes.json');

module.exports = {
    filename: 'routes.json',
    file_path: rel_path
}