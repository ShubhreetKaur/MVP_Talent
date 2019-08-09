module.exports = {
    mode: 'development',
    context: __dirname,
    entry:
    {
        Home: "./index.jsx",
        Customer: './customer.jsx',
        Product: './product.jsx',
        Store: './store.jsx',
        Sales: './sales.jsx',
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            }
        }]
    }
}
