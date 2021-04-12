const FileLoader = require('file-loader');
module.exports = {
    module: {
        rules: [{
            test: /\.(gif|png|jpg|jpeg|svg)?$/,
            loader: 'file-loader',
            options: {
                name: 'assets/img/[name].[ext]',
            },
        }]
    },
    plugins: [
        new FileLoader()
    ]
}