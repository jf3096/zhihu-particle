const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        './index.js',
    ],
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                use: ['url-loader']
            }
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
        alias: {
            'react': 'inferno-compat',
            'react-dom': 'inferno-compat'
        }
    },
};
