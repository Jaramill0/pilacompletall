const path = require('path');
module.exports = {
    // Establecer el modo de desarrollo
    mode: 'development',
    // Espesificando el archivo de entrada
    entry: './client/index.js',
    // Espesificar la Salida 
    output: {
        path: path.join(__dirname, 'public'),
        // nombre del archivo de salida
        filename: 'js/bunlde.js',
        // Ruta del Path Publico para fines del servidor de desarrollo
        publicPath: '/'
    },
    devServer:{
        contentBase: path.join(__dirname,'public'),
        port : 8085,
        host: 'localhost'
    }
}