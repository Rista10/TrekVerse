'use client';

import React, { useState } from 'react';
import { X, Upload, AlertTriangle, Lightbulb, HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from './Button';

interface CreateCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    content: string;
    category: string;
    images?: File[];
  }) => void;
}

export const CreateCommentModal: React.FC<CreateCommentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [images, setImages] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit({ content, category, images });
      setContent('');
      setCategory('general');
      setImages([]);
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const categories = [
    { value: 'general', label: 'General', icon: MessageCircle, color: 'gray' },
    { value: 'incident', label: 'Report Incident', icon: AlertTriangle, color: 'red' },
    { value: 'tip', label: 'Share Tip', icon: Lightbulb, color: 'yellow' },
    { value: 'question', label: 'Ask Question', icon: HelpCircle, color: 'blue' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Share with Community</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What would you like to share?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? `border-${cat.color}-500 bg-${cat.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={24} className={`text-${cat.color}-500`} />
                    <span className="font-semibold text-gray-900">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience, tips, or ask questions..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              {content.length} / 1000 characters
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add Photos (Optional)
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload size={32} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Click to upload images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {images.length > 0 && (
              <p className="text-sm text-green-600 mt-2">
                {images.length} image(s) selected
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Button onClick={onClose} variant="primary" className="flex-1 bg-gray-500">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary" className="flex-1">
            Post to Community
          </Button>
        </div>
      </div>
    </div>
  );
};

