module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '^/auth': {
                target: 'http://demo.tieraid.be:7999/',
                ws: true,
                changeOrigin: true
            }
        }
    }
};