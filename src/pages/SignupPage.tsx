
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { useAuth } from '@/hooks/useAuth';

export function SignupPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { signUp, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/app/dashboard" />;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password length
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    // Allow: @gmail.com, .in, .org, .edu
    const emailPattern = /^[^\s@]+@(gmail\.com|[^\s@]+\.(in|org|edu))$/i;
  
    if (!emailPattern.test(email)) {
      toast.error('Email must end with @gmail.com, .in, .org, or .edu');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information below to create your account"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkUrl="/login"
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters long
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" disabled>Google</Button>
          <Button variant="outline" disabled>Apple</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
