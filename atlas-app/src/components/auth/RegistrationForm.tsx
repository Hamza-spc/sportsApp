'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserType } from '@/types';
import { SPORTS, SPECIALIZATIONS, USER_TYPES } from '@/constants';

const registrationSchema = z.object({
  userType: z.enum(['player', 'special_user', 'venue_hoster']),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string(),
  phoneNumber: z.string().optional(),
  
  // Player specific fields
  favoriteSport: z.string().optional(),
  position: z.string().optional(),
  
  // Special user specific fields
  specializations: z.array(z.string()).optional(),
  bio: z.string().optional(),
  experience: z.string().optional(),
  
  // Venue hoster specific fields
  companyName: z.string().optional(),
  
  // Terms and conditions
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
  isLoading?: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isLoading = false }) => {
  const [selectedUserType, setSelectedUserType] = useState<UserType>('player');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });

  const watchedUserType = watch('userType');

  const handleUserTypeChange = (value: string) => {
    const userType = value as 'player' | 'special_user' | 'venue_hoster';
    setSelectedUserType(userType);
    setValue('userType', userType);
  };

  const handleFormSubmit = (data: RegistrationFormData) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join Atlas</h1>
          <p className="text-lg text-gray-600">Connect, compete, and create amazing sports experiences</p>
        </motion.div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              Choose your user type and fill in the details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>I am a:</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {USER_TYPES.filter(type => type !== 'admin').map((type) => (
                    <motion.div
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="button"
                        variant={selectedUserType === type ? "default" : "outline"}
                        className="w-full h-20 flex-col space-y-2"
                        onClick={() => handleUserTypeChange(type)}
                      >
                        <div className="text-2xl">
                          {type === 'player' && '⚽'}
                          {type === 'special_user' && '👨‍🏫'}
                          {type === 'venue_hoster' && '🏟️'}
                        </div>
                        <span className="text-sm capitalize">
                          {type.replace('_', ' ')}
                        </span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                {errors.userType && (
                  <p className="text-sm text-red-600">{errors.userType.message}</p>
                )}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...register('username')}
                    placeholder="Choose a username"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-600">{errors.username.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth')}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                  <Input
                    id="phoneNumber"
                    {...register('phoneNumber')}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              {/* Player Specific Fields */}
              {selectedUserType === 'player' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-t pt-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Player Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="favoriteSport">Favorite Sport</Label>
                      <Select onValueChange={(value) => setValue('favoriteSport', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your favorite sport" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPORTS.map((sport) => (
                            <SelectItem key={sport} value={sport}>
                              {sport}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position (Optional)</Label>
                      <Input
                        id="position"
                        {...register('position')}
                        placeholder="e.g., Forward, Goalkeeper"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Special User Specific Fields */}
              {selectedUserType === 'special_user' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-t pt-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specializations">Specializations</Label>
                    <div className="flex flex-wrap gap-2">
                      {SPECIALIZATIONS.map((spec) => (
                        <Badge
                          key={spec}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-50"
                          onClick={() => {
                            const current = watch('specializations') || [];
                            const newValue = current.includes(spec)
                              ? current.filter(s => s !== spec)
                              : [...current, spec];
                            setValue('specializations', newValue);
                          }}
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      {...register('bio')}
                      placeholder="Tell us about your expertise and experience"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select onValueChange={(value) => setValue('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* Venue Hoster Specific Fields */}
              {selectedUserType === 'venue_hoster' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-t pt-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Venue Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (Optional)</Label>
                    <Input
                      id="companyName"
                      {...register('companyName')}
                      placeholder="Enter your company name"
                    />
                  </div>
                </motion.div>
              )}

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    {...register('acceptTerms')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={!isValid || isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
