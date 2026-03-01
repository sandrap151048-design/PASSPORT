import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function FacebookCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('processing')

  useEffect(() => {
    const handleCallback = async () => {
      const { code, error } = router.query

      if (error) {
        console.error('Facebook OAuth error:', error)
        setStatus('error')
        setTimeout(() => router.push('/login'), 3000)
        return
      }

      if (code) {
        try {
          // Send the code to your backend API
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
          const response = await fetch(`${API_URL}/auth/facebook`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          })

          const data = await response.json()

          if (response.ok) {
            // Store the token
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            
            setStatus('success')
            setTimeout(() => router.push('/'), 2000)
          } else {
            setStatus('error')
            setTimeout(() => router.push('/login'), 3000)
          }
        } catch (error) {
          console.error('Error processing Facebook login:', error)
          setStatus('error')
          setTimeout(() => router.push('/login'), 3000)
        }
      }
    }

    if (router.isReady) {
      handleCallback()
    }
  }, [router.isReady, router.query])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
      <div className="text-center">
        {status === 'processing' && (
          <div className="animate-fade-in">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Facebook Login</h2>
            <p className="text-gray-600">Please wait while we authenticate you...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="animate-fade-in">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Successful!</h2>
            <p className="text-gray-600">Redirecting you to the dashboard...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="animate-fade-in">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Failed</h2>
            <p className="text-gray-600">Redirecting you back to login page...</p>
          </div>
        )}
      </div>
    </div>
  )
}
