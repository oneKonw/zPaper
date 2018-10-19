(function(window) {
  var config = {
    portal: 'https://oneknow.maps.arcgis.com/',

    proxy: 'http://nanping.arcgisonline.cn/Java/proxy.jsp',

    /** App Info */
    signin:
      'https://nanping.arcgisonline.cn/arcgis/cxghgeoplat/viewer/login.html',

    clientId: 'pDYhaIXRAiqvqQwq',
    clientSecret: '256eb09836dc444bbbbd3a6aa6bce742',
    /** END of App Info */

    portalItemId: 'b2609c762c0340d0bfcd619fe4eb026d',

    webMapId: '4802bae21a5241e7861c8e370be21302',

    webSceneId: '3c5f2a43696744418d33b77e78d869b2',

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
