@@ .. @@
 'use client';

 import React, { useState } from 'react';
 import { motion } from 'framer-motion';
 import { useForm } from 'react-hook-form';
 import { zodResolver } from '@hookform/resolvers/zod';
 import * as z from 'zod';
+import { useRouter } from 'next/navigation';
+import { useAuthContext } from './AuthProvider';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
@@ .. @@
 interface RegistrationFormProps {
-  onSubmit: (data: RegistrationFormData) => void;
   isLoading?: boolean;
 }

-const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isLoading = false }) => {
+const RegistrationForm: React.FC<RegistrationFormProps> = ({ isLoading: externalLoading = false }) => {
   const [selectedUserType, setSelectedUserType] = useState<UserType>('player');
+  const [loading, setLoading] = useState(false);
+  const [error, setError] = useState<string | null>(null);
+  const { signUp } = useAuthContext();
+  const router = useRouter();
   
   const {
     register,
@@ .. @@
     setValue('userType', userType);
   };

-  const handleFormSubmit = (data: RegistrationFormData) => {
-    onSubmit(data);
+  const handleFormSubmit = async (data: RegistrationFormData) => {
+    if (data.password !== data.confirmPassword) {
+      setError('Passwords do not match');
+      return;
+    }
+
+    setLoading(true);
+    setError(null);
+    
+    try {
+      const userData = {
+        username: data.username,
+        first_name: data.firstName,
+        last_name: data.lastName,
+        user_type: data.userType,
+        date_of_birth: data.dateOfBirth,
+        phone_number: data.phoneNumber,
+        favorite_sport: data.favoriteSport,
+        position: data.position,
+        specializations: data.specializations,
+        bio: data.bio,
+        experience: data.experience,
+        company_name: data.companyName
+      };
+
+      const { error } = await signUp(data.email, data.password, userData);
+      
+      if (error) {
+        setError(error.message);
+      } else {
+        router.push('/login?message=Registration successful! Please check your email to verify your account.');
+      }
+    } catch (err) {
+      setError('An unexpected error occurred');
+    } finally {
+      setLoading(false);
+    }
   };

+  const isLoading = loading || externalLoading;
+
   return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
@@ .. @@
           <CardContent>
             <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
+              {error && (
+                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
+                  {error}
+                </div>
+              )}
+
               {/* User Type Selection */}