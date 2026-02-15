# Firebase Setup Guide for Style İn Baku

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `style-in-baku` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

## Step 2: Register Your Web App

1. In Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Style In Baku Website`
3. **DO NOT** check "Firebase Hosting" (we'll use Netlify/Vercel)
4. Click "Register app"
5. **Copy the firebaseConfig object** - you'll need this!

## Step 3: Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"
5. Enable **Google**:
   - Click on "Google"
   - Toggle "Enable" to ON
   - Select support email
   - Click "Save"

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click "Create database"
3. Select **Start in production mode**
4. Choose location closest to Azerbaijan (europe-west or similar)
5. Click "Enable"

### Set Firestore Security Rules

Go to **Rules** tab and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click "Publish"

## Step 5: Configure Your App

1. Open `src/config/firebase.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // From Firebase Console
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

## Step 6: Test Authentication

1. Run your app: `npm run dev`
2. Go to `/signup` and create a test account
3. Check Firebase Console > Authentication > Users to see the new user
4. Try logging in with the account
5. Test Google Sign-In

## Features Now Available

✅ **Email/Password Authentication**
- Users can sign up with email
- Secure password storage (handled by Firebase)
- Login/logout functionality

✅ **Google OAuth**
- One-click sign in with Google
- No password needed
- Automatic account creation

✅ **User Profiles**
- Display name and email
- Profile page at `/profile`
- Logout functionality

✅ **Protected Features**
- Cart syncs across devices (when logged in)
- User data stored in Firestore
- Persistent authentication

## Pricing (Free Tier Limits)

- **Authentication**: Unlimited users (FREE)
- **Firestore**: 50K reads/day, 20K writes/day, 1GB storage
- **Hosting**: Not using (using Netlify/Vercel instead)

For a clothing store, you'll likely stay within free limits unless you have thousands of daily active users.

## Next Steps

1. **Deploy to Production**: Update Firebase config with production domain
2. **Add OAuth Providers**: Facebook, Apple (if needed)
3. **Email Verification**: Enable email verification for new signups
4. **Password Reset**: Add "Forgot Password" functionality
5. **1C Integration**: Connect product data from 1C Enterprise

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit `firebase.js` with real credentials to public repositories
- Use environment variables for production
- Keep Firestore security rules strict
- Enable App Check for production (prevents abuse)
