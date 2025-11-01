import { Card, CardContent } from "@/components/ui/card";

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
        <h2 className="text-xl font-semibold mb-6">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
              <img
                src={photo.url}
                alt={photo.caption || 'Location photo'}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};