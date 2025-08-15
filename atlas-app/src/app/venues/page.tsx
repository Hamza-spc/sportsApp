'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Filter, 
  Search,
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Venue } from '@/types';
import { SPORTS, AMENITIES } from '@/constants';

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('');

  // Mock venues data - replace with API call
  const mockVenues: Venue[] = [
    {
      id: '1',
      name: 'Central Sports Complex',
      description: 'Multi-sport facility in the heart of the city with professional-grade equipment and facilities.',
      address: { 
        street: '123 Main St', 
        city: 'Casablanca', 
        state: 'Casablanca-Settat', 
        zipCode: '20000', 
        country: 'Morocco' 
      },
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      sports: ['Football', 'Basketball', 'Tennis', 'Volleyball'],
      matchFormats: [],
      amenities: ['Parking', 'Showers', 'WiFi', 'Lockers', 'Café'],
      photos: [],
      hosterId: '1',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Elite Sports Center',
      description: 'Premium basketball and fitness facility with state-of-the-art equipment.',
      address: { 
        street: '456 Sports Ave', 
        city: 'Casablanca', 
        state: 'Casablanca-Settat', 
        zipCode: '20000', 
        country: 'Morocco' 
      },
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      sports: ['Basketball', 'Fitness', 'Boxing'],
      matchFormats: [],
      amenities: ['Parking', 'Showers', 'WiFi', 'Equipment Rental', 'Pro Shop'],
      photos: [],
      hosterId: '2',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Tennis Club Casablanca',
      description: 'Professional tennis courts with excellent lighting and coaching services.',
      address: { 
        street: '789 Tennis Blvd', 
        city: 'Casablanca', 
        state: 'Casablanca-Settat', 
        zipCode: '20000', 
        country: 'Morocco' 
      },
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      sports: ['Tennis', 'Badminton'],
      matchFormats: [],
      amenities: ['Parking', 'Showers', 'Pro Shop', 'Coaching', 'Lighting'],
      photos: [],
      hosterId: '3',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Aqua Sports Center',
      description: 'Modern swimming facility with multiple pools and fitness classes.',
      address: { 
        street: '321 Water Way', 
        city: 'Casablanca', 
        state: 'Casablanca-Settat', 
        zipCode: '20000', 
        country: 'Morocco' 
      },
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      sports: ['Swimming', 'Water Polo', 'Aqua Fitness'],
      matchFormats: [],
      amenities: ['Parking', 'Showers', 'Lockers', 'Swimming Equipment', 'Sauna'],
      photos: [],
      hosterId: '4',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  const filteredVenues = mockVenues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !selectedSport || venue.sports.includes(selectedSport);
    const matchesAmenity = !selectedAmenity || venue.amenities.includes(selectedAmenity);
    
    return matchesSearch && matchesSport && matchesAmenity;
  });

  const getSportIcon = (sport: string) => {
    const icons: { [key: string]: string } = {
      'Football': '⚽',
      'Basketball': '🏀',
      'Tennis': '🎾',
      'Volleyball': '🏐',
      'Swimming': '🏊',
      'Fitness': '💪',
      'Boxing': '🥊',
      'Badminton': '🏸',
      'Water Polo': '🤽',
      'Aqua Fitness': '🏊‍♀️'
    };
    return icons[sport] || '🏃';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports Venues</h1>
          <p className="text-gray-600">Discover amazing sports facilities in your area</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="All Sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sports</SelectItem>
                {SPORTS.map((sport) => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedAmenity} onValueChange={setSelectedAmenity}>
              <SelectTrigger>
                <SelectValue placeholder="All Amenities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Amenities</SelectItem>
                {AMENITIES.map((amenity) => (
                  <SelectItem key={amenity} value={amenity}>{amenity}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{venue.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {venue.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={venue.isActive ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {venue.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{venue.address.street}</p>
                      <p>{venue.address.city}, {venue.address.state} {venue.address.zipCode}</p>
                    </div>
                  </div>

                  {/* Sports */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Available Sports</h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.sports.map((sport) => (
                        <Badge key={sport} variant="outline" className="flex items-center space-x-1">
                          <span>{getSportIcon(sport)}</span>
                          <span>{sport}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.amenities.slice(0, 4).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {venue.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{venue.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center space-x-4 pt-2 border-t">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-xs text-gray-500">(124 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">1.2k visitors</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Venues Message */}
        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No venues found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search for a different location
            </p>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Browse All Venues
            </Button>
          </div>
        )}

        {/* Map View Toggle */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            <MapPin className="h-5 w-5 mr-2" />
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
}

