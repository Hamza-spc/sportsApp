@@ .. @@
 import type { Metadata } from "next";
 import { Geist, Geist_Mono } from "next/font/google";
+import { AuthProvider } from "@/components/auth/AuthProvider";
 import "./globals.css";

@@ .. @@
 export default function RootLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
     <html lang="en">
       <body
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
       >
-        {children}
+        <AuthProvider>
+          {children}
+        </AuthProvider>
       </body>
     </html>
   );
 }