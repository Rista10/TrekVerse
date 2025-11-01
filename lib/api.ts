import { TrailsResponse, TrailResponse } from "@/types/trail";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050/api";

export const trailApi = {
  getAllTrails: async (): Promise<TrailsResponse> => {
    const response = await fetch(`${API_BASE_URL}/trails/trails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for fresh data
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
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trail: ${response.statusText}`);
    }

    return response.json();
  },
};