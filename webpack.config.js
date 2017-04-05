module.exports = {

    entry: './index.ts',

    output: {
        filename: 'zhihu-particle.min.js',
        path: './dist',
        library: 'particle',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {
        loaders: [
            {test: /.ts$/, loader: 'awesome-typescript-loader'}
        ]
    }
};