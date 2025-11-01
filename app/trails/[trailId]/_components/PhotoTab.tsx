import { Card, CardContent } from "@/components/ui/card";
import PhotoCarousel from "@/components/myPhotosCarousel";

interface Photo {
  id: string;
  url: string;
  caption?: string;
}

interface PhotosTabProps {
  photos: Photo[];
}

export const PhotosTab: React.FC<PhotosTabProps> = ({ photos }) => {
  return (
    <Card className="bg-white backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold">My Photo Gallery</h2>
        
        {/* Carousel Section */}
        <div className="">
          <PhotoCarousel />
        </div>
      </CardContent>
    </Card>
  );
};