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
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

@@ .. @@
 interface LoginFormProps {
-  onSubmit: (data: LoginFormData) => void;
   isLoading?: boolean;
 }

-const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
+const LoginForm: React.FC<LoginFormProps> = ({ isLoading: externalLoading = false }) => {
   const [showPassword, setShowPassword] = useState(false);
+  const [loading, setLoading] = useState(false);
+  const [error, setError] = useState<string | null>(null);
+  const { signIn } = useAuthContext();
+  const router = useRouter();
   
   const {
     register,
@@ -32,8 +39,25 @@
     mode: 'onChange',
   });

-  const handleFormSubmit = (data: LoginFormData) => {
-    onSubmit(data);
+  const handleFormSubmit = async (data: LoginFormData) => {
+    setLoading(true);
+    setError(null);
+    
+    try {
+      const { error } = await signIn(data.email, data.password);
+      
+      if (error) {
+        setError(error.message);
+      } else {
+        router.push('/dashboard');
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
               {/* Email Field */}
@@ .. @@
               <Button
                 type="submit"
                 className="w-full h-12 text-lg"
-                disabled={!isValid || isLoading}
+                disabled={!isValid || isLoading}
               >
                 {isLoading ? 'Signing In...' : 'Sign In'}
               </Button>