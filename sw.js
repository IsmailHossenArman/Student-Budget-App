var C='dailysafe-v2',F=['./','index.html'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(F.map(function(u){return new Request(u,{cache:'reload'})}))}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(function(n){var cp=n.clone();caches.open(C).then(function(c){c.put('index.html',cp)});return n}).catch(function(){return caches.match('index.html')}));
    return;
  }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(m){return m||fetch(r)}));
});
