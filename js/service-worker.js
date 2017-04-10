self.addEventListener('fetch', function(event){
    var url = new URL(event.request.url);
    event.respondWith(fetch('/images/logo.png'));
    console.log(event, url.pathname);
})