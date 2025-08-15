'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit, 
  Camera, 
  Settings, 
  Calendar, 
  MapPin, 
  Users, 
  Star,
  Heart,
  MessageCircle,
  Share2,
  Instagram,
  Twitter,
  Facebook,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - replace with API call
  const mockUser = {
    id: '1',
    username: 'soccerfan',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    userType: 'player',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    dateOfBirth: '1995-06-15',
    phoneNumber: '+212 6 12 34 56 78',
    favoriteSport: 'Football',
    position: 'Forward',
    age: 28,
    bio: 'Passionate football player with 15+ years of experience. Love playing in competitive leagues and helping new players improve their skills.',
    socialLinks: {
      instagram: '@soccerfan',
      twitter: '@johndoe_football',
      facebook: 'John Doe Football'
    },
    followers: 156,
    following: 89,
    eventsJoined: 24,
    venuesVisited: 8,
    rating: 4.8,
    reviews: 23
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    console.log('Saving profile...');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg" />
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white">
                  <AvatarImage src={mockUser.profilePicture} />
                  <AvatarFallback className="text-4xl">
                    {mockUser.firstName.charAt(0)}{mockUser.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Edit Profile Button */}
            <div className="absolute top-4 right-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/90 backdrop-blur-sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
          
          <CardContent className="pt-20 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {mockUser.firstName} {mockUser.lastName}
                </h1>
                <p className="text-lg text-gray-600 mb-2">@{mockUser.username}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary" className="capitalize">
                    {mockUser.userType.replace('_', ' ')}
                  </Badge>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{mockUser.age} years old</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{mockUser.favoriteSport}</span>
                  {mockUser.position && (
                    <>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">{mockUser.position}</span>
                    </>
                  )}
                </div>
                <p className="text-gray-700 max-w-2xl">{mockUser.bio}</p>
              </div>
              
              {isEditing && (
                <div className="mt-4 md:mt-0">
                  <Button onClick={handleSaveProfile} className="mr-2">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{mockUser.eventsJoined}</p>
              <p className="text-sm text-gray-600">Events Joined</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{mockUser.venuesVisited}</p>
              <p className="text-sm text-gray-600">Venues Visited</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{mockUser.followers}</p>
              <p className="text-sm text-gray-600">Followers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{mockUser.rating}</p>
              <p className="text-sm text-gray-600">Rating ({mockUser.reviews} reviews)</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">First Name</label>
                          <Input defaultValue={mockUser.firstName} />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Last Name</label>
                          <Input defaultValue={mockUser.lastName} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Input defaultValue={mockUser.email} type="email" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <Input defaultValue={mockUser.phoneNumber} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                        <Input defaultValue={mockUser.dateOfBirth} type="date" />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Name</span>
                        <span className="font-medium">{mockUser.firstName} {mockUser.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-medium">{mockUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone</span>
                        <span className="font-medium">{mockUser.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth</span>
                        <span className="font-medium">{new Date(mockUser.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sports Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Sports Information</CardTitle>
                  <CardDescription>Your sports preferences and experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Favorite Sport</label>
                        <Input defaultValue={mockUser.favoriteSport} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Position</label>
                        <Input defaultValue={mockUser.position} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Bio</label>
                        <Textarea defaultValue={mockUser.bio} rows={3} />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Favorite Sport</span>
                        <Badge variant="outline">{mockUser.favoriteSport}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Position</span>
                        <Badge variant="outline">{mockUser.position || 'Not specified'}</Badge>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-2">Bio</span>
                        <p className="text-gray-900">{mockUser.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Events you've participated in recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No recent events to display</p>
                  <p className="text-sm">Join some events to see them here!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <Input placeholder="Instagram username" defaultValue={mockUser.socialLinks.instagram} />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <Input placeholder="Twitter username" defaultValue={mockUser.socialLinks.twitter} />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <Input placeholder="Facebook profile" defaultValue={mockUser.socialLinks.facebook} />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span className="text-gray-900">{mockUser.socialLinks.instagram}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-900">{mockUser.socialLinks.twitter}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-900">{mockUser.socialLinks.facebook}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Followers/Following */}
              <Card>
                <CardHeader>
                  <CardTitle>Connections</CardTitle>
                  <CardDescription>Your social network on Atlas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{mockUser.followers}</p>
                      <p className="text-sm text-gray-600">Followers</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{mockUser.following}</p>
                      <p className="text-sm text-gray-600">Following</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Notification Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

