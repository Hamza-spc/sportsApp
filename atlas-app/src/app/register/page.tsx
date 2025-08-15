'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/auth/RegistrationForm';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegistration = async (data: any) => {
    setIsLoading(true);
    
    try {
      // TODO: Implement actual registration API call
      console.log('Registration data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to login page after successful registration
      router.push('/login?message=Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration error:', error);
      // TODO: Handle registration errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationForm 
      onSubmit={handleRegistration}
      isLoading={isLoading}
    />
  );
}

