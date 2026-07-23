// firebase-messaging-sw.js
// هذا الملف مسؤول عن استقبال إشعارات Push وعرضها لما التطبيق يكون مقفول أو في الخلفية.
// لازم يفضل في نفس المجلد اللي فيه index.html (يعني في الجذر الأساسي للموقع).

importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCLhnNr5H8ce8Z_H5iajNhSCU2X1L02T7A",
  authDomain: "al-khobar-orders.firebaseapp.com",
  projectId: "al-khobar-orders",
  storageBucket: "al-khobar-orders.firebasestorage.app",
  messagingSenderId: "462225821034",
  appId: "1:462225821034:web:00cbef6b71ec3f5b7da913"
});

const messaging = firebase.messaging();

// لما إشعار يوصل والتطبيق مقفول/في الخلفية، هيتعرض كإشعار من نظام التشغيل
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || "Al Khobar Orders";
  const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || "";
  self.registration.showNotification(title, {
    body,
    icon: "/icons/icon-192.png",
    badge: "/icons/favicon-32.png",
    data: payload.data || {}
  });
});

// لو المستخدم دوس على الإشعار، يفتح/يركز على التطبيق
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
