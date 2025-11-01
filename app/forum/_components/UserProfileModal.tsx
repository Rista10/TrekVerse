'use client';

import React from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    fullName: string;
    email: string;
    phoneNo: string;
  } | null;
  loading?: boolean;
  error?: string;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  loading = false,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading user information...</p>
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Name</p>
                  <p className="text-gray-900 font-semibold">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Email</p>
                  <p className="text-gray-900 font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Phone Number</p>
                  <p className="text-gray-900 font-semibold">{user.phoneNo || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <Button
              onClick={onClose}
              className="w-full"
              variant="outline"
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">
              {error || "Failed to load user information"}
            </p>
            {error && (
              <p className="text-sm text-gray-500 mb-4">
                Please try again later or check if the user exists.
              </p>
            )}
            <Button
              onClick={onClose}
              className="mt-4"
              variant="outline"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

