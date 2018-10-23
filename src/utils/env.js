export default {
  getPortal() {
    return window.appcfg.portal;
  },

  getPortalItem() {
    return window.appcfg.portalItemId;
  },

  getWebMapId() {
    return window.appcfg.webMapId;
  },

  getWebSceneId() {
    return window.appcfg.webSceneId;
  },
  getParamAgs() {
    return window.agsGlobal;
  },

  setParamAgs(paramAgs) {
    window.agsGlobal = paramAgs;
  },

  getBuildLayerId() {
    return window.appcfg.buildLayerId;
  },
  // ——————————————————————————————————————
};
