import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Sparkles, Users, Database, Compass, MessageCircle, GraduationCap, Hash, Clock, Zap, Lock, Loader2 } from 'lucide-react';
import proBgImage from '@assets/generated_images/clean_minimal_sacred_geometry_background.png';
import { iframeSdk } from '@/lib/whop-iframe';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const benefits = [
  { icon: Users, label: 'Compatibility Analysis', description: 'Discover relationship dynamics' },
  { icon: Database, label: 'Cues Database', description: '22,000+ cues library' },
  { icon: Compass, label: 'Explore Modules', description: 'All 6 numerology modules' },
  { icon: MessageCircle, label: 'CueChats AI', description: 'Personalized AI guidance' },
  { icon: GraduationCap, label: 'All Courses', description: 'Complete learning library' },
  { icon: Hash, label: 'Core & Name Numbers', description: 'Full meaning interpretations' },
];

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  // Get user data for notification
  const { data: userData } = useQuery<{ user: any; needsOnboarding: boolean }>({
    queryKey: ['/api/me'],
  });

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    try {
      // Send email notification about upgrade button click
      try {
        const user = userData?.user;
        await apiRequest('POST', '/api/notify-upgrade-click', {
          userId: user?.whopUserId,
          username: user?.whopUsername,
          profilePictureUrl: user?.whopProfilePictureUrl,
          odisId: user?.odisId,
          fullName: user?.fullName,
          email: user?.email,
        });
        console.log('[Upgrade] Notification email sent');
      } catch (notifyError) {
        console.error('[Upgrade] Failed to send notification:', notifyError);
        // Don't block the upgrade process if notification fails
      }
      
      // Debug: Check API configuration first
      console.log('[Upgrade] Checking Whop API configuration...');
      try {
        const debugRes = await apiRequest('GET', '/api/whop/debug');
        const debugData = await debugRes.json();
        console.log('[Upgrade] Whop Debug Info:', debugData);
      } catch (debugError) {
        console.error('[Upgrade] Debug check failed:', debugError);
      }

      console.log('[Upgrade] Creating checkout configuration...');
      const checkoutRes = await apiRequest('POST', '/api/checkout/create');
      const checkoutData = await checkoutRes.json();
      console.log('[Upgrade] Checkout response:', checkoutData);
      
      if (!checkoutData.id || !checkoutData.planId) {
        throw new Error(checkoutData.details || 'Failed to create checkout configuration');
      }

      console.log('[Upgrade] Opening in-app purchase modal with:', {
        planId: checkoutData.planId,
        id: checkoutData.id,
        iframeSdkAppId: import.meta.env.VITE_WHOP_APP_ID,
      });
      
      if (!iframeSdk) {
        throw new Error('Whop SDK not initialized');
      }

      const purchaseResult = await iframeSdk.inAppPurchase({
        planId: checkoutData.planId,
        id: checkoutData.id,
      });
      
      console.log('[Upgrade] Purchase result:', purchaseResult);

      if (purchaseResult.status === 'ok') {
        const receiptId = purchaseResult.data?.receiptId;
        console.log('[Upgrade] Payment successful, receipt:', receiptId);
        
        // Try to upgrade with retries (membership might take a moment to be created)
        let upgraded = false;
        let attempts = 0;
        const maxAttempts = 3;
        
        while (!upgraded && attempts < maxAttempts) {
          attempts++;
          console.log(`[Upgrade] Attempt ${attempts}/${maxAttempts} to verify membership...`);
          
          try {
            const upgradeRes = await apiRequest('POST', '/api/upgrade-to-pro', { receiptId });
            const upgradeData = await upgradeRes.json();
            console.log('[Upgrade] Upgrade response:', upgradeData);
            
            if (upgradeData.success) {
              upgraded = true;
            }
          } catch (upgradeError: any) {
            console.log(`[Upgrade] Attempt ${attempts} failed:`, upgradeError);
            
            // If we should retry, wait a bit before next attempt
            if (attempts < maxAttempts) {
              console.log('[Upgrade] Waiting 2 seconds before retry...');
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
        }
        
        if (upgraded) {
          // Invalidate all relevant caches to update UI immediately
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['/api/me'] }),
            queryClient.invalidateQueries({ queryKey: ['/api/profile'] }),
            queryClient.invalidateQueries({ queryKey: ['/api/membership'] }),
          ]);
          
          toast({
            title: 'Welcome to Pro!',
            description: 'You now have access to all premium features.',
          });
          
          onOpenChange(false);
        } else {
          throw new Error('Could not verify membership. Please refresh the page and try again.');
        }
      } else if (purchaseResult.status === 'error') {
        throw new Error('Payment was not completed');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      toast({
        title: 'Upgrade failed',
        description: 'There was an issue processing your upgrade. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-3xl lg:max-w-4xl mx-4 p-0 rounded-xl border-amber-9/30 overflow-hidden max-h-[90vh]" 
        data-testid="modal-upgrade"
      >
        <div className="relative grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto">
          <div 
            className="relative p-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-[400px]"
            style={{
              backgroundImage: `url(${proBgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            
            <div className="relative z-10 flex flex-col items-center">
              <Badge 
                variant="outline" 
                className="bg-amber-9/20 border-amber-9/50 text-amber-9 gap-2 px-4 py-1.5 mb-6 backdrop-blur-sm"
              >
                <Clock className="w-4 h-4" />
                <span className="text-2 font-medium">Limited Time</span>
              </Badge>
              
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-8 to-amber-9 flex items-center justify-center mb-6 shadow-2xl shadow-amber-9/40">
                <Crown className="w-14 h-14 text-white" />
              </div>
              
              <h2 className="text-7 font-bold text-white mb-2">GG33 Pro</h2>
              <p className="text-3 text-gray-11 mb-8">Unlock everything</p>
              
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-5 text-gray-9 line-through">$70</span>
                <Badge className="bg-green-9/20 text-green-9 border-green-9/40 text-2 font-semibold px-3 py-1">
                  50% OFF
                </Badge>
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-[1.5rem] font-bold text-white leading-none">$35</span>
                <span className="text-3 text-gray-10">/mo</span>
              </div>
              <p className="text-2 text-amber-9 font-medium flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Founders pricing - ends soon
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col bg-background">
            <p className="text-2 font-semibold text-gray-11 uppercase tracking-wider mb-4">Everything included</p>
            
            <div className="flex flex-col gap-2 flex-1">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.label}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-a2 border border-gray-a3"
                  data-testid={`benefit-${benefit.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-a3 to-amber-a2 flex items-center justify-center flex-shrink-0 border border-amber-9/20">
                    <benefit.icon className="w-4 h-4 text-amber-9" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2 font-semibold text-gray-12">{benefit.label}</p>
                    <p className="text-1 text-gray-10">{benefit.description}</p>
                  </div>
                  <Check className="w-4 h-4 text-green-9 flex-shrink-0" />
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-3">
              <Button 
                variant="gold" 
                className="w-full text-3 font-semibold shadow-lg shadow-amber-9/25" 
                size="lg"
                onClick={handleUpgrade}
                disabled={isProcessing}
                data-testid="button-upgrade-to-pro"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Upgrade to Pro Now
                  </>
                )}
              </Button>
              
              <p className="text-center text-1 text-gray-9 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" />
                Payment secured by Whop
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
