'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  AlertTriangle, 
  Lightbulb, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react';
import { Comment } from '../types/comment';
import { Button } from './Button';

interface CommentCardProps {
  comment: Comment;
  currentUserId: string;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({ 
  comment, 
  currentUserId, 
  onLike, 
  onReply 
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const isLiked = comment.likes?.includes(currentUserId) || false;

  const getCategoryIcon = () => {
    switch (comment.category) {
      case 'incident':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'tip':
        return <Lightbulb size={16} className="text-yellow-500" />;
      case 'question':
        return <HelpCircle size={16} className="text-blue-500" />;
      default:
        return <MessageCircle size={16} className="text-gray-500" />;
    }
  };

  const getCategoryBadge = () => {
    const badges = {
      incident: 'bg-red-100 text-red-700 border-red-200',
      tip: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      question: 'bg-blue-100 text-blue-700 border-blue-200',
      general: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badges[comment.category]} flex items-center gap-1`}>
        {getCategoryIcon()}
        {comment.category.charAt(0).toUpperCase() + comment.category.slice(1)}
      </span>
    );
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment._id, replyContent);
      setReplyContent('');
      setShowReplyInput(false);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return 'Just now';
    try {
      const now = new Date();
      const commentDate = new Date(date);
      const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
      
      return commentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (error) {
      return 'Just now';
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {(comment.userId?.fullName?.charAt(0) || 'U').toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{comment.userId?.fullName || 'Unknown User'}</h3>
            <p className="text-xs text-gray-500">{comment.createdAt ? formatDate(comment.createdAt) : 'Just now'}</p>
          </div>
        </div>
        {getCategoryBadge()}
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
        {comment.content || ''}
      </p>

      {/* Images */}
      {comment.images && comment.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {comment.images.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={`Comment attachment ${idx + 1}`}
              className="rounded-lg w-full h-48 object-cover"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onLike(comment._id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            isLiked 
              ? 'bg-red-50 text-red-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-sm font-semibold">{comment.likes?.length || 0}</span>
        </button>

        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"
        >
          <MessageCircle size={18} />
          <span className="text-sm font-semibold">{comment.replies?.length || 0}</span>
        </button>

        {(comment.replies?.length || 0) > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-blue-600 transition-all text-sm font-semibold ml-auto"
          >
            {showReplies ? (
              <>
                <ChevronUp size={18} />
                Hide Replies
              </>
            ) : (
              <>
                <ChevronDown size={18} />
                View {comment.replies?.length || 0} {(comment.replies?.length || 0) === 1 ? 'Reply' : 'Replies'}
              </>
            )}
          </button>
        )}
      </div>

      {/* Reply Input */}
      {showReplyInput && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
            />
            <Button onClick={handleReplySubmit} variant="primary">
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}

      {/* Replies */}
      {showReplies && (comment.replies?.length || 0) > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {comment.replies?.map((reply) => (
            <div key={reply._id} className="flex gap-3 pl-4 border-l-2 border-blue-200">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {(reply.userId?.fullName?.charAt(0) || 'U').toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">
                    {reply.userId?.fullName || 'Unknown User'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {reply.createdAt ? formatDate(reply.createdAt) : 'Just now'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{reply.content || ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
