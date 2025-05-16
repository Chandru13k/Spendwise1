
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function ResetPasswordPage() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password reset successful!');
      navigate('/login');
    }, 1500);
  };

  return (
    <AuthLayout
      title="Set new password"
      description="Enter your new password below"
      footerText="Remember your password?"
      footerLinkText="Back to login"
      footerLinkUrl="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input 
            id="confirm-password" 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </AuthLayout>
  );
}
