const V='ve-v8'; // при обновлении файлов на GitHub меняй на ve-v2, ve-v3…
const PRE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const TH='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(PRE);try{await c.put(TH,await fetch(TH,{mode:'no-cors'}));}catch(x){}}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||!/^https?:$/.test(u.protocol)||!(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'))return;
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const c=x.clone();caches.open(V).then(k=>k.put(r,c));}return x;}).catch(()=>hit);
    return hit||net;
  }));
});
