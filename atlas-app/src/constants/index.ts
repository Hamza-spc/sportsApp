export const SPORTS = [
  'Football',
  'Basketball',
  'Tennis',
  'Volleyball',
  'Handball',
  'Rugby',
  'Cricket',
  'Baseball',
  'Hockey',
  'Badminton',
  'Table Tennis',
  'Golf',
  'Swimming',
  'Athletics',
  'Boxing',
  'Martial Arts',
  'Cycling',
  'Running',
  'Yoga',
  'Fitness'
] as const;

export const MATCH_FORMATS = [
  { name: '1v1', playerCount: 2, sports: ['Tennis', 'Table Tennis', 'Boxing', 'Martial Arts'] },
  { name: '2v2', playerCount: 4, sports: ['Volleyball', 'Badminton', 'Tennis'] },
  { name: '3v3', playerCount: 6, sports: ['Basketball', 'Volleyball', 'Football'] },
  { name: '5v5', playerCount: 10, sports: ['Basketball', 'Football', 'Volleyball'] },
  { name: '6v6', playerCount: 12, sports: ['Volleyball', 'Football'] },
  { name: '7v7', playerCount: 14, sports: ['Football', 'Rugby'] },
  { name: '8v8', playerCount: 16, sports: ['Football', 'Rugby'] },
  { name: '9v9', playerCount: 18, sports: ['Football'] },
  { name: '11v11', playerCount: 22, sports: ['Football', 'Rugby', 'Cricket'] }
] as const;

export const POSITIONS = {
  Football: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Winger'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Volleyball: ['Setter', 'Outside Hitter', 'Middle Blocker', 'Opposite Hitter', 'Libero'],
  Tennis: ['Singles', 'Doubles']
} as const;

export const AMENITIES = [
  'Parking',
  'Showers',
  'Lockers',
  'Equipment Rental',
  'Café',
  'WiFi',
  'Air Conditioning',
  'Heating',
  'Lighting',
  'Seating',
  'First Aid',
  'Security',
  'Accessibility',
  'Child Care',
  'Pro Shop'
] as const;

export const GENDERS = ['male', 'female', 'mixed'] as const;

export const EVENT_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'] as const;

export const BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled'] as const;

export const PAYMENT_STATUSES = ['pending', 'completed', 'failed', 'refunded'] as const;

export const NOTIFICATION_TYPES = ['info', 'success', 'warning', 'error'] as const;

export const USER_TYPES = ['admin', 'player', 'special_user', 'venue_hoster'] as const;

export const SPECIALIZATIONS = [
  'Coach',
  'Trainer',
  'Event Organizer',
  'Scout',
  'Physiotherapist',
  'Nutritionist',
  'Sports Psychologist',
  'Referee',
  'Instructor',
  'Manager'
] as const;

export const AGE_RANGES = [
  { label: 'Under 18', min: 0, max: 17 },
  { label: '18-25', min: 18, max: 25 },
  { label: '26-35', min: 26, max: 35 },
  { label: '36-45', min: 36, max: 45 },
  { label: '46-55', min: 46, max: 55 },
  { label: 'Over 55', min: 56, max: 100 }
] as const;

export const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00'
] as const;

export const DURATIONS = [
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '1.5 hours', value: 90 },
  { label: '2 hours', value: 120 },
  { label: '2.5 hours', value: 150 },
  { label: '3 hours', value: 180 }
] as const;
