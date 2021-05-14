const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    'modules': false,
                                    'useBuiltIns': 'usage',
                                    'targets': "> 0.25%, not dead",
                                    'corejs': 3
                                }
                            ]
                        ],
                        "plugins": [
                            [
                                "module-resolver",
                                {
                                    "root": ["./"],
                                    "alias": {
                                        "@client": "./client",
                                    }
                                }
                            ]
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/app.css'
        })
    ]
}