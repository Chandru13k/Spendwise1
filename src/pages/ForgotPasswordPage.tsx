
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset email sending
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Reset link sent! Check your email.');
    }, 1500);
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email and we'll send you a reset link"
      footerText="Remember your password?"
      footerLinkText="Back to login"
      footerLinkUrl="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send reset link'}
        </Button>
        
        <Link to="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </form>
    </AuthLayout>
  );
}
