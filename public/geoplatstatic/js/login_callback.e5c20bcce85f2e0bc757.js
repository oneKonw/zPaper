webpackJsonp([3],{"5vbc":function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=o("mvHQ"),a=o.n(t),r=o("mw3O"),i=o.n(r),s=o("lbHh"),c=o.n(s),u=o("mtWM"),l=o.n(u),p=i.a.parse(window.location.search,{ignoreQueryPrefix:!0});if(p){var w=p.returnUrl,d=window.location.hash,m=i.a.parse(d.substr(1)),h=m&&m.username;if(c.a.set("arcgisLocale","zh-cn",{path:"/",domain:"."+window.location.hostname}),m&&m.access_token){var f=(window.configOptions&&window.configOptions.portalAdminUrl||window.appcfg.portal)+"/sharing/rest/community/users/"+h+"?f=json&token="+m.access_token;l.a.get(f).then(function(e){if(200===e.status){var n=e.data,o=new Date,t=Math.min(7200,Number(m.expires_in)),r=new Date(o.setSeconds(o.getSeconds()+Number(t))),i={email:n.username,privacy:n.privacy,token:m.access_token,culture:n.culture&&n.culture.toLowerCase()||"",region:n.region,expires:r&&r.getTime()||null,persistent:void 0,portalApp:!0};n.orgId&&n.role&&(i.accountId=n.orgId,i.role=n.role);var s=a()(i);c.a.set("esri_auth",s,{path:"/",domain:"."+window.location.hostname})}}).then(function(){w&&(window.location.href=w)})}}}},["5vbc"]);
//# sourceMappingURL=login_callback.e5c20bcce85f2e0bc757.js.map