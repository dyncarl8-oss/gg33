import { 
  calculateComprehensiveProfile, 
  getNumberMeaning 
} from '@/lib/numerology';
import { ProfileData } from '@/components/ProfileSetup';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface ProfileHeaderProps {
  profile: ProfileData;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const fullProfile = calculateComprehensiveProfile(
    profile.fullName,
    profile.birthDate,
    profile.birthTime,
    profile.birthLocation
  );

  const lifePathMeaning = getNumberMeaning(fullProfile.lifePathNumber);
  const firstName = profile.fullName.split(' ')[0];

  return (
    <Card variant="frosted" className="overflow-hidden relative" data-testid="card-profile-header">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-a2 via-transparent to-violet-a2 pointer-events-none" />
      
      <CardContent className="relative py-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 text-center md:text-left">
            <p className="text-1 text-gray-11">Welcome back,</p>
            <h2 className="text-6 font-semibold text-gray-12" data-testid="text-user-name">{firstName}</h2>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start flex-wrap">
              <Badge variant="outline" data-testid="badge-life-path">
                Life Path {fullProfile.lifePathNumber}
              </Badge>
              <span className="text-1 text-gray-10">
                {profile.birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          
          <div className="flex-1 text-center py-4 px-6 rounded-lg bg-gray-a3 border border-gray-5/50">
            <p className="text-0 text-gray-10 uppercase tracking-wider mb-1">Your Energy Signature</p>
            <h3 className="text-5 font-semibold gradient-text" data-testid="text-energy-signature">
              {fullProfile.energySignature}
            </h3>
            <p className="text-2 text-gray-11 mt-1 italic flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-9" />
              "{lifePathMeaning.title}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
