
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ContactSupportForm } from '@/components/help-support/ContactSupportForm';
import { FAQContent } from '@/components/help-support/FAQContent';
import { SupportHistory } from '@/components/help-support/SupportHistory';

export function HelpSupportPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [supportHistory, setSupportHistory] = useState<any[]>([]);
  const [fetchingHistory, setFetchingHistory] = useState(true);

  useEffect(() => {
    if (user) {
      const loadUserInfo = async () => {
        // Get user details from auth
        const { data } = await supabase.auth.getUser();
        const metadata = data.user?.user_metadata || {};
        
        // Set name from metadata or use display_name as fallback
        const firstName = metadata.first_name || '';
        const lastName = metadata.last_name || '';
        const displayName = firstName && lastName 
          ? `${firstName} ${lastName}` 
          : metadata.display_name || user.email?.split('@')[0] || '';
        
        setName(displayName);
        setEmail(user.email || '');
        
        await fetchSupportHistory();
      };
      
      loadUserInfo();
    } else {
      setFetchingHistory(false);
    }
  }, [user]);

  const fetchSupportHistory = async () => {
    if (!user) return;
    
    try {
      const { data: history, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', 'support')
        .order('date', { ascending: false });
        
      if (error) throw error;
      setSupportHistory(history || []);
    } catch (error) {
      console.error('Error fetching support history:', error);
    } finally {
      setFetchingHistory(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Help & Support</h1>
      
      <Tabs defaultValue="contact" className="space-y-5">
        <TabsList>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="history">Support History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact" className="space-y-6">
          <ContactSupportForm 
            user={user}
            name={name}
            email={email}
            onSupportRequestSubmitted={fetchSupportHistory}
          />
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-4">
          <FAQContent />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <SupportHistory
            supportHistory={supportHistory}
            fetchingHistory={fetchingHistory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
