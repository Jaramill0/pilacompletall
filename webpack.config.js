module.exports = {
    // Se Especifica el Archivo de Entrada
    entry: './client/index.js',
    // Se Espesifica el Archivo de Salida
    output: {
        path: '/public', // ruta Absoluta de la salida
        filename:'bundle.js' // Este es el nombre del archivo de salida
    },
    devServer:{
        contentBase:'./public'
    }
}