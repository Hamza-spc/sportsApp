/*
  # Atlas Sports Platform Database Schema

  1. New Tables
    - `profiles` - Extended user profiles with role-based data
    - `venues` - Sports venues and facilities
    - `match_formats` - Available match formats for sports
    - `events` - Sports events and activities
    - `event_participants` - Event participation tracking
    - `feed_posts` - Social media posts
    - `post_comments` - Comments on posts
    - `post_likes` - Post likes tracking
    - `bookings` - Venue/event bookings
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Role-based access control

  3. Functions
    - Custom functions for complex operations
    - Triggers for automatic updates
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_type AS ENUM ('admin', 'player', 'special_user', 'venue_hoster');
CREATE TYPE event_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'mixed');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  user_type user_type NOT NULL DEFAULT 'player',
  first_name text NOT NULL,
  last_name text NOT NULL,
  profile_picture text,
  date_of_birth date,
  phone_number text,
  is_verified boolean DEFAULT false,
  
  -- Player specific fields
  favorite_sport text,
  position text,
  bio text,
  
  -- Special user fields
  specializations text[],
  certifications text[],
  experience text,
  
  -- Venue hoster fields
  company_name text,
  is_approved boolean DEFAULT false,
  
  -- Social fields
  social_links jsonb DEFAULT '{}',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Venues table
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address jsonb NOT NULL,
  coordinates jsonb NOT NULL,
  sports text[] NOT NULL DEFAULT '{}',
  amenities text[] NOT NULL DEFAULT '{}',
  photos text[] DEFAULT '{}',
  hoster_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Match formats table
CREATE TABLE IF NOT EXISTS match_formats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  player_count integer NOT NULL,
  sport text NOT NULL,
  duration integer NOT NULL, -- in minutes
  price numeric(10,2) DEFAULT 0,
  venue_id uuid REFERENCES venues(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  sport text NOT NULL,
  venue_id uuid REFERENCES venues(id) ON DELETE CASCADE,
  match_format_id uuid REFERENCES match_formats(id),
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  event_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  age_min integer DEFAULT 0,
  age_max integer DEFAULT 100,
  gender gender_type DEFAULT 'mixed',
  max_players integer NOT NULL,
  current_players integer DEFAULT 0,
  price numeric(10,2) DEFAULT 0,
  status event_status DEFAULT 'pending',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event participants table
CREATE TABLE IF NOT EXISTS event_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(event_id, participant_id)
);

-- Feed posts table
CREATE TABLE IF NOT EXISTS feed_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  media jsonb,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  hashtags text[] DEFAULT '{}',
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES feed_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Post comments table
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES feed_posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type notification_type DEFAULT 'info',
  is_read boolean DEFAULT false,
  related_id uuid,
  created_at timestamptz DEFAULT now()
);

-- User follows table (for social features)
CREATE TABLE IF NOT EXISTS user_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  following_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for venues
CREATE POLICY "Anyone can view active venues" ON venues FOR SELECT USING (is_active = true);
CREATE POLICY "Venue hosters can manage their venues" ON venues FOR ALL USING (auth.uid() = hoster_id);
CREATE POLICY "Admins can manage all venues" ON venues FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin')
);

-- RLS Policies for match_formats
CREATE POLICY "Anyone can view match formats" ON match_formats FOR SELECT USING (true);
CREATE POLICY "Venue hosters can manage their match formats" ON match_formats FOR ALL USING (
  EXISTS (SELECT 1 FROM venues WHERE id = venue_id AND hoster_id = auth.uid())
);

-- RLS Policies for events
CREATE POLICY "Anyone can view confirmed events" ON events FOR SELECT USING (status = 'confirmed');
CREATE POLICY "Event creators can manage their events" ON events FOR ALL USING (auth.uid() = creator_id);
CREATE POLICY "Participants can view events they joined" ON events FOR SELECT USING (
  EXISTS (SELECT 1 FROM event_participants WHERE event_id = id AND participant_id = auth.uid())
);

-- RLS Policies for event_participants
CREATE POLICY "Anyone can view event participants" ON event_participants FOR SELECT USING (true);
CREATE POLICY "Users can join/leave events" ON event_participants FOR ALL USING (auth.uid() = participant_id);

-- RLS Policies for feed_posts
CREATE POLICY "Anyone can view posts" ON feed_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON feed_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own posts" ON feed_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts" ON feed_posts FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for post_likes
CREATE POLICY "Anyone can view likes" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their likes" ON post_likes FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for post_comments
CREATE POLICY "Anyone can view comments" ON post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON post_comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own comments" ON post_comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own comments" ON post_comments FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Event creators can view all bookings for their events" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM events WHERE id = event_id AND creator_id = auth.uid())
);

-- RLS Policies for notifications
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_follows
CREATE POLICY "Anyone can view follows" ON user_follows FOR SELECT USING (true);
CREATE POLICY "Users can manage their follows" ON user_follows FOR ALL USING (auth.uid() = follower_id);

-- Functions and Triggers

-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, username, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feed_posts_updated_at BEFORE UPDATE ON feed_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON post_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update event participant count
CREATE OR REPLACE FUNCTION update_event_participant_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET current_players = current_players + 1 
    WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET current_players = current_players - 1 
    WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for event participant count
CREATE TRIGGER update_event_participants_count
  AFTER INSERT OR DELETE ON event_participants
  FOR EACH ROW EXECUTE FUNCTION update_event_participant_count();

-- Function to update post likes count
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE feed_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE feed_posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for post likes count
CREATE TRIGGER update_post_likes_count_trigger
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

-- Function to update post comments count
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE feed_posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE feed_posts 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for post comments count
CREATE TRIGGER update_post_comments_count_trigger
  AFTER INSERT OR DELETE ON post_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

-- Insert some sample data for testing
INSERT INTO profiles (id, email, username, user_type, first_name, last_name, favorite_sport, bio) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@atlas.com', 'admin', 'admin', 'Atlas', 'Admin', NULL, 'Platform administrator'),
  ('00000000-0000-0000-0000-000000000002', 'john@example.com', 'soccerfan', 'player', 'John', 'Doe', 'Football', 'Passionate football player with 15+ years of experience'),
  ('00000000-0000-0000-0000-000000000003', 'sarah@example.com', 'basketballpro', 'player', 'Sarah', 'Johnson', 'Basketball', 'Professional basketball coach and player'),
  ('00000000-0000-0000-0000-000000000004', 'mike@venue.com', 'sportscenter', 'venue_hoster', 'Mike', 'Wilson', NULL, 'Sports facility manager')
ON CONFLICT (id) DO NOTHING;

-- Insert sample venues
INSERT INTO venues (id, name, description, address, coordinates, sports, amenities, hoster_id) VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    'Central Sports Complex',
    'Multi-sport facility in the heart of the city with professional-grade equipment and facilities.',
    '{"street": "123 Main St", "city": "Casablanca", "state": "Casablanca-Settat", "zipCode": "20000", "country": "Morocco"}',
    '{"latitude": 33.5731, "longitude": -7.5898}',
    ARRAY['Football', 'Basketball', 'Tennis', 'Volleyball'],
    ARRAY['Parking', 'Showers', 'WiFi', 'Lockers', 'Café'],
    '00000000-0000-0000-0000-000000000004'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Elite Sports Center',
    'Premium basketball and fitness facility with state-of-the-art equipment.',
    '{"street": "456 Sports Ave", "city": "Casablanca", "state": "Casablanca-Settat", "zipCode": "20000", "country": "Morocco"}',
    '{"latitude": 33.5731, "longitude": -7.5898}',
    ARRAY['Basketball', 'Fitness', 'Boxing'],
    ARRAY['Parking', 'Showers', 'WiFi', 'Equipment Rental', 'Pro Shop'],
    '00000000-0000-0000-0000-000000000004'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample match formats
INSERT INTO match_formats (venue_id, name, player_count, sport, duration) VALUES
  ('10000000-0000-0000-0000-000000000001', '5v5', 10, 'Football', 90),
  ('10000000-0000-0000-0000-000000000001', '3v3', 6, 'Basketball', 60),
  ('10000000-0000-0000-0000-000000000002', '3v3', 6, 'Basketball', 60);

-- Insert sample events
INSERT INTO events (title, description, sport, venue_id, creator_id, event_date, start_time, end_time, max_players, status) VALUES
  (
    'Weekend Football Match',
    'Casual 5v5 football game for all skill levels. Come join us for a fun afternoon of football!',
    'Football',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    CURRENT_DATE + INTERVAL '7 days',
    '14:00',
    '15:30',
    10,
    'confirmed'
  ),
  (
    'Basketball Tournament',
    'Competitive 3v3 basketball tournament with prizes for winners.',
    'Basketball',
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    CURRENT_DATE + INTERVAL '14 days',
    '10:00',
    '18:00',
    24,
    'confirmed'
  );

-- Insert sample feed posts
INSERT INTO feed_posts (content, author_id, hashtags) VALUES
  (
    'Amazing game today! The team played incredibly well and we managed to win 3-1. Looking forward to the next match! ⚽',
    '00000000-0000-0000-0000-000000000002',
    ARRAY['football', 'teamwork', 'victory', 'sports']
  ),
  (
    'Just finished an intense workout session at Elite Sports Center. The new equipment is amazing! 💪',
    '00000000-0000-0000-0000-000000000003',
    ARRAY['fitness', 'workout', 'gym', 'motivation']
  );