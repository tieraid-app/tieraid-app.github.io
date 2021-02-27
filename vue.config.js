
const path = require('path');
module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: 'http://demo.tieraid.be:7999/'
    }
};