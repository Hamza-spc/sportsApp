@@ .. @@
 'use client';

-import React, { useState } from 'react';
+import React, { useState, useEffect } from 'react';
 import { motion } from 'framer-motion';
+import { useAuthContext } from '@/components/auth/AuthProvider';
+import { db } from '@/lib/supabase';
 import { 
   Calendar, 
   MapPin, 
@@ .. @@
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
-import { SportEvent } from '@/types';
 import { SPORTS, GENDERS } from '@/constants';

 export default function EventsPage() {
+  const { user, profile } = useAuthContext();
+  const [events, setEvents] = useState<any[]>([]);
+  const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedSport, setSelectedSport] = useState<string>('');
   const [selectedGender, setSelectedGender] = useState<string>('');
   const [selectedDate, setSelectedDate] = useState<string>('');

-  // Mock events data - replace with API call
-  const mockEvents: SportEvent[] = [
-    {
-      id: '1',
-      title: 'Weekend Football Match',
-      description: 'Casual 5v5 football game for all skill levels. Come join us for a fun afternoon of football!',
-      sport: 'Football',
-      venueId: '1',
-      venue: {
-        id: '1',
-        name: 'Central Sports Complex',
-        description: 'Multi-sport facility in the heart of the city',
-        address: { street: '123 Main St', city: 'Casablanca', state: 'Casablanca-Settat', zipCode: '20000', country: 'Morocco' },
-        coordinates: { latitude: 33.5731, longitude: -7.5898 },
-        sports: ['Football', 'Basketball'],
-        matchFormats: [],
-        amenities: ['Parking', 'Showers'],
-        photos: [],
-        hosterId: '1',
-        isActive: true,
-        createdAt: '2024-01-01',
-        updatedAt: '2024-01-01'
-      },
-      matchFormat: { id: '1', name: '5v5', playerCount: 10, sport: 'Football', duration: 90 },
-      date: '2024-01-15',
-      startTime: '14:00',
-      endTime: '15:30',
-      ageRange: { min: 18, max: 45 },
-      gender: 'mixed',
-      maxPlayers: 10,
-      currentPlayers: 7,
-      players: [],
-      creatorId: '1',
-      creator: { id: '1', username: 'soccerfan', userType: 'player' } as any,
-      status: 'confirmed',
-      tags: ['casual', 'weekend'],
-      createdAt: '2024-01-01',
-      updatedAt: '2024-01-01'
-    },
-    {
-      id: '2',
-      title: 'Basketball Tournament',
-      description: 'Competitive 3v3 basketball tournament with prizes for winners.',
-      sport: 'Basketball',
-      venueId: '2',
-      venue: {
-        id: '2',
-        name: 'Elite Sports Center',
-        description: 'Professional basketball courts with premium facilities',
-        address: { street: '456 Sports Ave', city: 'Casablanca', state: 'Casablanca-Settat', zipCode: '20000', country: 'Morocco' },
-        coordinates: { latitude: 33.5731, longitude: -7.5898 },
-        sports: ['Basketball'],
-        matchFormats: [],
-        amenities: ['Parking', 'Showers', 'WiFi'],
-        photos: [],
-        hosterId: '2',
-        isActive: true,
-        createdAt: '2024-01-01',
-        updatedAt: '2024-01-01'
-      },
-      matchFormat: { id: '2', name: '3v3', playerCount: 6, sport: 'Basketball', duration: 60 },
-      date: '2024-01-20',
-      startTime: '10:00',
-      endTime: '18:00',
-      ageRange: { min: 16, max: 35 },
-      gender: 'mixed',
-      maxPlayers: 24,
-      currentPlayers: 18,
-      players: [],
-      creatorId: '2',
-      creator: { id: '2', username: 'basketballpro', userType: 'player' } as any,
-      status: 'confirmed',
-      tags: ['tournament', 'competitive'],
-      createdAt: '2024-01-01',
-      updatedAt: '2024-01-01'
-    },
-    {
-      id: '3',
-      title: 'Tennis Doubles Night',
-      description: 'Evening tennis doubles session under floodlights. All skill levels welcome.',
-      sport: 'Tennis',
-      venueId: '3',
-      venue: {
-        id: '3',
-        name: 'Tennis Club Casablanca',
-        description: 'Professional tennis courts with excellent lighting',
-        address: { street: '789 Tennis Blvd', city: 'Casablanca', state: 'Casablanca-Settat', zipCode: '20000', country: 'Morocco' },
-        coordinates: { latitude: 33.5731, longitude: -7.5898 },
-        sports: ['Tennis'],
-        matchFormats: [],
-        amenities: ['Parking', 'Showers', 'Pro Shop'],
-        photos: [],
-        hosterId: '3',
-        isActive: true,
-        createdAt: '2024-01-01',
-        updatedAt: '2024-01-01'
-      },
-      matchFormat: { id: '3', name: '2v2', playerCount: 4, sport: 'Tennis', duration: 90 },
-      date: '2024-01-18',
-      startTime: '19:00',
-      endTime: '20:30',
-      ageRange: { min: 18, max: 50 },
-      gender: 'mixed',
-      maxPlayers: 8,
-      currentPlayers: 6,
-      players: [],
-      creatorId: '3',
-      creator: { id: '3', username: 'tennislover', userType: 'player' } as any,
-      status: 'confirmed',
-      tags: ['evening', 'doubles'],
-      createdAt: '2024-01-01',
-      updatedAt: '2024-01-01'
-    }
-  ];
+  useEffect(() => {
+    loadEvents();
+  }, []);
+
+  const loadEvents = async () => {
+    try {
+      const filters = {
+        sport: selectedSport || undefined,
+        gender: selectedGender || undefined,
+        date: selectedDate || undefined
+      };
+      
+      const { data, error } = await db.getEvents(filters);
+      
+      if (error) {
+        console.error('Error loading events:', error);
+      } else {
+        setEvents(data || []);
+      }
+    } catch (error) {
+      console.error('Error loading events:', error);
+    } finally {
+      setLoading(false);
+    }
+  };
+
+  useEffect(() => {
+    loadEvents();
+  }, [selectedSport, selectedGender, selectedDate]);

-  const filteredEvents = mockEvents.filter(event => {
+  const filteredEvents = events.filter(event => {
     const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
-    const matchesSport = !selectedSport || event.sport === selectedSport;
-    const matchesGender = !selectedGender || event.gender === selectedGender;
-    const matchesDate = !selectedDate || event.date === selectedDate;
     
-    return matchesSearch && matchesSport && matchesGender && matchesDate;
+    return matchesSearch;
   });

+  const handleJoinEvent = async (eventId: string) => {
+    if (!user) return;
+    
+    try {
+      const { error } = await db.joinEvent(eventId, user.id);
+      if (error) {
+        console.error('Error joining event:', error);
+      } else {
+        // Refresh events to show updated participant count
+        loadEvents();
+      }
+    } catch (error) {
+      console.error('Error joining event:', error);
+    }
+  };
+
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gray-50 py-8">
+        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+          <div className="flex items-center justify-center py-12">
+            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
+          </div>
+        </div>
+      </div>
+    );
+  }
+
   return (
     <div className="min-h-screen bg-gray-50 py-8">
@@ .. @@
             <Select value={selectedSport} onValueChange={setSelectedSport}>
               <SelectTrigger>
-                <SelectValue placeholder="All Sports" />
+                <SelectValue placeholder="All Sports" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="">All Sports</SelectItem>
@@ .. @@
             
             <Select value={selectedGender} onValueChange={setSelectedGender}>
               <SelectTrigger>
-                <SelectValue placeholder="All Genders" />
+                <SelectValue placeholder="All Genders" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="">All Genders</SelectItem>
@@ .. @@
                     <div className="flex items-center text-sm text-gray-600">
                       <Calendar className="h-4 w-4 mr-2" />
-                      {new Date(event.date).toLocaleDateString()} at {event.startTime}
+                      {new Date(event.event_date).toLocaleDateString()} at {event.start_time}
                     </div>
                     <div className="flex items-center text-sm text-gray-600">
                       <MapPin className="h-4 w-4 mr-2" />
@@ .. @@
                     <div className="flex items-center text-sm text-gray-600">
                       <Users className="h-4 w-4 mr-2" />
-                      {event.currentPlayers}/{event.maxPlayers} players
+                      {event.current_players}/{event.max_players} players
                     </div>
                   </div>

@@ .. @@
                   <div className="flex flex-wrap gap-2">
                     <Badge variant="outline">{event.sport}</Badge>
-                    <Badge variant="outline">{event.matchFormat.name}</Badge>
+                    <Badge variant="outline">{event.gender}</Badge>
                     {event.tags.slice(0, 2).map((tag) => (
                       <Badge key={tag} variant="secondary">{tag}</Badge>
@@ .. @@
                   <div className="flex items-center space-x-3 pt-2 border-t">
                     <Avatar className="h-8 w-8">
-                      <AvatarImage src={event.creator.profilePicture} />
-                      <AvatarFallback>{event.creator.username.charAt(0)}</AvatarFallback>
+                      <AvatarImage src={event.creator?.profile_picture} />
+                      <AvatarFallback>{event.creator?.username?.charAt(0) || 'U'}</AvatarFallback>
                     </Avatar>
                     <div className="flex-1">
-                      <p className="text-sm font-medium">{event.creator.username}</p>
+                      <p className="text-sm font-medium">{event.creator?.username || 'Unknown'}</p>
                       <p className="text-xs text-gray-500">Event Creator</p>
                     </div>
@@ .. @@
                   <div className="flex space-x-2 pt-2">
                     <Button variant="outline" size="sm" className="flex-1">
                       <Eye className="h-4 w-4 mr-2" />
                       View Details
                     </Button>
-                    <Button variant="outline" size="sm" className="flex-1">
-                      <MessageCircle className="h-4 w-4 mr-2" />
-                      Contact
+                    <Button 
+                      variant="outline" 
+                      size="sm" 
+                      className="flex-1"
+                      onClick={() => handleJoinEvent(event.id)}
+                      disabled={!user || event.current_players >= event.max_players}
+                    >
+                      <Users className="h-4 w-4 mr-2" />
+                      {event.current_players >= event.max_players ? 'Full' : 'Join'}
                     </Button>
                   </div>