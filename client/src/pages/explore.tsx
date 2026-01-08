import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigation } from '@/components/Navigation';
import { StarField } from '@/components/StarField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { UpgradeModal } from '@/components/UpgradeModal';
import { Compass, TrendingUp, Calendar, Star, Globe, Heart, Loader2, MapPin, Briefcase, Users, Check, AlertCircle, X, Lock, Crown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'wouter';
import { calculateComprehensiveProfile } from '@/lib/numerology';

const ODIS_ID_KEY = 'gg33-odis-id';

type FeatureType = 'trending' | 'best-days' | 'celebrity' | 'travel' | 'relationship' | 'career' | null;

interface ProfileData {
  odisId: string;
  fullName: string;
  birthDate: string;
  birthTime?: string;
  birthLocation?: string;
}

const explorations = [
  {
    id: 'trending' as FeatureType,
    title: 'Trending Energies',
    description: 'See what energy patterns are most active today',
    icon: TrendingUp,
    tag: 'Popular',
    requiresProfile: false,
  },
  {
    id: 'best-days' as FeatureType,
    title: 'Best Days This Month',
    description: 'Find your optimal days for key activities',
    icon: Calendar,
    tag: 'Planning',
    requiresProfile: true,
  },
  {
    id: 'celebrity' as FeatureType,
    title: 'Celebrity Matches',
    description: 'Discover which celebrities share your energy',
    icon: Star,
    tag: 'Fun',
    requiresProfile: true,
  },
  {
    id: 'travel' as FeatureType,
    title: 'Travel Destinations',
    description: 'Cities that align with your energy signature',
    icon: Globe,
    tag: 'Travel',
    requiresProfile: true,
  },
  {
    id: 'relationship' as FeatureType,
    title: 'Relationship Patterns',
    description: 'Understanding your compatibility tendencies',
    icon: Heart,
    tag: 'Insights',
    requiresProfile: true,
  },
  {
    id: 'career' as FeatureType,
    title: 'Career Alignment',
    description: 'Industries and roles that match your energy',
    icon: Compass,
    tag: 'Career',
    requiresProfile: true,
  },
];

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" data-testid="loading-skeleton">
      <div className="h-6 bg-gray-a3 rounded w-3/4" />
      <div className="h-4 bg-gray-a3 rounded w-1/2" />
      <div className="space-y-2 mt-4">
        <div className="h-20 bg-gray-a3 rounded" />
        <div className="h-20 bg-gray-a3 rounded" />
        <div className="h-20 bg-gray-a3 rounded" />
      </div>
    </div>
  );
}

function TrendingEnergiesDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data, isLoading, error } = useQuery<{
    universalDay: number;
    todayTitle: string;
    todayTheme: string;
    date: string;
    topLifePaths: Array<{ number: number; count: number; title: string; theme: string }>;
    topElements: Array<{ element: string; count: number }>;
    representativeCues: Array<{ id: number; name: string; type: string; energySignature: string }>;
  }>({
    queryKey: ['/api/explore/trending-energies'],
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh]" data-testid="dialog-trending-energies">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-9" />
            Trending Energies
          </DialogTitle>
          <DialogDescription>What energy patterns are most active today</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-9 flex items-center gap-2" data-testid="error-trending">
              <AlertCircle className="w-4 h-4" />
              Failed to load trending energies
            </div>
          ) : data ? (
            <div className="space-y-6" data-testid="content-trending">
              <div className="text-center p-4 bg-amber-a2 rounded-lg border border-amber-a4">
                <div className="text-sm text-gray-11 mb-1">Universal Day Number</div>
                <div className="text-4xl font-bold text-amber-9" data-testid="text-universal-day">{data.universalDay}</div>
                <div className="text-lg font-medium mt-1" data-testid="text-day-title">{data.todayTitle}</div>
                <div className="text-sm text-gray-11" data-testid="text-day-theme">{data.todayTheme}</div>
                <div className="text-xs text-gray-10 mt-2">{data.date}</div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-9" />
                  Top Life Paths in Database
                </h3>
                <div className="grid gap-2">
                  {data.topLifePaths?.map((lp: { number: number; count: number; title: string; theme: string }, i: number) => (
                    <div key={lp.number} className="flex items-center justify-between p-3 bg-gray-a2 rounded-lg" data-testid={`card-lifepath-${lp.number}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-a3 flex items-center justify-center font-bold text-amber-9">
                          {lp.number}
                        </div>
                        <div>
                          <div className="font-medium">{lp.title}</div>
                          <div className="text-xs text-gray-11">{lp.theme}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" size="sm">{lp.count.toLocaleString()} entities</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-9" />
                  Top Elements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.topElements?.map((el: { element: string; count: number }) => (
                    <Badge key={el.element} variant="outline" data-testid={`badge-element-${el.element}`}>
                      {el.element}: {el.count.toLocaleString()}
                    </Badge>
                  ))}
                </div>
              </div>

              {data.representativeCues?.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-9" />
                    Today's Energy Representatives
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {data.representativeCues?.map((cue: { id: number; name: string; type: string; energySignature: string }) => (
                      <div key={cue.id} className="p-2 bg-gray-a2 rounded-lg" data-testid={`card-cue-${cue.id}`}>
                        <div className="font-medium text-sm truncate">{cue.name}</div>
                        <div className="text-xs text-gray-11">{cue.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function BestDaysDialog({ open, onClose, birthDate }: { open: boolean; onClose: () => void; birthDate: string | null }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/explore/best-days', birthDate],
    queryFn: async () => {
      if (!birthDate) return null;
      const response = await fetch(`/api/explore/best-days/${birthDate}`);
      if (!response.ok) throw new Error('Failed to fetch best days');
      return response.json();
    },
    enabled: open && !!birthDate,
  });

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-a3 border-green-a6 text-green-11';
      case 'good': return 'bg-amber-a3 border-amber-a6 text-amber-11';
      case 'challenging': return 'bg-red-a3 border-red-a6 text-red-11';
      default: return 'bg-gray-a3 border-gray-a6 text-gray-11';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh]" data-testid="dialog-best-days">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-9" />
            Best Days This Month
          </DialogTitle>
          <DialogDescription>Your personalized calendar based on numerology</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-9 flex items-center gap-2" data-testid="error-best-days">
              <AlertCircle className="w-4 h-4" />
              Failed to load calendar
            </div>
          ) : data ? (
            <div className="space-y-6" data-testid="content-best-days">
              <div className="flex items-center justify-between p-4 bg-amber-a2 rounded-lg border border-amber-a4">
                <div>
                  <div className="text-xl font-bold" data-testid="text-month-name">{data.monthName} {data.year}</div>
                  <div className="text-sm text-gray-11">Life Path {data.lifePathNumber} | Personal Year {data.personalYear}</div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-a3 text-green-11">Excellent</Badge>
                  <Badge variant="outline" className="bg-amber-a3 text-amber-11">Good</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Your Best Days</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {data.bestDays?.map((day: { date: string; day: number; personalDay: number; rating: string; theme: string; activities: string[] }) => (
                    <div key={day.date} className={`p-3 rounded-lg border ${getRatingColor(day.rating)}`} data-testid={`card-day-${day.day}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-lg">{day.day}</span>
                        <Badge variant="secondary" size="sm">{day.personalDay}</Badge>
                      </div>
                      <div className="text-sm font-medium">{day.theme}</div>
                      <div className="text-xs mt-1 opacity-80">{day.activities[0]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  Full Month Overview
                  <Badge variant="outline" size="sm" className="ring-2 ring-amber-9 text-xs" data-testid="badge-today-legend">Today</Badge>
                </h3>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-xs text-gray-11 font-medium py-1">{d}</div>
                  ))}
                  {(() => {
                    const now = new Date();
                    const isCurrentMonth = data.month === now.getMonth() + 1 && data.year === now.getFullYear();
                    const todayDate = now.getDate();
                    const firstDayOfMonth = new Date(data.year, data.month - 1, 1).getDay();
                    
                    const emptyCells = Array(firstDayOfMonth).fill(null).map((_, j) => (
                      <div key={`empty-${j}`} className="p-2" />
                    ));
                    
                    const dayCells = data.days?.map((day: { day: number; rating: string; personalDay: number; theme: string }) => {
                      const isToday = isCurrentMonth && day.day === todayDate;
                      return (
                        <div 
                          key={day.day} 
                          className={`p-2 rounded text-sm ${
                            day.rating === 'excellent' ? 'bg-green-a3 text-green-11 font-bold' :
                            day.rating === 'good' ? 'bg-amber-a3 text-amber-11' :
                            'bg-gray-a2 text-gray-11'
                          } ${isToday ? 'ring-2 ring-amber-9' : ''}`}
                          title={`${day.theme} (Personal Day ${day.personalDay})${isToday ? ' - Today' : ''}`}
                          data-testid={`calendar-day-${day.day}`}
                        >
                          {day.day}
                        </div>
                      );
                    }) || [];
                    
                    return [...emptyCells, ...dayCells];
                  })()}
                </div>
              </div>
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function CelebrityMatchesDialog({ open, onClose, lifePathNumber, energySignature }: { 
  open: boolean; 
  onClose: () => void; 
  lifePathNumber: number | null;
  energySignature: string | null;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/explore/celebrity-matches', lifePathNumber, energySignature],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (lifePathNumber) params.append('lifePathNumber', lifePathNumber.toString());
      if (energySignature) params.append('energySignature', energySignature);
      params.append('limit', '12');
      const response = await fetch(`/api/explore/celebrity-matches?${params}`);
      if (!response.ok) throw new Error('Failed to fetch celebrity matches');
      return response.json();
    },
    enabled: open && (!!lifePathNumber || !!energySignature),
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh]" data-testid="dialog-celebrity-matches">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-9" />
            Celebrity Matches
          </DialogTitle>
          <DialogDescription>Famous people who share your energy signature</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-9 flex items-center gap-2" data-testid="error-celebrity">
              <AlertCircle className="w-4 h-4" />
              Failed to load celebrity matches
            </div>
          ) : data ? (
            <div className="space-y-4" data-testid="content-celebrity">
              <div className="text-sm text-gray-11">
                Found matches from {data.totalCelebrities?.toLocaleString()} celebrities in database
              </div>
              
              <div className="grid gap-3">
                {data.matches?.map((celeb: { 
                  id: number; 
                  name: string; 
                  category: string;
                  country: string;
                  lifePathNumber: number; 
                  energySignature: string;
                  foundedOrBirth: string;
                  score: number;
                  matchReasons: string[];
                }) => (
                  <div key={celeb.id} className="flex items-start gap-4 p-4 bg-gray-a2 rounded-lg" data-testid={`card-celebrity-${celeb.id}`}>
                    <div className="w-12 h-12 rounded-full bg-amber-a3 flex items-center justify-center text-amber-9 font-bold text-lg shrink-0">
                      {celeb.lifePathNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <div className="font-medium" data-testid={`text-celebrity-name-${celeb.id}`}>{celeb.name}</div>
                          <div className="text-sm text-gray-11">{celeb.category}{celeb.country ? ` | ${celeb.country}` : ''}</div>
                        </div>
                        <Badge variant="secondary" size="sm">{celeb.score}% match</Badge>
                      </div>
                      <div className="text-xs text-gray-11 mt-1">{celeb.energySignature}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {celeb.matchReasons.map((reason: string, i: number) => (
                          <Badge key={i} variant="outline" size="sm" className="text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {(!data.matches || data.matches.length === 0) && (
                <div className="text-center py-8 text-gray-11">
                  No celebrity matches found with your energy signature
                </div>
              )}
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function TravelDestinationsDialog({ open, onClose, lifePathNumber, element, birthYear }: { 
  open: boolean; 
  onClose: () => void; 
  lifePathNumber: number | null;
  element: string | null;
  birthYear: number | null;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/explore/travel-destinations', lifePathNumber, element, birthYear],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (lifePathNumber) params.append('lifePathNumber', lifePathNumber.toString());
      if (element) params.append('element', element);
      if (birthYear) params.append('birthYear', birthYear.toString());
      params.append('limit', '12');
      const response = await fetch(`/api/explore/travel-destinations?${params}`);
      if (!response.ok) throw new Error('Failed to fetch travel destinations');
      return response.json();
    },
    enabled: open && (!!lifePathNumber || !!element),
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh]" data-testid="dialog-travel-destinations">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-9" />
            Travel Destinations
          </DialogTitle>
          <DialogDescription>Countries that align with your zodiac energy</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-9 flex items-center gap-2" data-testid="error-travel">
              <AlertCircle className="w-4 h-4" />
              Failed to load destinations
            </div>
          ) : data ? (
            <div className="space-y-4" data-testid="content-travel">
              {data.userZodiac && (
                <div className="text-sm text-gray-11 flex items-center gap-2">
                  <span>Your zodiac:</span>
                  <Badge variant="secondary" size="sm">{data.userZodiac}</Badge>
                </div>
              )}
              
              <div className="grid gap-4">
                {data.destinations?.map((dest: { 
                  id: number; 
                  name: string; 
                  foundingYear: number;
                  zodiacAnimal: string;
                  compatibleSigns: string[];
                  description: string;
                  vibe: string;
                  bestFor: string;
                  score: number;
                  isUserMatch: boolean;
                }) => (
                  <div 
                    key={dest.id} 
                    className={`p-4 rounded-lg ${dest.isUserMatch ? 'bg-amber-a2 border border-amber-a4' : 'bg-gray-a2'}`}
                    data-testid={`card-destination-${dest.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-9 shrink-0" />
                        <div>
                          <div className="font-medium" data-testid={`text-destination-name-${dest.id}`}>
                            {dest.name}
                            {dest.isUserMatch && (
                              <Check className="w-4 h-4 text-green-9 inline ml-2" />
                            )}
                          </div>
                          <div className="text-xs text-gray-11">
                            Est. {dest.foundingYear} - Year of the {dest.zodiacAnimal}
                          </div>
                        </div>
                      </div>
                      <Badge variant={dest.isUserMatch ? 'default' : 'secondary'} size="sm">
                        {dest.score}% match
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-11 mt-3" data-testid={`text-destination-description-${dest.id}`}>
                      {dest.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" size="sm" className="text-xs">
                        {dest.vibe}
                      </Badge>
                      <Badge variant="outline" size="sm" className="text-xs">
                        {dest.bestFor}
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-xs text-gray-10 mb-1">Compatible signs:</div>
                      <div className="flex flex-wrap gap-1">
                        {dest.compatibleSigns.map((sign: string) => (
                          <Badge 
                            key={sign} 
                            variant={data.userZodiac === sign ? 'default' : 'outline'}
                            size="sm" 
                            className={`text-xs ${data.userZodiac === sign ? 'bg-green-a3 text-green-11 border-green-a6' : ''}`}
                          >
                            {sign}
                            {data.userZodiac === sign && <Check className="w-3 h-3 ml-1" />}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {(!data.destinations || data.destinations.length === 0) && (
                <div className="text-center py-8 text-gray-11">
                  No matching destinations found
                </div>
              )}
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function RelationshipPatternsDialog({ open, onClose, lifePathNumber }: { 
  open: boolean; 
  onClose: () => void; 
  lifePathNumber: number | null;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/explore/relationship-patterns', lifePathNumber],
    queryFn: async () => {
      if (!lifePathNumber) return null;
      const response = await fetch(`/api/explore/relationship-patterns/${lifePathNumber}`);
      if (!response.ok) throw new Error('Failed to fetch relationship patterns');
      return response.json();
    },
    enabled: open && !!lifePathNumber,
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh]" data-testid="dialog-relationship-patterns">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-9" />
            Relationship Patterns
          </DialogTitle>
          <DialogDescription>Understanding your compatibility tendencies</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-9 flex items-center gap-2" data-testid="error-relationship">
              <AlertCircle className="w-4 h-4" />
              Failed to load relationship patterns
            </div>
          ) : data ? (
            <div className="space-y-6" data-testid="content-relationship">
              <div className="p-4 bg-amber-a2 rounded-lg border border-amber-a4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-amber-a3 flex items-center justify-center text-amber-9 font-bold text-xl">
                    {data.lifePathNumber}
                  </div>
                  <div>
                    <div className="font-bold" data-testid="text-relationship-title">{data.title}</div>
                    <div className="text-sm text-gray-11">Life Path {data.lifePathNumber}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-11" data-testid="text-relationship-description">{data.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-a2 rounded-lg border border-green-a4">
                  <div className="font-medium text-green-11 mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Best Matches
                  </div>
                  <div className="space-y-2">
                    {data.bestMatches?.map((match: { number: number; title: string }) => (
                      <div key={match.number} className="flex items-center gap-2" data-testid={`card-best-match-${match.number}`}>
                        <div className="w-6 h-6 rounded-full bg-green-a3 flex items-center justify-center text-green-11 text-sm font-bold">
                          {match.number}
                        </div>
                        <span className="text-sm">{match.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-a2 rounded-lg border border-amber-a4">
                  <div className="font-medium text-amber-11 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Good Matches
                  </div>
                  <div className="space-y-2">
                    {data.goodMatches?.map((match: { number: number; title: string }) => (
                      <div key={match.number} className="flex items-center gap-2" data-testid={`card-good-match-${match.number}`}>
                        <div className="w-6 h-6 rounded-full bg-amber-a3 flex items-center justify-center text-amber-11 text-sm font-bold">
                          {match.number}
                        </div>
                        <span className="text-sm">{match.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-a2 rounded-lg border border-gray-a4">
                  <div className="font-medium text-gray-11 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Challenging
                  </div>
                  <div className="space-y-2">
                    {data.challengingMatches?.map((match: { number: number; title: string }) => (
                      <div key={match.number} className="flex items-center gap-2" data-testid={`card-challenging-match-${match.number}`}>
                        <div className="w-6 h-6 rounded-full bg-gray-a3 flex items-center justify-center text-gray-11 text-sm font-bold">
                          {match.number}
                        </div>
                        <span className="text-sm">{match.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-a2 rounded-lg">
                <h4 className="font-medium mb-2">Relationship Tips</h4>
                <ul className="space-y-1 text-sm text-gray-11">
                  {data.tips?.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-9 mt-0.5">*</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function CareerAlignmentDialog({ open, onClose, lifePathNumber }: { 
  open: boolean; 
  onClose: () => void; 
  lifePathNumber: number | null;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/explore/career-alignment', lifePathNumber],
    queryFn: async () => {
      if (!lifePathNumber) return null;
      const response = await fetch(`/api/explore/career-alignment/${lifePathNumber}`);
      if (!response.ok) throw new Error('Failed to fetch career alignment');
      return response.json();
    },
    enabled: open && !!lifePathNumber,
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh]" data-testid="dialog-career-alignment">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-9" />
            Career Alignment
          </DialogTitle>
          <DialogDescription>Industries and roles that match your energy</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-9 flex items-center gap-2" data-testid="error-career">
              <AlertCircle className="w-4 h-4" />
              Failed to load career alignment
            </div>
          ) : data ? (
            <div className="space-y-6" data-testid="content-career">
              <div className="p-4 bg-amber-a2 rounded-lg border border-amber-a4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-amber-a3 flex items-center justify-center text-amber-9 font-bold text-xl">
                    {data.lifePathNumber}
                  </div>
                  <div>
                    <div className="font-bold" data-testid="text-career-title">{data.title}</div>
                    <div className="text-sm text-gray-11">Life Path {data.lifePathNumber}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-11" data-testid="text-career-description">{data.description}</p>
              </div>

              {data.whyTheseFit && (
                <div className="p-4 bg-green-a2 rounded-lg border border-green-a4">
                  <p className="text-sm" data-testid="text-why-these-fit">{data.whyTheseFit}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-a2 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-9" />
                    Ideal Industries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.industries?.map((industry: string, i: number) => (
                      <Badge key={i} variant="outline" data-testid={`badge-industry-${i}`}>{industry}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-a2 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-9" />
                    Core Strengths
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {data.coreStrengths?.map((strength: string, i: number) => (
                      <div key={i} className="p-2 bg-amber-a2 rounded text-center text-sm font-medium" data-testid={`card-strength-${i}`}>
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-a2 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-9" />
                  Suggested Roles
                </h4>
                <div className="space-y-3">
                  {data.suggestedRoles?.map((role: { name: string; reason: string }, i: number) => (
                    <div key={i} className="p-3 bg-background rounded-lg" data-testid={`card-role-${i}`}>
                      <div className="font-medium text-amber-11">{role.name}</div>
                      <div className="text-sm text-gray-11 mt-1">{role.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function ProfileRequiredPrompt({ onClose }: { onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md" data-testid="dialog-profile-required">
        <DialogHeader>
          <DialogTitle>Profile Required</DialogTitle>
          <DialogDescription>
            This feature requires your birth date to provide personalized insights.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          <p className="text-sm text-gray-11">
            Create your profile to unlock personalized numerology features including best days, 
            celebrity matches, travel destinations, relationship patterns, and career alignment.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose} data-testid="button-close-profile-prompt">
              Cancel
            </Button>
            <Link href="/">
              <Button data-testid="button-create-profile">Create Profile</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Explore() {
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const savedOdisId = typeof window !== 'undefined' ? localStorage.getItem(ODIS_ID_KEY) : null;
  
  const { data: profileData, isLoading: isProfileLoading } = useQuery<ProfileData & { isPro?: boolean } | null>({
    queryKey: ['/api/profile', savedOdisId],
    queryFn: async () => {
      if (!savedOdisId) return null;
      const response = await fetch(`/api/profile/${savedOdisId}`);
      if (!response.ok) return null;
      const data = await response.json();
      return { ...data.user, isPro: data.isPro } as ProfileData & { isPro?: boolean };
    },
    enabled: !!savedOdisId,
    staleTime: 1000 * 60 * 5,
  });

  const hasProfile = !!profileData;
  const isPro = profileData?.isPro ?? false;
  const profileLoaded = !savedOdisId || !isProfileLoading;
  const birthDate = profileData?.birthDate || null;
  
  const calculatedProfile = useMemo(() => {
    if (!profileData?.birthDate || !profileData?.fullName) return null;
    try {
      return calculateComprehensiveProfile(
        profileData.fullName,
        new Date(profileData.birthDate),
        profileData.birthTime || '12:00',
        profileData.birthLocation || 'Unknown'
      );
    } catch {
      return null;
    }
  }, [profileData]);
  
  const lifePathNumber = calculatedProfile?.lifePathNumber || null;
  const energySignature = calculatedProfile?.energySignature || null;
  const element = energySignature ? energySignature.split(' ')[0] : null;

  const handleCardClick = (featureId: FeatureType) => {
    if (!isPro) {
      setShowUpgradeModal(true);
      return;
    }
    
    const feature = explorations.find(e => e.id === featureId);
    
    if (feature?.requiresProfile && !hasProfile) {
      setShowProfilePrompt(true);
      return;
    }
    
    setActiveFeature(featureId);
  };

  const handleCloseDialog = () => {
    setActiveFeature(null);
  };

  return (
    <>
      <StarField />
      <Navigation />
      
      <main className="pt-20 pb-12 px-4 min-h-screen" data-testid="page-explore">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Compass className="w-3 h-3 mr-1" />
              Discovery
            </Badge>
            <h1 className="text-6 md:text-7 font-semibold mb-4">
              <span className="gradient-text">Explore</span> Your Energy
            </h1>
            <p className="text-gray-11 text-3 max-w-2xl mx-auto">
              Discover insights about your energy patterns and how they connect to the world around you.
            </p>
          </div>

          {profileLoaded && !hasProfile && (
            <Card variant="frosted" className="border-amber-a4">
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-9" />
                    <div>
                      <div className="font-medium">Create your profile for personalized features</div>
                      <div className="text-sm text-gray-11">Unlock all 6 explore features with your birth date</div>
                    </div>
                  </div>
                  <Link href="/">
                    <Button data-testid="button-create-profile-banner">Create Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {explorations.map((item) => (
              <Card 
                key={item.id} 
                variant="frosted" 
                className={`hover:border-amber-6/30 transition-all cursor-pointer group relative ${
                  profileLoaded && item.requiresProfile && !hasProfile ? 'opacity-60' : ''
                }`}
                onClick={() => handleCardClick(item.id)}
                data-testid={`card-explore-${item.id}`}
              >
                {!isPro && (
                  <div className="absolute inset-0 bg-gray-1/60 backdrop-blur-[1px] rounded-lg z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-a3 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-11" />
                      </div>
                      <Badge variant="secondary" size="sm">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-12 h-12 rounded-lg bg-amber-a3 flex items-center justify-center group-hover:bg-amber-a4 transition-colors">
                      <item.icon className="w-6 h-6 text-amber-9" />
                    </div>
                    <div className="flex items-center gap-2">
                      {profileLoaded && item.requiresProfile && !hasProfile && (
                        <Badge variant="outline" size="sm" className="text-xs">
                          Profile needed
                        </Badge>
                      )}
                      <Badge variant="secondary" size="sm">
                        {item.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-4 mt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2 text-gray-11">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <TrendingEnergiesDialog 
        open={activeFeature === 'trending'} 
        onClose={handleCloseDialog} 
      />
      
      <BestDaysDialog 
        open={activeFeature === 'best-days'} 
        onClose={handleCloseDialog}
        birthDate={birthDate}
      />
      
      <CelebrityMatchesDialog 
        open={activeFeature === 'celebrity'} 
        onClose={handleCloseDialog}
        lifePathNumber={lifePathNumber}
        energySignature={energySignature}
      />
      
      <TravelDestinationsDialog 
        open={activeFeature === 'travel'} 
        onClose={handleCloseDialog}
        lifePathNumber={lifePathNumber}
        element={element}
        birthYear={birthDate ? new Date(birthDate).getFullYear() : null}
      />
      
      <RelationshipPatternsDialog 
        open={activeFeature === 'relationship'} 
        onClose={handleCloseDialog}
        lifePathNumber={lifePathNumber}
      />
      
      <CareerAlignmentDialog 
        open={activeFeature === 'career'} 
        onClose={handleCloseDialog}
        lifePathNumber={lifePathNumber}
      />

      {showProfilePrompt && (
        <ProfileRequiredPrompt onClose={() => setShowProfilePrompt(false)} />
      )}

      <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
    </>
  );
}
