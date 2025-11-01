'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, MessageSquare } from 'lucide-react';
import { CommentCard } from '@/app/forum/_components/CommentCard';
import { CreateCommentModal } from '@/app/forum/_components/CreateCommentModel';
import { Comment } from '@/app/forum/types/comment';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface ReviewsTabProps {
  trailId: string;
  rating: number;
  reviewCount: number;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  trailId,
  rating,
  reviewCount
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string; linkTo?: string }>({ type: '', text: '' });

  useEffect(() => {
    if (trailId) {
      fetchComments();
    }
  }, [trailId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      // Use trail name as trailId (URL-encoded)
      const encodedTrailId = encodeURIComponent(trailId);
      const response = await fetch(`http://localhost:5050/api/comments/getbytrail/${encodedTrailId}`);
      
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
      formData.append('trailId', trailId); // Pass trailId when creating comment
      
      if (data.images) {
        data.images.forEach((img: File) => {
          formData.append('images', img);
        });
      }

      console.log('Sending request to create comment...', {
        content: data.content,
        category: data.category,
        trailId: trailId,
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

        setMessage({ type: 'success', text: 'Review posted successfully!' });
        setIsModalOpen(false);
        await fetchComments();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        let errorMsg = responseData.message || `Server error (${response.status}). Please try again.`;
        
        if (response.status === 401) {
          if (responseData.message?.includes('token missing') || responseData.message?.includes('Access token missing')) {
            errorMsg = 'Please log in to post a review.';
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
            errorMsg = 'Authentication required. Please log in to post a review.';
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
        text: 'Please log in to like reviews.',
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
        text: 'Please log in to reply to reviews.',
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

  const handleLoginRequired = () => {
    router.push('/login');
  };

  // Calculate average rating from comments (if we add rating to comments later)
  // For now, use the provided rating
  const displayRating = rating;
  const displayReviewCount = comments.length || reviewCount;

  return (
    <Card>
      <CardContent className="">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{displayRating}</span>
            <span className="text-muted-foreground">({displayReviewCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-lg border-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="font-semibold text-sm">
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

        {/* Create Review Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto"
          >
            <Plus size={20} className="mr-2" />
            Write a Review
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading reviews...</p>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                currentUserId={user?.id || ''}
                onLike={handleLike}
                onReply={handleReply}
              />
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <MessageSquare size={64} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Be the first to share your experience!
              </p>
              <Button onClick={() => setIsModalOpen(true)} variant="default">
                <Plus size={20} className="mr-2" />
                Write First Review
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      {/* Create Comment Modal */}
      <CreateCommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateComment}
        onLoginRequired={handleLoginRequired}
      />
    </Card>
  );
};
