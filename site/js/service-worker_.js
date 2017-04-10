self.addEventListener('install', function(event){
	console.log('Install', event);
});

self.addEventListener('activate', function(event){
    console.log('Activate', event);
});
console.log("service worker")