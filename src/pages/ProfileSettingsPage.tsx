
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function ProfileSettingsPage() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [currency, setCurrency] = useState('₹');
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        // Get user metadata from auth
        const { data: { user: userData } } = await supabase.auth.getUser();
        const metadata = userData?.user_metadata || {};
        
        // Set profile fields from metadata
        setFirstName(metadata.first_name || '');
        setLastName(metadata.last_name || '');
        setEmail(user.email || '');
        setPhone(metadata.phone || '');
        setMonthlySalary(metadata.monthly_salary?.toString() || '');
        setCurrency(metadata.currency || '₹');
        setLanguage(metadata.language || 'English');
        
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchUserProfile();
  }, [user]);

  const handleProfileSave = async () => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Parse the monthly salary to a number (or null if empty)
      const salaryValue = monthlySalary ? parseFloat(monthlySalary) : null;
      
      // Update auth user metadata
      await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          monthly_salary: salaryValue,
          currency: currency,
          language: language
        }
      });
      
      // Ensure the user record exists in the profiles table with basic info
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: email,
          display_name: `${firstName} ${lastName}`.trim()
        });
      
      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const currentPassword = formData.get('current-password') as string;
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      (event.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(`Failed to update password: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Update preferences in auth user metadata
      await supabase.auth.updateUser({
        data: {
          currency: currency,
          language: language
        }
      });
      
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Failed to update preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-custom-dark">Profile Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-custom-light">
          <TabsTrigger value="profile" className="data-[state=active]:bg-custom-medium data-[state=active]:text-white">Profile</TabsTrigger>
          <TabsTrigger value="password" className="data-[state=active]:bg-custom-medium data-[state=active]:text-white">Password</TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-custom-medium data-[state=active]:text-white">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6 mt-6">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24 bg-custom-medium">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback style={{backgroundColor: "#9575CD"}}>{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" style={{borderColor: "#9575CD", color: "#4527A0"}}>Change Avatar</Button>
            </div>
            
            <div className="w-full space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-custom-dark">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-custom-dark">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-custom-dark">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="bg-white opacity-70"
                />
                <p className="text-sm text-muted-foreground">Email cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-custom-dark">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-custom-dark">Monthly Salary</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <Input 
                    id="salary" 
                    type="number" 
                    className="pl-7 bg-white"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(e.target.value)}
                    placeholder="Enter your monthly salary"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  This helps track your expense ratio and provide better financial insights
                </p>
              </div>
              
              <Button 
                onClick={handleProfileSave} 
                disabled={isLoading}
                style={{backgroundColor: "#4527A0"}}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4 mt-6">
          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-custom-dark">Current Password</Label>
              <Input id="current-password" name="current-password" type="password" className="bg-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-custom-dark">New Password</Label>
              <Input id="new-password" name="new-password" type="password" className="bg-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-custom-dark">Confirm New Password</Label>
              <Input id="confirm-password" name="confirm-password" type="password" className="bg-white" />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              style={{backgroundColor: "#4527A0"}}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="currency" className="text-custom-dark">Currency</Label>
            <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-white" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language" className="text-custom-dark">Language</Label>
            <Input id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-white" />
          </div>
          
          <Button 
            onClick={handlePreferencesSave} 
            disabled={isLoading}
            style={{backgroundColor: "#4527A0"}}
          >
            {isLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
