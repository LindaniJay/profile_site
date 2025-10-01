// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE = 'portfolio-static-v1';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/portfolio.html',
  '/blog.html',
  '/contact.html',
  '/services.html',
  '/css/styles.css',
  '/js/sidebar.js',
  '/js/portfolio-modal.js',
  '/js/enhanced-features.js',
  '/js/advanced-features.js',
  '/Assets/video/bg.mp4',
  '/Assets/Images/JONAS2.JPG'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (url.origin !== location.origin) return;
  
  event.respondWith(
    caches.match(request)
      .then(response => {
        // Return cached version if available
        if (response) {
          console.log('Serving from cache:', request.url);
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(request)
          .then(fetchResponse => {
            // Don't cache non-successful responses
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            
            // Clone the response
            const responseToCache = fetchResponse.clone();
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseToCache);
              });
            
            return fetchResponse;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline form submissions
  const formData = await getStoredFormData();
  if (formData.length > 0) {
    for (const data of formData) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        await removeStoredFormData(data.id);
      } catch (error) {
        console.log('Background sync failed:', error);
      }
    }
  }
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/Assets/Images/JONAS2.JPG',
    badge: '/Assets/Images/JONAS2.JPG',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/Assets/Images/JONAS2.JPG'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/Assets/Images/JONAS2.JPG'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Utility functions for offline storage
async function getStoredFormData() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const response = await cache.match('/form-data');
  if (response) {
    return await response.json();
  }
  return [];
}

async function storeFormData(data) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const existingData = await getStoredFormData();
  const newData = [...existingData, { ...data, id: Date.now() }];
  await cache.put('/form-data', new Response(JSON.stringify(newData)));
}

async function removeStoredFormData(id) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const existingData = await getStoredFormData();
  const filteredData = existingData.filter(item => item.id !== id);
  await cache.put('/form-data', new Response(JSON.stringify(filteredData)));
}
