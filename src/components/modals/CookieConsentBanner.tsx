
import React from 'react';
import { Button } from '@/components/ui/button';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = React.useState(true);
  
  // Check if user has already consented
  React.useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (hasConsented === 'true') {
      setIsVisible(false);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };
  
  const handleDecline = () => {
    // Still hide the banner but don't set tracking cookies
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50 shadow-lg">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          <p>
            We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
