self.addEventListener('install', function(event){
	console.log(event);
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('fetch', function(event){
    var url = new URL(event.request.url);
    event.respondWith(
        fetch(event.request).then(function(response){
            if (response.status == 404)
            {
                return fetch('/images/logo.png')
            }
            return response;
        })
    );
    console.log(event, url.pathname);
})