# Fix Vercel Deployment - 404 API Errors

## Problem
Your frontend on Vercel is getting 404 errors when calling `/api/subscriptions` and `/api/contacts` because the backend server isn't accessible.

## Solution Options

### Option 1: Deploy Backend to Vercel (Recommended)

1. **Create a new Vercel project for the backend:**
   - Go to https://vercel.com/new
   - Import your repository
   - Set the root directory to `server`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `PORT`: 5000

2. **Update your client environment variables in Vercel:**
   - Go to your client project settings in Vercel
   - Navigate to Settings → Environment Variables
   - Add: `API_SERVER_URL` = `https://your-backend-url.vercel.app`
   - Redeploy your frontend

### Option 2: Deploy Backend to Railway (Alternative)

1. **Deploy to Railway:**
   - Go to https://railway.app
   - Create new project from GitHub repo
   - Select the `server` folder
   - Add environment variables (MONGODB_URI, PORT)
   - Railway will give you a URL like `https://your-app.railway.app`

2. **Update Vercel environment variables:**
   - In your Vercel client project settings
   - Add: `API_SERVER_URL` = `https://your-app.railway.app`
   - Redeploy

### Option 3: Use Vercel Serverless Functions (Advanced)

Convert your Express backend to Vercel serverless functions. This requires restructuring your backend code.

## Quick Test Locally

To verify everything works locally:

```bash
# Terminal 1 - Start backend
cd server
npm start

# Terminal 2 - Start frontend
cd client
npm run dev
```

Visit http://localhost:3000 and test the subscription form.

## Current Configuration

Your `next.config.js` already has rewrites configured:
- Local development: proxies `/api/*` to `http://localhost:5000/api/*`
- Production: uses `API_SERVER_URL` environment variable

## Environment Variables Needed

### Client (.env.local - for local development)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Client (Vercel Environment Variables)
```
API_SERVER_URL=https://your-backend-url.vercel.app
```

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
```

## Verification Steps

After deployment:
1. Check Vercel deployment logs for any errors
2. Test the subscription form on your live site
3. Check browser console for API errors
4. Verify the API URL in console logs

## Current Status

✅ Backend code is ready
✅ Frontend code is ready
✅ Next.js rewrites configured
❌ Backend not deployed
❌ Environment variables not set in Vercel

## Next Steps

1. Choose a deployment option (Vercel or Railway recommended)
2. Deploy your backend
3. Update environment variables in Vercel
4. Redeploy frontend
5. Test the subscription and contact forms
