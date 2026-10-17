/* AVC PCTT PWA Service Worker - V1.0.0 */
const VERSION='1.0.0';
const SHELL_CACHE=`avc-pctt-shell-${VERSION}`;
const DATA_CACHE=`avc-pctt-data-${VERSION}`;
const APP_SHELL=[
  './','./index.html','./offline.html','./manifest.webmanifest',
  './icons/icon-192.png','./icons/icon-512.png',
  './icons/icon-maskable-192.png','./icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(SHELL_CACHE).then(cache=>cache.addAll(APP_SHELL)));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('avc-pctt-')&&!([SHELL_CACHE,DATA_CACHE].includes(k))).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING') self.skipWaiting();
});

const isMapOrWeather=u=>/(windy\.com|google\.com|googleapis\.com|gstatic\.com|openstreetmap\.org)/i.test(u.hostname);
const isLikelyDataRequest=u=>{
  if(/supabase\.co$/i.test(u.hostname)) return !/\/auth\/v1\//i.test(u.pathname);
  if(/pctt\.danang\.gov\.vn$/i.test(u.hostname)) return true;
  if(/vercel\.app$/i.test(u.hostname)&&/\/api\//i.test(u.pathname)) return true;
  if(/\/api\//i.test(u.pathname)) return true;
  return false;
};

async function networkFirstData(request){
  const cache=await caches.open(DATA_CACHE);
  try{
    const response=await fetch(request);
    const ct=response.headers.get('content-type')||'';
    if(response.ok && (ct.includes('application/json')||ct.includes('text/json')||ct.includes('application/geo+json'))){
      cache.put(request,response.clone()).catch(()=>{});
    }
    return response;
  }catch(err){
    const cached=await cache.match(request);
    if(cached)return cached;
    throw err;
  }
}

async function navigationNetworkFirst(request){
  try{
    const response=await fetch(request);
    if(response.ok){
      const cache=await caches.open(SHELL_CACHE);
      cache.put('./index.html',response.clone()).catch(()=>{});
    }
    return response;
  }catch(err){
    return (await caches.match('./index.html')) || (await caches.match('./offline.html'));
  }
}

async function staleWhileRevalidate(request){
  const cache=await caches.open(SHELL_CACHE);
  const cached=await cache.match(request);
  const fresh=fetch(request).then(response=>{
    if(response.ok&&response.type!=='opaque')cache.put(request,response.clone()).catch(()=>{});
    return response;
  }).catch(()=>null);
  return cached || fresh || caches.match('./offline.html');
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);

  if(request.mode==='navigate'){
    event.respondWith(navigationNetworkFirst(request));return;
  }
  if(isMapOrWeather(url)) return; // Always online; do not create huge/opaque caches.
  if(isLikelyDataRequest(url)){
    event.respondWith(networkFirstData(request));return;
  }
  if(url.origin===self.location.origin){
    event.respondWith(staleWhileRevalidate(request));
  }
});
