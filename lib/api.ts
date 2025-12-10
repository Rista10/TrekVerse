import { TrailsResponse, TrailResponse } from "@/types/trail";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050/api";

export const trailApi = {
  getAllTrails: async (): Promise<TrailsResponse> => {
    const response = await fetch(`${API_BASE_URL}/trails/trails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes - trails don't change frequently
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trails: ${response.statusText}`);
    }

    return response.json();
  },

  getTrailById: async (id: string): Promise<TrailResponse> => {
    const response = await fetch(`${API_BASE_URL}/trails/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 }, // Cache for 10 minutes - individual trail data is stable
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trail: ${response.statusText}`);
    }

    return response.json();
  },
};