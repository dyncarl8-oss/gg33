import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigation } from '@/components/Navigation';
import { StarField } from '@/components/StarField';
import { ProfileSetup, ProfileData } from '@/components/ProfileSetup';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ProfileOverview } from '@/components/ProfileOverview';
import { PersonalityInsights } from '@/components/PersonalityInsights';
import { DailyEnergy } from '@/components/DailyEnergy';
import { ExternalLink } from 'lucide-react';

interface MembershipInfo {
  hasMembership: boolean;
  membershipId: string | null;
  status: string | null;
  manageUrl: string | null;
}

const ODIS_ID_KEY = 'gg33-odis-id';

interface WhopUserData {
  profilePictureUrl: string | null;
  username: string;
  name: string | null;
}

export default function Home() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [pendingProfile, setPendingProfile] = useState<ProfileData | null>(null);
  
  const savedOdisId = localStorage.getItem(ODIS_ID_KEY);
  const [odisId, setOdisId] = useState<string | null>(savedOdisId);

  const { data: profileData, isLoading: isProfileLoading, isFetched: isProfileFetched } = useQuery({
    queryKey: ['/api/profile', odisId],
    queryFn: async () => {
      if (!odisId) return null;
      const response = await fetch(`/api/profile/${odisId}`);
      if (!response.ok) {
        if (response.status === 404) {
          localStorage.removeItem(ODIS_ID_KEY);
          return null;
        }
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      return data.user;
    },
    enabled: !!odisId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // Derive whopUser from profileData - the profile already has whop info stored
  const whopUser: WhopUserData | null = profileData ? {
    profilePictureUrl: profileData.whopProfilePictureUrl || null,
    username: profileData.whopUsername || '',
    name: profileData.fullName || null,
  } : null;

  const profile: ProfileData | null = profileData ? {
    odisId: profileData.odisId,
    fullName: profileData.fullName,
    birthDate: new Date(profileData.birthDate),
    birthTime: profileData.birthTime || '12:00',
    birthLocation: profileData.birthLocation || 'Unknown',
  } : null;

  const { data: membership } = useQuery<MembershipInfo>({
    queryKey: ['/api/membership'],
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Derive isPro from membership status - if they have an active membership, they're Pro
  // This automatically grants/revokes Pro access based on Whop membership
  const isPro = membership?.hasMembership ?? profileData?.isPro ?? false;

  useEffect(() => {
    if (isProfileFetched && !profileData && odisId) {
      localStorage.removeItem(ODIS_ID_KEY);
      setOdisId(null);
    }
  }, [isProfileFetched, profileData, odisId]);

  const handleProfileComplete = (profileData: ProfileData) => {
    localStorage.setItem(ODIS_ID_KEY, profileData.odisId);
    setPendingProfile(profileData);
    setIsCalculating(true);
  };

  const handleCalculationComplete = () => {
    if (pendingProfile) {
      setOdisId(pendingProfile.odisId);
      setPendingProfile(null);
    }
    setIsCalculating(false);
  };

  const isLoadingProfile = isProfileLoading && !profileData && odisId;
  
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-gray-11">Loading your profile...</div>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <>
        <StarField />
        <LoadingScreen onComplete={handleCalculationComplete} profile={pendingProfile || undefined} />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <StarField />
        <ProfileSetup onComplete={handleProfileComplete} />
      </>
    );
  }

  return (
    <>
      <StarField />
      <Navigation />
      
      <main className="pt-16 pb-12 px-4 min-h-screen" data-testid="dashboard">
        <div className="w-full max-w-6xl mx-auto space-y-6">
          <ProfileOverview profile={profile} whopUser={whopUser} isPro={isPro} />
          
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <PersonalityInsights profile={profile} />
            <DailyEnergy profile={profile} />
          </div>

          {membership?.manageUrl && (
            <div className="flex justify-center">
              <button
                onClick={() => window.open(membership.manageUrl!, '_blank')}
                className="text-2 text-gray-9 hover:text-gray-11 flex items-center gap-1.5 transition-colors"
                data-testid="link-manage-subscription"
              >
                Manage Subscription
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
