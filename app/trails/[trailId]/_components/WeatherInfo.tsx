import React from 'react';
import { Droplets, Eye, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WeatherInfoProps {
  temperature?: number;
  condition?: string;
  conditionIcon?: string;
  visibility?: number;
  precipitation?: number;
  alert?: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  temperature = 22,
  condition = 'Partly cloudy',
  conditionIcon = '//cdn.weatherapi.com/weather/64x64/day/116.png',
  visibility = 10,
  precipitation = 0,
  alert
}) => {
  return (
    <Card className="max-w-md">
      <CardContent className="p-6">
        {/* Main Temperature Display */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img 
              src={conditionIcon} 
              alt={condition}
              className="w-16 h-16"
            />
            <div>
              <div className="text-5xl font-light text-foreground">
                {temperature}°
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {condition}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Visibility */}
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Visibility</div>
              <div className="text-sm font-medium text-foreground">{visibility} km</div>
            </div>
          </div>

          {/* Precipitation */}
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Precipitation</div>
              <div className="text-sm font-medium text-foreground">{precipitation} mm</div>
            </div>
          </div>
        </div>

        {/* Alert */}
        {alert && (
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <div className="text-xs font-medium mb-1">Weather Alert</div>
              <div className="text-xs">{alert}</div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherInfo;
