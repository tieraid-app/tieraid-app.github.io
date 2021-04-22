const path = require('path');

const domain = process.argv.slice(3).join().replace('--DOMAIN=', ''); 
if(domain) {
    process.env.VUE_APP_DOMAIN = domain;
}

module.exports = {
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        proxy: 'http://demo.tieraid.be:7999/'
    }
};