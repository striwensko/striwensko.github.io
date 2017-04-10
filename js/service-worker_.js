self.addEventListener('install', function(event){
	console.log('Install', event);
});

self.addEventListener('activate', function(event){
    console.log('Activate', event);
});

self.addEventListener('fetch', function(event){
    var url = new URL(event.request.url);
    console.log('Fetch', event, url.pathname);
    event.respondWith(
        fetch(event.request).then(function(response){
            if (response.status == 404)
            {
                return fetch('/images/logo.png')
            }
            return response;
        })
    );
    
})