(function(window) {
  var config = {
    portal: 'http://nanping.arcgisonline.cn/arcgis/',

    proxy: 'http://nanping.arcgisonline.cn/Java/proxy.jsp',

    /** App Info */
    signin:
      'https://nanping.arcgisonline.cn/arcgis/cxghgeoplat/viewer/login.html',

    clientId: 'pDYhaIXRAiqvqQwq',
    clientSecret: '256eb09836dc444bbbbd3a6aa6bce742',
    /** END of App Info */

    portalItemId: 'b2609c762c0340d0bfcd619fe4eb026d',

    webMapId: 'dfded70cf4d743c8892c860be35278b1',

    webSceneId: 'abb27cba2fe0499ba650013df49ae1be',

    splitItemIdone: '2c3b36b9244848b9a33b13b21ef5745f',

    splitItemIdtwo: '2c3b36b9244848b9a33b13b21ef5745f',

    multidateItemone:
      'http://218.2.231.245/mapjs2/rest/services/History/js_yxdt_1966/MapServer',

    multidateItemtwo:
      'http://218.2.231.245/mapjs2/rest/services/History/js_yxdt_1976/MapServer',

    multidateItemthree:
      'http://218.2.231.245/mapjs2/rest/services/History/js_yxdt_1966/MapServer',

    multidateItemfour:
      'http://218.2.231.245/mapjs2/rest/services/History/js_yxdt_1976/MapServer',

    multidateItemfive:
      'http://218.2.231.245/mapjs2/rest/services/History/js_yxdt_1966/MapServer',

    initialExtent: {
      center: [118.17, 26.65],
      zoom: 9,
    },

    basemaps: {
      // default2d: {
      //   url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
      // },
      default2d: 'osm',
      // default3d: {
      //   url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
      // },
      default3d: 'osm',
    },
  };

  var searchConfig = {
    tianditu: {
      queryBound: '-180,90,180,90',
    },
  };

  window.geosearchcfg = searchConfig;
  window.appcfg = config;
})(window);
