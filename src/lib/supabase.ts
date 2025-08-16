import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  getCurrentSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
};

// Database helpers
export const db = {
  // Profiles
  getProfile: async (userId: string) => {
    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  },

  updateProfile: async (userId: string, updates: any) => {
    return await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
  },

  // Events
  getEvents: async (filters?: any) => {
    let query = supabase
      .from('events')
      .select(`
        *,
        venue:venues(*),
        creator:profiles(*),
        participants:event_participants(
          participant:profiles(*)
        )
      `)
      .eq('status', 'confirmed')
      .order('event_date', { ascending: true });

    if (filters?.sport) {
      query = query.eq('sport', filters.sport);
    }
    if (filters?.gender) {
      query = query.eq('gender', filters.gender);
    }
    if (filters?.date) {
      query = query.eq('event_date', filters.date);
    }

    return await query;
  },

  createEvent: async (eventData: any) => {
    return await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();
  },

  joinEvent: async (eventId: string, userId: string) => {
    return await supabase
      .from('event_participants')
      .insert({ event_id: eventId, participant_id: userId });
  },

  leaveEvent: async (eventId: string, userId: string) => {
    return await supabase
      .from('event_participants')
      .delete()
      .eq('event_id', eventId)
      .eq('participant_id', userId);
  },

  // Venues
  getVenues: async (filters?: any) => {
    let query = supabase
      .from('venues')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (filters?.sport) {
      query = query.contains('sports', [filters.sport]);
    }
    if (filters?.amenity) {
      query = query.contains('amenities', [filters.amenity]);
    }

    return await query;
  },

  createVenue: async (venueData: any) => {
    return await supabase
      .from('venues')
      .insert(venueData)
      .select()
      .single();
  },

  // Feed Posts
  getFeedPosts: async () => {
    return await supabase
      .from('feed_posts')
      .select(`
        *,
        author:profiles(*),
        likes:post_likes(user_id),
        comments:post_comments(
          *,
          author:profiles(*)
        )
      `)
      .order('created_at', { ascending: false });
  },

  createPost: async (postData: any) => {
    return await supabase
      .from('feed_posts')
      .insert(postData)
      .select()
      .single();
  },

  likePost: async (postId: string, userId: string) => {
    return await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId });
  },

  unlikePost: async (postId: string, userId: string) => {
    return await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);
  },

  addComment: async (postId: string, userId: string, content: string) => {
    return await supabase
      .from('post_comments')
      .insert({ post_id: postId, author_id: userId, content });
  }
};

// Real-time subscriptions
export const subscriptions = {
  subscribeToEvents: (callback: (payload: any) => void) => {
    return supabase
      .channel('events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, callback)
      .subscribe();
  },

  subscribeToFeedPosts: (callback: (payload: any) => void) => {
    return supabase
      .channel('feed_posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feed_posts' }, callback)
      .subscribe();
  },

  subscribeToNotifications: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('notifications')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, 
        callback
      )
      .subscribe();
  }
};