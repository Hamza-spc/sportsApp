'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/components/dashboard/Dashboard';

export default function DashboardPage() {
  // TODO: Get actual user data from authentication context
  const mockUser = {
    userType: 'player' as const,
    username: 'JohnDoe',
    profilePicture: undefined
  };

  return (
    <MainLayout 
      userType={mockUser.userType}
      username={mockUser.username}
      profilePicture={mockUser.profilePicture}
    >
      <Dashboard 
        userType={mockUser.userType}
        username={mockUser.username}
        profilePicture={mockUser.profilePicture}
      />
    </MainLayout>
  );
}

