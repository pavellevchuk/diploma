"use strict";var precacheConfig=[["/diploma/index.html","8505d1168ce2a051765d0ffb3026ae80"],["/diploma/static/css/main.bc0c4e92.css","dadb961c8fbcb3c547c2043d1ef1e21c"],["/diploma/static/js/main.d3d73521.js","e13534ca594b07a5444118c7683dcaa0"],["/diploma/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/diploma/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/diploma/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/diploma/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/diploma/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/diploma/static/media/new-deals__product_1.98300308.jpg","98300308beffe1eac6cd27673f556928"],["/diploma/static/media/new-deals__product_2.7cb85f96.jpg","7cb85f9610309ba9a830bd78a113b0b5"],["/diploma/static/media/product-card__favourite-product-slider-item-1.7477fd1e.png","7477fd1e8831e5b48f43ecdb8a611d3b"],["/diploma/static/media/product-card__favourite-product-slider-item-2.3dc1bb2d.png","3dc1bb2d39dba0437d5960dd26d00fb1"],["/diploma/static/media/product-card__favourite-product-slider-item-3.2a1868ad.png","2a1868ad3c3b72c5df8a53ee099da5dc"],["/diploma/static/media/product-catalogue__overlooked-slider-item-1.f423f579.png","f423f579d1dd97c25a0c6585c906133b"],["/diploma/static/media/product-catalogue__overlooked-slider-item-2.91cb383f.png","91cb383f3f1fb775254bf2e9d96f7f5e"],["/diploma/static/media/product-catalogue__overlooked-slider-item-3.9f375324.png","9f375324f5dec4499d102cca7adbe753"],["/diploma/static/media/product-catalogue__overlooked-slider-item-4.5e842c73.png","5e842c7301a612fb2632fdbcbcb5dee2"],["/diploma/static/media/product-catalogue__overlooked-slider-item-5.350013cd.png","350013cd87b92b71a4e7adb49ee6bd09"],["/diploma/static/media/sales-and-news__item_1.5e217ba5.jpg","5e217ba5253e6079c243bef0b195aabd"],["/diploma/static/media/sales-and-news__item_2.57c5128c.jpg","57c5128c1752d71448ee3223b456e52e"],["/diploma/static/media/sales-and-news__item_3.f53060a0.jpg","f53060a0f4f10f211dd12521c15b9fd4"],["/diploma/static/media/sales-and-news__item_4.b11b7687.jpg","b11b7687a55b887bdd2ea3ea1eaa1687"],["/diploma/static/media/slider.d613d452.jpg","d613d452bebe22d8b7d737ec12001e04"],["/diploma/static/media/slider180deg.54638011.jpeg","54638011c75501dec7517369019fc591"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/diploma/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});