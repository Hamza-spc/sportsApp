'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  Hash,
  Send,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { FeedPost, Comment } from '@/types';

export default function FeedPage() {
  const [newPost, setNewPost] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  // Mock feed data - replace with API call
  const mockFeedPosts: FeedPost[] = [
    {
      id: '1',
      content: 'Amazing game today! The team played incredibly well and we managed to win 3-1. Looking forward to the next match! ⚽ #football #teamwork #victory',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      },
      authorId: '1',
      author: { 
        id: '1', 
        username: 'soccerfan', 
        userType: 'player',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      } as any,
      hashtags: ['football', 'teamwork', 'victory', 'sports'],
      likes: ['1', '2', '3', '4', '5'],
      comments: [
        {
          id: '1',
          content: 'Great game! You guys were on fire today 🔥',
          authorId: '2',
          author: { id: '2', username: 'basketballpro', userType: 'player' } as any,
          postId: '1',
          createdAt: '2024-01-01T10:30:00Z',
          updatedAt: '2024-01-01T10:30:00Z'
        },
        {
          id: '2',
          content: 'Can\'t wait for the next match!',
          authorId: '3',
          author: { id: '3', username: 'tennislover', userType: 'player' } as any,
          postId: '1',
          createdAt: '2024-01-01T11:00:00Z',
          updatedAt: '2024-01-01T11:00:00Z'
        }
      ],
      shares: 5,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z'
    },
    {
      id: '2',
      content: 'Just finished an intense workout session at Elite Sports Center. The new equipment is amazing! 💪 #fitness #workout #gym',
      authorId: '2',
      author: { 
        id: '2', 
        username: 'basketballpro', 
        userType: 'player',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      } as any,
      hashtags: ['fitness', 'workout', 'gym', 'motivation'],
      likes: ['1', '2', '3'],
      comments: [],
      shares: 2,
      createdAt: '2024-01-01T09:00:00Z',
      updatedAt: '2024-01-01T09:00:00Z'
    },
    {
      id: '3',
      content: 'Tennis doubles session tonight was incredible! Perfect weather and great company. Thanks everyone for making it such a fun evening 🎾 #tennis #doubles #evening',
      media: {
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop'
      },
      authorId: '3',
      author: { 
        id: '3', 
        username: 'tennislover', 
        userType: 'player',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      } as any,
      hashtags: ['tennis', 'doubles', 'evening', 'sports'],
      likes: ['1', '2', '3', '4'],
      comments: [],
      shares: 1,
      createdAt: '2024-01-01T08:00:00Z',
      updatedAt: '2024-01-01T08:00:00Z'
    }
  ];

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleComment = (postId: string) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      // TODO: Implement comment submission
      console.log('Adding comment:', comment, 'to post:', postId);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const handleShare = (postId: string) => {
    // TODO: Implement share functionality
    console.log('Sharing post:', postId);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim() || selectedFile) {
      // TODO: Implement post creation
      console.log('Creating post:', { content: newPost, file: selectedFile });
      setNewPost('');
      setSelectedFile(null);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Create Post */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening in your sports world?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] resize-none border-0 focus:ring-0 text-sm"
                />
                
                {selectedFile && (
                  <div className="flex items-center space-x-2 mt-2 p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">{selectedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <ImageIcon className="h-5 w-5 text-blue-600 hover:text-blue-700" />
                    </label>
                    <Smile className="h-5 w-5 text-yellow-600 hover:text-yellow-700" />
                    <Hash className="h-5 w-5 text-green-600 hover:text-green-700" />
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    disabled={!newPost.trim() && !selectedFile}
                    size="sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-6">
          {mockFeedPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.profilePicture} />
                        <AvatarFallback>{post.author.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{post.author.username}</p>
                        <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Post Content */}
                  <p className="text-gray-900 mb-4 whitespace-pre-wrap">{post.content}</p>
                  
                  {/* Media */}
                  {post.media && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      {post.media.type === 'image' ? (
                        <img
                          src={post.media.url}
                          alt="Post media"
                          className="w-full h-auto max-h-96 object-cover"
                        />
                      ) : (
                        <video
                          src={post.media.url}
                          poster={post.media.thumbnail}
                          controls
                          className="w-full h-auto max-h-96"
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Hashtags */}
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.hashtags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 ${
                          likedPosts.has(post.id) ? 'text-red-600' : 'text-gray-600'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        <span>{post.likes.length}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <Share2 className="h-5 w-5" />
                        <span>{post.shares}</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Comments</h4>
                      <div className="space-y-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.author.profilePicture} />
                              <AvatarFallback>{comment.author.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{comment.author.username}</span>
                                <span className="ml-2 text-gray-600">{comment.content}</span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimeAgo(comment.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Add Comment */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex space-x-2">
                        <Input
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

