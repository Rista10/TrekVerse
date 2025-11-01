import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, Bookmark, ChevronDown, MapPin, Star } from "lucide-react";

interface LocationHeaderProps {
  name: string;
  description: string;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  name,
  description,
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Info */}
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
                <p className="text-muted-foreground mb-4">{description}</p>
                
              </div>
            </div>

        
          </div>
        </div>
      </CardContent>
    </Card>
  );
};