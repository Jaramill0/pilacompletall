const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Importando el ESLINT
const eslintPlugin = require('eslint-webpack-plugin');

module.exports = {
    // Establecer el modo de desarrollo
    mode: 'development',
    // Espesificando el archivo de entrada
    entry: './client/index.js',
    // Espesificar la Salida 
    output: {
        path: path.join(__dirname, 'public'),
        // nombre del archivo de salida
        filename: 'js/bundle.js',
        // Ruta del Path Publico para fines del servidor de desarrollo
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: process.env.PORT || '3000',
        host: 'localhost'
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
                                    'targets': {"chrome":"80"},
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
        }),
        new eslintPlugin({})
    ]
}