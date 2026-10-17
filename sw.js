/* VGTB Thủy văn PWA Service Worker - V3.2.0 */
const VERSION='3.2.0';
const SHELL_CACHE=`vgtb-shell-${VERSION}`;
const DATA_CACHE=`vgtb-data-${VERSION}`;
const APP_SHELL=['./','./index.html','./offline.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-192.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon-180.png','./icons/vgtb-logo.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>(k.startsWith('vgtb-')||k.startsWith('avc-pctt-'))&&!([SHELL_CACHE,DATA_CACHE].includes(k))).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
const onlineOnly=u=>/(windy\.com|google\.com|googleapis\.com|gstatic\.com|openstreetmap\.org)/i.test(u.hostname);
const isData=u=>/supabase\.co$/i.test(u.hostname)&&!/\/auth\/v1\//i.test(u.pathname)||/pctt\.danang\.gov\.vn$/i.test(u.hostname)||/vercel\.app$/i.test(u.hostname)&&/\/api\//i.test(u.pathname)||/\/api\//i.test(u.pathname);
async function networkFirstData(req){const c=await caches.open(DATA_CACHE);try{const r=await fetch(req);const ct=r.headers.get('content-type')||'';if(r.ok&&/json/i.test(ct))c.put(req,r.clone()).catch(()=>{});return r;}catch(e){const old=await c.match(req);if(old)return old;throw e;}}
async function navFirst(req){try{const r=await fetch(req);if(r.ok){const c=await caches.open(SHELL_CACHE);c.put('./index.html',r.clone()).catch(()=>{});}return r;}catch(e){return await caches.match('./index.html')||await caches.match('./offline.html');}}
async function shell(req){const c=await caches.open(SHELL_CACHE);const old=await c.match(req);const fresh=fetch(req).then(r=>{if(r.ok&&r.type!=='opaque')c.put(req,r.clone()).catch(()=>{});return r;}).catch(()=>null);return old||fresh||caches.match('./offline.html');}
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const u=new URL(req.url);if(req.mode==='navigate'){event.respondWith(navFirst(req));return;}if(onlineOnly(u))return;if(isData(u)){event.respondWith(networkFirstData(req));return;}if(u.origin===self.location.origin)event.respondWith(shell(req));});
