const path = require('path');
const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy, addWebpackAlias }
    = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
        modifyVars: { '@primary-color': '#6D6DF6' }
    }),
    addLessLoader({
        javascriptEnabled: true
    }),
    addDecoratorsLegacy(),
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    }),
);