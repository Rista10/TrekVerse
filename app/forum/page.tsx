'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Users, MessageSquare } from 'lucide-react';
import { CommentCard } from './_components/CommentCard';
import { CreateCommentModal } from './_components/CreateCommentModel';
import { FilterBar } from './_components//FilterBar';
import { Button } from './_components/Button';
import { Comment } from './types/comment';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

export default function ForumPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth(); // Add this hook
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string; linkTo?: string }>({ type: '', text: '' });

  useEffect(() => {
    fetchComments();
  }, [selectedCategory]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? 'http://localhost:5050/api/comments'
        : `http://localhost:5050/api/comments?category=${selectedCategory}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (data: any) => {
    try {
      setMessage({ type: '', text: '' });
      
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('category', data.category);
      
      if (data.images) {
        data.images.forEach((img: File) => {
          formData.append('images', img);
        });
      }

      console.log('Sending request to create comment...', {
        content: data.content,
        category: data.category,
        hasImages: !!data.images?.length
      });
      
      const response = await fetch('http://localhost:5050/api/comments', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }).catch((fetchError) => {
        console.error('Fetch error details:', fetchError);
        throw fetchError;
      });

      console.log('Response status:', response.status);

      let responseData;
      try {
        const text = await response.text();
        responseData = text ? JSON.parse(text) : {};
        console.log('Response data:', responseData);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        responseData = { message: 'Failed to parse server response' };
      }

      if (response.ok) {
        setMessage({ type: 'success', text: 'Post created successfully!' });
        setIsModalOpen(false);
        await fetchComments();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        let errorMsg = responseData.message || `Server error (${response.status}). Please try again.`;
        
        if (response.status === 401) {
          if (responseData.message?.includes('token missing') || responseData.message?.includes('Access token missing')) {
            errorMsg = 'Please log in to create a post.';
            setMessage({ 
              type: 'error', 
              text: errorMsg,
              linkTo: '/login'
            });
            return;
          } else if (responseData.message?.includes('expired')) {
            errorMsg = 'Your session has expired. Please log in again.';
            setMessage({ 
              type: 'error', 
              text: errorMsg,
              linkTo: '/login'
            });
            return;
          } else {
            errorMsg = 'Authentication required. Please log in to create a post.';
          }
        }
        
        setMessage({ 
          type: 'error', 
          text: errorMsg
        });
        console.error('Error response:', response.status, responseData);
      }
    } catch (error: any) {
      console.error('Error creating comment:', error);
      let errorMessage = 'An error occurred. Please check your connection and try again.';
      
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend server is running on port 5050.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });
    }
  };

  const handleLike = async (commentId: string) => {
    // Check authentication before allowing like
    if (!isAuthenticated) {
      setMessage({ 
        type: 'error', 
        text: 'Please log in to like posts.',
        linkTo: '/login'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5050/api/comments/${commentId}/like`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        fetchComments();
      } else if (response.status === 401) {
        setMessage({ 
          type: 'error', 
          text: 'Your session has expired. Please log in again.',
          linkTo: '/login'
        });
      } else {
        const data = await response.json();
        console.error('Error liking comment:', data);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleReply = async (commentId: string, content: string) => {
    // Check authentication before allowing reply
    if (!isAuthenticated) {
      setMessage({ 
        type: 'error', 
        text: 'Please log in to reply to posts.',
        linkTo: '/login'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5050/api/comments/${commentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });
      
      if (response.ok) {
        fetchComments();
      } else if (response.status === 401) {
        setMessage({ 
          type: 'error', 
          text: 'Your session has expired. Please log in again.',
          linkTo: '/login'
        });
      } else {
        const data = await response.json();
        console.error('Error replying to comment:', data);
      }
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  // Handler for when login is required from modal
  const handleLoginRequired = () => {
    router.push('/login');
  };

  const filteredComments = comments.filter(comment => {
    if (!comment) return false;
    
    const contentMatch = comment.content?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const userMatch = comment.userId?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    
    return contentMatch || userMatch;
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="fixed inset-0 z-0">
                      <Image
                        src="/frames/frame_0192.png"
                        alt="Mountain background"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Success/Error Message */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-lg border-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="font-semibold">
              {message.text}
              {message.linkTo && (
                <button
                  onClick={() => router.push(message.linkTo!)}
                  className="ml-2 underline hover:no-underline font-bold"
                >
                  Go to Login
                </button>
              )}
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Users size={36} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            TrekVerse Community
          </h1>
          
          {/* Show welcome message if logged in */}
          {isAuthenticated && user && (
            <p className="mt-3 text-sm text-blue-600 font-medium">
              Welcome back, {user.fullName}!
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background/50 backdrop-blur-md border-muted  rounded-xl p-6 border-2 border-gray-200 shadow-md">
            <div className="flex items-center gap-4 ">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur-md border-muted  rounded-xl p-6 border-2 border-gray-200 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1.2k</p>
                <p className="text-sm text-gray-600">Active Members</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="h-full bg-background/50 backdrop-blur-md border-muted "
          >
            <Plus size={24} />
            Create New Post
          </Button>
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />

        {/* Comments List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading discussions...</p>
            </div>
          ) : filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                currentUserId={user?.id || ''} // Pass user ID from auth context
                onLike={handleLike}
                onReply={handleReply}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-background/50 backdrop-blur-md border-muted  rounded-xl border-2 border-gray-200">
              <MessageSquare size={64} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to start a discussion!
              </p>
              <Button onClick={() => setIsModalOpen(true)} variant="primary">
                <Plus size={20} />
                Create Post
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Create Comment Modal */}
      <CreateCommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateComment}
        onLoginRequired={handleLoginRequired} // Add this prop
      />
    </div>
  );
}