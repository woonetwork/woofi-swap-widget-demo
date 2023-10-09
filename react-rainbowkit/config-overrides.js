/* config-overrides.js */
const { overrideDevServer, } = require('customize-cra');
const addProxy = () => (configFunction) => {
    configFunction.proxy = {
        '/api/': {
            target: '',
            changeOrigin: true,
            pathRewrite: { '^/api': '/' },
        },
    };

    return configFunction;
}
module.exports = {
    devServer: overrideDevServer(
        addProxy()
    )
}