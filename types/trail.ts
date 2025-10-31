export interface Trail {
  _id: string;
  name: string;
  location: string;
  description: string;
  difficulty: string;
  distance: number;
  duration: string;
  images: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrailsResponse {
  message: string;
  trails: Trail[];
}

export interface TrailResponse {
  message: string;
  trail: Trail;
}