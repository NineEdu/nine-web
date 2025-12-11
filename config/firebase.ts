// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI7ygKQq7wGiXQrukldiKuqpufmToEJmE",
  authDomain: "nineedu-e2cd7.firebaseapp.com",
  projectId: "nineedu-e2cd7",
  storageBucket: "nineedu-e2cd7.firebasestorage.app",
  messagingSenderId: "380673344",
  appId: "1:380673344:web:a2dbc56fd7c08f9358aea5",
  measurementId: "G-427XGLMY2D",
};

// 1. Khởi tạo App (Singleton Pattern để tránh lỗi init nhiều lần khi hot-reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 2. Khởi tạo Auth (Cần thiết cho chức năng Login của bạn)
const auth = getAuth(app);

// 3. Khởi tạo Analytics (CHỈ CHẠY Ở CLIENT/BROWSER)
let analytics;

// Kiểm tra xem có đang ở môi trường trình duyệt không
if (typeof window !== "undefined") {
  // Kiểm tra xem trình duyệt có hỗ trợ Analytics không
  isSupported().then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(app);
    }
  });
}

// 4. Export ra để dùng ở chỗ khác
export { app, auth, analytics };
