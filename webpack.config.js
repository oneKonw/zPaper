module.exports = function(webpackConfig, env) {
  webpackConfig.output.libraryTarget = 'amd';

  webpackConfig.module.rules.forEach((r) => {
    if (r.loader === 'babel') {
      r.options.plugins.push(['import', { libraryName: 'antd', style: 'css' }]);
      if (env === 'development') {
        r.options.plugins.push('dva-hmr');
      }
    }
  });

  // webpackConfig.devServer = {
  //   https: true,
  //   proxy: {
  //     '/proxy': {
  //       target: 'http://localhost/proxy.ashx',
  //       changeOrigin: true,
  //       pathRewrite: { '^/proxy': '' },
  //     },
  //   },
  // };

  webpackConfig.externals = [
    (context, request, callback) => {
      if (
        /^dojo/.test(request) ||
        /^dojox/.test(request) ||
        /^dijit/.test(request) ||
        /^esri\//.test(request)
      ) {
        return callback(null, `amd ${request}`);
      }
      callback();
    },
  ];

  return webpackConfig;
};
