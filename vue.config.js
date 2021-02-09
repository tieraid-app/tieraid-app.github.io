module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '^/auth': {
                target: 'http://demo.tieraid.be:8000/',
                ws: true,
                changeOrigin: true
            }
        }
    }
};