
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/app/dashboard" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Allow: @gmail.com, .in, .org, .edu
    const emailPattern = /^[^\s@]+@(gmail\.com|[^\s@]+\.(in|org|edu))$/i;
  
    if (!emailPattern.test(email)) {
      toast.error('Email must end with @gmail.com, .in, .org, or .edu');
      return;
    }
  
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your account"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkUrl="/signup"
    >
      <form onSubmit={handleLogin} className="space-y-4">
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  );
}
