export interface Comment {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  trailId?: string;
  content: string;
  category: 'general' | 'incident' | 'tip' | 'question';
  images?: string[];
  likes: string[];
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  content: string;
  createdAt: string;
}