'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const messageParam = searchParams.get('message');
    if (messageParam) {
      setMessage(messageParam);
    }
  }, [searchParams]);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    
    try {
      // TODO: Implement actual login API call
      console.log('Login data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Store authentication token and user data
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // TODO: Handle login errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        </div>
      )}
      
      <LoginForm 
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    </div>
  );
}

