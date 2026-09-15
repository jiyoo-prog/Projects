// OPTIONAL: Use this file when you are ready to connect Firebase.
// Replace the placeholder values with your Firebase project config.

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Recommended production setup:
// 1. Firebase Authentication: secure the admin page.
// 2. Firestore: save title/category/description/media URL.
// 3. Firebase Storage: upload images and video files.
// 4. Replace the current localStorage logic in js/data.js and js/admin.js.
