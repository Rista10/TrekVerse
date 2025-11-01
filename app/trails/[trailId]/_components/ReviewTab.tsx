import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsTabProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  reviews,
  rating,
  reviewCount
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{rating}</span>
            <span className="text-muted-foreground">({reviewCount.toLocaleString()})</span>
          </div>
        </div>
        
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-semibold">
                  {review.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{review.author}</h3>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-6">
          Load more reviews
        </Button>
      </CardContent>
    </Card>
  );
};