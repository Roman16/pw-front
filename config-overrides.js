const path = require('path');
const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy, addWebpackAlias }
    = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true
    }),
    addDecoratorsLegacy(),
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    })
);