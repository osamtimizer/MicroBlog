const path = require('path');

module.exports = {
    mode: 'development',
    entry: './dist/src/frontend/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/js')
    }

}