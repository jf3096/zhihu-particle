module.exports = {

    entry: './index.ts',

    output: {
        filename: 'index.js',
        path: './dist'
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {
        loaders: [
            {test: /.ts$/, loader: 'ts-loader'}
        ]
    }
};