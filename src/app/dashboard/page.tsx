@@ .. @@
 'use client';

 import React from 'react';
+import { useAuthContext } from '@/components/auth/AuthProvider';
+import { useRouter } from 'next/navigation';
+import { useEffect } from 'react';
 import MainLayout from '@/components/layout/MainLayout';
 import Dashboard from '@/components/dashboard/Dashboard';

 export default function DashboardPage() {
-  // TODO: Get actual user data from authentication context
-  const mockUser = {
-    userType: 'player' as const,
-    username: 'JohnDoe',
-    profilePicture: undefined
-  };
+  const { user, profile, loading, isAuthenticated } = useAuthContext();
+  const router = useRouter();
+
+  useEffect(() => {
+    if (!loading && !isAuthenticated) {
+      router.push('/login');
+    }
+  }, [loading, isAuthenticated, router]);
+
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
+        <div className="text-center">
+          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
+          <p className="text-gray-600">Loading...</p>
+        </div>
+      </div>
+    );
+  }
+
+  if (!isAuthenticated || !profile) {
+    return null;
+  }

   return (
     <MainLayout 
-      userType={mockUser.userType}
-      username={mockUser.username}
-      profilePicture={mockUser.profilePicture}
+      userType={profile.user_type}
+      username={profile.username}
+      profilePicture={profile.profile_picture || undefined}
     >
       <Dashboard 
-        userType={mockUser.userType}
-        username={mockUser.username}
-        profilePicture={mockUser.profilePicture}
+        userType={profile.user_type}
+        username={profile.username}
+        profilePicture={profile.profile_picture || undefined}
       />
     </MainLayout>
   );
 }