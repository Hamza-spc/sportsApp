'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  Plus,
  Eye,
  MessageCircle,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserType, SportEvent, Venue, FeedPost } from '@/types';

interface DashboardProps {
  userType: UserType;
  username: string;
  profilePicture?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userType, username, profilePicture }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with real API calls
  const mockEvents: SportEvent[] = [
    {
      id: '1',
      title: 'Weekend Football Match',
      description: 'Casual 5v5 football game for all skill levels',
      sport: 'Football',
      venueId: '1',
      venue: {
        id: '1',
        name: 'Central Sports Complex',
        description: 'Multi-sport facility in the heart of the city',
        address: { street: '123 Main St', city: 'Casablanca', state: 'Casablanca-Settat', zipCode: '20000', country: 'Morocco' },
        coordinates: { latitude: 33.5731, longitude: -7.5898 },
        sports: ['Football', 'Basketball'],
        matchFormats: [],
        amenities: ['Parking', 'Showers'],
        photos: [],
        hosterId: '1',
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      matchFormat: { id: '1', name: '5v5', playerCount: 10, sport: 'Football', duration: 90 },
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '15:30',
      ageRange: { min: 18, max: 45 },
      gender: 'mixed',
      maxPlayers: 10,
      currentPlayers: 7,
      players: [],
      creatorId: '1',
      creator: {} as any,
      status: 'confirmed',
      tags: ['casual', 'weekend'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  const mockVenues: Venue[] = [
    {
      id: '1',
      name: 'Central Sports Complex',
      description: 'Multi-sport facility in the heart of the city',
      address: { street: '123 Main St', city: 'Casablanca', state: 'Casablanca-Settat', zipCode: '20000', country: 'Morocco' },
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      sports: ['Football', 'Basketball', 'Tennis'],
      matchFormats: [],
      amenities: ['Parking', 'Showers', 'WiFi'],
      photos: [],
      hosterId: '1',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  const mockFeedPosts: FeedPost[] = [
    {
      id: '1',
      content: 'Amazing game today! The team played incredibly well. Looking forward to the next match! ⚽',
      authorId: '1',
      author: { id: '1', username: 'soccerfan', userType: 'player' } as any,
      hashtags: ['football', 'teamwork', 'sports'],
      likes: ['1', '2', '3'],
      comments: [],
      shares: 5,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z'
    }
  ];

  const renderPlayerDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Events Joined</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-600">Players Met</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Venues Visited</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next sports activities</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.venue.name} • {event.date} at {event.startTime}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">{event.sport}</Badge>
                      <Badge variant="outline">{event.matchFormat.name}</Badge>
                      <span className="text-sm text-gray-500">
                        {event.currentPlayers}/{event.maxPlayers} players
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start space-x-3 p-3 border rounded-lg"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.profilePicture} />
                  <AvatarFallback>{post.author.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{post.author.username}</span> posted: {post.content}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVenueHosterDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-600">Active Venues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-gray-600">Events This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">€2,450</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Venue Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Venues</CardTitle>
              <CardDescription>Manage your sports facilities</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Venue
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVenues.map((venue) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-sm text-gray-600">{venue.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {venue.sports.slice(0, 3).map((sport) => (
                        <Badge key={sport} variant="secondary">{sport}</Badge>
                      ))}
                      {venue.sports.length > 3 && (
                        <Badge variant="outline">+{venue.sports.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">View Bookings</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSpecialUserDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Sessions This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">€1,200</p>
                <p className="text-sm text-gray-600">Monthly Income</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Content</CardTitle>
              <CardDescription>Manage your posts, events, and media</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start space-x-3 p-3 border rounded-lg"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.profilePicture} />
                  <AvatarFallback>{post.author.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments.length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-gray-600">Active Venues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Events Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-gray-600">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button className="h-20 flex-col space-y-2">
              <MapPin className="h-6 w-6" />
              <span>Review Venues</span>
            </Button>
            <Button className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Event Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboardContent = () => {
    switch (userType) {
      case 'player':
        return renderPlayerDashboard();
      case 'venue_hoster':
        return renderVenueHosterDashboard();
      case 'special_user':
        return renderSpecialUserDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderPlayerDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {username}! 👋
        </h1>
        <p className="text-blue-100">
          Ready for another amazing day of sports and connections?
        </p>
      </motion.div>

      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {renderDashboardContent()}
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
              <CardDescription>Manage and view all events</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Events management interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed statistics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Settings interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

