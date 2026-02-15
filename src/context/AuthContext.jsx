import { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '../config/firebase'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sign up with email and password
  async function signup(email, password, displayName) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update profile with display name
    await updateProfile(userCredential.user, { displayName })
    
    // Try to create user document in Firestore (optional)
    try {
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName,
        email,
        createdAt: new Date().toISOString(),
        cart: []
      })
    } catch (firestoreError) {
      console.warn('Firestore user creation failed (auth still successful):', firestoreError)
    }
    
    return userCredential
  }

  // Sign in with email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Sign in with Google
  async function signInWithGoogle() {
    const userCredential = await signInWithPopup(auth, googleProvider)
    
    // Try to create user document in Firestore (optional - won't fail auth if Firestore isn't set up)
    try {
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          createdAt: new Date().toISOString(),
          cart: []
        })
      }
    } catch (firestoreError) {
      console.warn('Firestore user creation failed (auth still successful):', firestoreError)
    }
    
    return userCredential
  }

  // Sign out
  function logout() {
    return signOut(auth)
  }

  // Get user data from Firestore
  async function getUserData(uid) {
    const userDoc = await getDoc(doc(db, 'users', uid))
    return userDoc.exists() ? userDoc.data() : null
  }

  // Update user data in Firestore
  async function updateUserData(uid, data) {
    await setDoc(doc(db, 'users', uid), data, { merge: true })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    signInWithGoogle,
    logout,
    getUserData,
    updateUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
