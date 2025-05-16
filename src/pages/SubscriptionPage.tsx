
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function SubscriptionPage() {
  const handleUpgrade = (plan: string) => {
    toast.info(`Opening payment modal for the ${plan} plan`);
  };
  
  const handleApplyPromo = () => {
    toast.success('Promo code applied successfully!');
  };
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Subscription</h1>
      <p className="text-muted-foreground">Upgrade your plan to unlock premium features</p>
      
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Basic expense tracking</CardDescription>
              <div className="mt-2 mb-1 font-bold text-3xl">$0</div>
            </CardHeader>
            <CardContent className="space-y-2">
              <FeatureItem available>Track up to 50 transactions</FeatureItem>
              <FeatureItem available>Basic expense reports</FeatureItem>
              <FeatureItem available>2 budget categories</FeatureItem>
              <FeatureItem>Advanced analytics</FeatureItem>
              <FeatureItem>Data export</FeatureItem>
              <FeatureItem>Priority support</FeatureItem>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Current Plan
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-primary">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>For serious budgeters</CardDescription>
                  <div className="mt-2 mb-1 font-bold text-3xl">$9.99</div>
                  <CardDescription>per month</CardDescription>
                </div>
                <Badge>Popular</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <FeatureItem available>Unlimited transactions</FeatureItem>
              <FeatureItem available>Comprehensive reports</FeatureItem>
              <FeatureItem available>Unlimited budget categories</FeatureItem>
              <FeatureItem available>Advanced analytics</FeatureItem>
              <FeatureItem available>Data export</FeatureItem>
              <FeatureItem>Priority support</FeatureItem>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleUpgrade('Premium')}>
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For financial experts</CardDescription>
              <div className="mt-2 mb-1 font-bold text-3xl">$19.99</div>
              <CardDescription>per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <FeatureItem available>Everything in Premium</FeatureItem>
              <FeatureItem available>API access</FeatureItem>
              <FeatureItem available>White-label reports</FeatureItem>
              <FeatureItem available>Custom categories</FeatureItem>
              <FeatureItem available>Data export in all formats</FeatureItem>
              <FeatureItem available>Priority support</FeatureItem>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleUpgrade('Enterprise')}>
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Have a Promo Code?</CardTitle>
              <CardDescription>Enter your promo code to get a discount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Enter promo code" />
                <Button onClick={handleApplyPromo}>Apply</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium mb-2">Need help choosing a plan?</h3>
          <p className="text-muted-foreground mb-4">Contact our support team for guidance on the best plan for your needs.</p>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  available?: boolean;
  children: React.ReactNode;
}

function FeatureItem({ available, children }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-2">
      {available ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={!available ? 'text-muted-foreground' : ''}>
        {children}
      </span>
    </div>
  );
}
