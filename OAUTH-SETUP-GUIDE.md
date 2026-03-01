# OAuth Setup Guide - Google & Facebook Login

## Overview
The login page now supports Google and Facebook OAuth authentication. Follow these steps to configure it.

## 🔧 Setup Instructions

### 1. Google OAuth Setup

#### Step 1: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted
6. Select **Web application** as the application type
7. Add authorized redirect URIs:
   - For development: `http://localhost:3000/auth/google/callback`
   - For production: `https://yourdomain.com/auth/google/callback`
8. Copy the **Client ID**

#### Step 2: Add to Environment Variables
Add to your `client/.env.local` file:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 2. Facebook OAuth Setup

#### Step 1: Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** > **Create App**
3. Select **Consumer** as the app type
4. Fill in the app details and create the app
5. In the dashboard, go to **Settings** > **Basic**
6. Copy the **App ID**
7. Go to **Facebook Login** > **Settings**
8. Add Valid OAuth Redirect URIs:
   - For development: `http://localhost:3000/auth/facebook/callback`
   - For production: `https://yourdomain.com/auth/facebook/callback`

#### Step 2: Add to Environment Variables
Add to your `client/.env.local` file:
```env
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id_here
```

### 3. Backend API Setup

You need to create backend endpoints to handle OAuth callbacks:

#### Google OAuth Endpoint
```javascript
// server/routes/auth.js
router.post('/auth/google', async (req, res) => {
  const { code } = req.body
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.CLIENT_URL}/auth/google/callback`,
        grant_type: 'authorization_code'
      })
    })
    
    const tokens = await tokenResponse.json()
    
    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    })
    
    const userInfo = await userResponse.json()
    
    // Create or find user in your database
    // Generate JWT token
    // Return token and user info
    
    res.json({
      token: 'your_jwt_token',
      user: {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' })
  }
})
```

#### Facebook OAuth Endpoint
```javascript
// server/routes/auth.js
router.post('/auth/facebook', async (req, res) => {
  const { code } = req.body
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
      `client_id=${process.env.FACEBOOK_APP_ID}&` +
      `client_secret=${process.env.FACEBOOK_APP_SECRET}&` +
      `redirect_uri=${process.env.CLIENT_URL}/auth/facebook/callback&` +
      `code=${code}`
    )
    
    const tokens = await tokenResponse.json()
    
    // Get user info
    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&` +
      `access_token=${tokens.access_token}`
    )
    
    const userInfo = await userResponse.json()
    
    // Create or find user in your database
    // Generate JWT token
    // Return token and user info
    
    res.json({
      token: 'your_jwt_token',
      user: {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture.data.url
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' })
  }
})
```

### 4. Environment Variables (Backend)

Add to your `server/.env` file:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
CLIENT_URL=http://localhost:3000
```

## 🚀 How It Works

### User Flow:
1. User clicks "Google" or "Facebook" button on login page
2. User is redirected to Google/Facebook OAuth consent screen
3. User grants permissions
4. User is redirected back to `/auth/google/callback` or `/auth/facebook/callback`
5. Frontend sends the authorization code to your backend API
6. Backend exchanges code for access token
7. Backend retrieves user information
8. Backend creates/finds user in database and generates JWT token
9. Frontend stores token and redirects to dashboard

### Files Created:
- `client/pages/login.js` - Login page with OAuth buttons
- `client/pages/auth/google/callback.js` - Google OAuth callback handler
- `client/pages/auth/facebook/callback.js` - Facebook OAuth callback handler
- `client/.env.local.example` - Environment variables template

## 🧪 Testing

### Development Testing:
1. Set up OAuth credentials with `http://localhost:3000` as the domain
2. Add the environment variables to `client/.env.local`
3. Start your development server: `npm run dev`
4. Navigate to `/login`
5. Click Google or Facebook button
6. Complete the OAuth flow

### Production:
1. Update OAuth credentials with your production domain
2. Update environment variables in your hosting platform
3. Ensure HTTPS is enabled (required for OAuth)

## 🔒 Security Notes

1. **Never commit** `.env.local` or `.env` files to version control
2. Keep your client secrets secure (backend only)
3. Use HTTPS in production
4. Validate and sanitize all user data
5. Implement rate limiting on auth endpoints
6. Use secure JWT tokens with expiration

## 📝 Current Status

✅ Frontend OAuth buttons are functional
✅ Callback pages are created
✅ Environment variables are configured
⚠️ Backend API endpoints need to be implemented
⚠️ OAuth credentials need to be obtained from Google/Facebook

## 🆘 Troubleshooting

**Issue: "Redirect URI mismatch"**
- Ensure the redirect URI in your OAuth app matches exactly with the one in your code
- Check for trailing slashes and http vs https

**Issue: "Invalid client ID"**
- Verify the client ID is correctly copied to `.env.local`
- Ensure there are no extra spaces or quotes

**Issue: "Access denied"**
- Check that your OAuth app is not in testing mode (or add test users)
- Verify the requested scopes are approved in your OAuth app settings

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
