import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV3vAhb51_vX86DnRhCqOQgLMHTkb6cK4",
  authDomain: "web-testing-fc59d.firebaseapp.com",
  projectId: "web-testing-fc59d",
  storageBucket: "web-testing-fc59d.firebasestorage.app",
  messagingSenderId: "716440847605",
  appId: "1:716440847605:web:1548599b3e53baffa0f1bc",
  measurementId: "G-25GTKBKHNK"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)

export default app
