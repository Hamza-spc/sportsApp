export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string
          user_type: 'admin' | 'player' | 'special_user' | 'venue_hoster'
          first_name: string
          last_name: string
          profile_picture: string | null
          date_of_birth: string | null
          phone_number: string | null
          is_verified: boolean
          favorite_sport: string | null
          position: string | null
          bio: string | null
          specializations: string[] | null
          certifications: string[] | null
          experience: string | null
          company_name: string | null
          is_approved: boolean
          social_links: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          user_type?: 'admin' | 'player' | 'special_user' | 'venue_hoster'
          first_name: string
          last_name: string
          profile_picture?: string | null
          date_of_birth?: string | null
          phone_number?: string | null
          is_verified?: boolean
          favorite_sport?: string | null
          position?: string | null
          bio?: string | null
          specializations?: string[] | null
          certifications?: string[] | null
          experience?: string | null
          company_name?: string | null
          is_approved?: boolean
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          user_type?: 'admin' | 'player' | 'special_user' | 'venue_hoster'
          first_name?: string
          last_name?: string
          profile_picture?: string | null
          date_of_birth?: string | null
          phone_number?: string | null
          is_verified?: boolean
          favorite_sport?: string | null
          position?: string | null
          bio?: string | null
          specializations?: string[] | null
          certifications?: string[] | null
          experience?: string | null
          company_name?: string | null
          is_approved?: boolean
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
      }
      venues: {
        Row: {
          id: string
          name: string
          description: string | null
          address: Json
          coordinates: Json
          sports: string[]
          amenities: string[]
          photos: string[]
          hoster_id: string | null
          is_active: boolean
          rating: number
          total_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address: Json
          coordinates: Json
          sports?: string[]
          amenities?: string[]
          photos?: string[]
          hoster_id?: string | null
          is_active?: boolean
          rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: Json
          coordinates?: Json
          sports?: string[]
          amenities?: string[]
          photos?: string[]
          hoster_id?: string | null
          is_active?: boolean
          rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          sport: string
          venue_id: string | null
          match_format_id: string | null
          creator_id: string | null
          event_date: string
          start_time: string
          end_time: string
          age_min: number
          age_max: number
          gender: 'male' | 'female' | 'mixed'
          max_players: number
          current_players: number
          price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          sport: string
          venue_id?: string | null
          match_format_id?: string | null
          creator_id?: string | null
          event_date: string
          start_time: string
          end_time: string
          age_min?: number
          age_max?: number
          gender?: 'male' | 'female' | 'mixed'
          max_players: number
          current_players?: number
          price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          sport?: string
          venue_id?: string | null
          match_format_id?: string | null
          creator_id?: string | null
          event_date?: string
          start_time?: string
          end_time?: string
          age_min?: number
          age_max?: number
          gender?: 'male' | 'female' | 'mixed'
          max_players?: number
          current_players?: number
          price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      feed_posts: {
        Row: {
          id: string
          content: string
          media: Json | null
          author_id: string | null
          hashtags: string[]
          likes_count: number
          comments_count: number
          shares_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          media?: Json | null
          author_id?: string | null
          hashtags?: string[]
          likes_count?: number
          comments_count?: number
          shares_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          media?: Json | null
          author_id?: string | null
          hashtags?: string[]
          likes_count?: number
          comments_count?: number
          shares_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      event_participants: {
        Row: {
          id: string
          event_id: string | null
          participant_id: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          participant_id?: string | null
          joined_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          participant_id?: string | null
          joined_at?: string
        }
      }
      post_likes: {
        Row: {
          id: string
          post_id: string | null
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id?: string | null
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string | null
          user_id?: string | null
          created_at?: string
        }
      }
      post_comments: {
        Row: {
          id: string
          post_id: string | null
          author_id: string | null
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id?: string | null
          author_id?: string | null
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string | null
          author_id?: string | null
          content: string
          created_at?: string
          updated_at?: string
        }
      }
      match_formats: {
        Row: {
          id: string
          name: string
          player_count: number
          sport: string
          duration: number
          price: number
          venue_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          player_count: number
          sport: string
          duration: number
          price?: number
          venue_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          player_count?: number
          sport?: string
          duration?: number
          price?: number
          venue_id?: string | null
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          event_id: string | null
          user_id: string | null
          status: 'pending' | 'confirmed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          user_id?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          user_id?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          title: string
          message: string
          type: 'info' | 'success' | 'warning' | 'error'
          is_read: boolean
          related_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          message: string
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          related_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          message?: string
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          related_id?: string | null
          created_at?: string
        }
      }
      user_follows: {
        Row: {
          id: string
          follower_id: string | null
          following_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          follower_id?: string | null
          following_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string | null
          following_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'admin' | 'player' | 'special_user' | 'venue_hoster'
      event_status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
      booking_status: 'pending' | 'confirmed' | 'cancelled'
      gender_type: 'male' | 'female' | 'mixed'
      notification_type: 'info' | 'success' | 'warning' | 'error'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}