
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';



interface Checkpoint {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

interface LocationHeaderProps {
  name: string;
  description: string;
  duration?: string;
  difficulty?: string;
  checkpoints?: Checkpoint[];
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  name,
  description,
  duration,
  difficulty,
  checkpoints = [],
}) => {
  const checkpointRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Simple staggered fade-in animation
    checkpointRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.style.opacity = '1';
          ref.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, [checkpoints]);

  const getDifficultyColor = (diff?: string) => {
    if (!diff) return "bg-gray-500";
    const lower = diff.toLowerCase();
    if (lower.includes('easy')) return "bg-green-500";
    if (lower.includes('moderate')) return "bg-yellow-500";
    if (lower.includes('challenging') || lower.includes('hard')) return "bg-red-500";
    return "bg-blue-500";
  };

  const router = useRouter();
  const handleItenary = () => {
    router.push('/itenerary');
  }

  return (
    <Card className="mb-4 h-full rounded-b-none min-h-screen relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
                <p className="text-muted-foreground mb-4">{description}</p>
                
                {/* Stats Section */}
                <div className="flex flex-wrap gap-3">
                  {duration && (
                    <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-semibold">{duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {difficulty && (
                    <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M22 7 13.5 15.5 8.5 10.5 2 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 7h6v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <p className="text-xs text-muted-foreground">Difficulty</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{difficulty}</p>
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(difficulty)}`} />
                        </div>
                      </div>
                    </div>
                  )}

                  {checkpoints.length > 0 && (
                    <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" strokeWidth="2"/>
                      </svg>
                      <div>
                        <p className="text-xs text-muted-foreground">Checkpoints</p>
                        <p className="text-sm font-semibold">{checkpoints.length} stops</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Checkpoints Trail */}
          {checkpoints.length > 0 && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" strokeWidth="2"/>
                </svg>
                Trail Checkpoints
              </h2>
              
              <div className="relative">
                {/* Vertical line */}
                 {checkpoints.map((checkpoint, index) => (
      <div
        key={index}
        ref={el => { checkpointRefs.current[index] = el; }}
        className="relative opacity-0 translate-y-4 transition-all duration-500 ease-out max-w-3/4 pb-4 "
        style={{ transitionDelay: `${index * 150}ms` }}
      >
 
        {/* Checkpoint content */}
        <div className="bg-secondary/40 rounded-xl p-4 hover:bg-secondary/60 transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{checkpoint.name}</h3>
            <Badge variant="outline" className="text-xs">
              {index === 0
                ? "Start"
                : index === checkpoints.length - 1
                ? "End"
                : `Stop ${index}`}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            {checkpoint.description}
          </p>

          
        </div>
      </div>
    ))}

              </div>
              <Button className='ml-120 mt-3' onClick={handleItenary}>
                Build an Itenerary
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};