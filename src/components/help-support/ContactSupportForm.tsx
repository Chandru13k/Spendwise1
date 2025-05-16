
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

interface ContactSupportFormProps {
  user: User | null;
  name: string;
  email: string;
  onSupportRequestSubmitted: () => Promise<void>;
}

export function ContactSupportForm({ 
  user, 
  name, 
  email,
  onSupportRequestSubmitted
}: ContactSupportFormProps) {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !message) {
      toast.error('Please select a category and enter your message');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get the next available ID for the transaction
      const { data: maxIdData } = await supabase
        .from('transactions')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);
      
      // Calculate the next ID or start from 1 if no records exist
      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;
      
      // Store support request in transactions table with category = 'support'
      const { error } = await supabase
        .from('transactions')
        .insert({
          id: nextId,
          type: 'support',
          category: 'support',
          title: category,
          narration: message,
          user_id: user?.id,
          date: new Date().toISOString().split('T')[0]
        });
        
      if (error) throw error;
      
      // Clear form
      setCategory('');
      setMessage('');
      
      toast.success('Your support request has been submitted');
      
      // Refresh history
      await onSupportRequestSubmitted();
    } catch (error) {
      console.error('Error submitting support request:', error);
      toast.error('Failed to submit support request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                placeholder="Your name"
                required
                disabled={!!user}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="Your email address"
                required
                disabled={!!user}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="payment">Payment & Billing</SelectItem>
                  <SelectItem value="technical">Technical Problems</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your issue or question in detail"
              rows={5}
              required
              className="min-h-[120px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full sm:w-auto" 
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </Card>
      
      <div className="rounded-lg border p-6 bg-muted/50">
        <h3 className="text-lg font-medium">Need immediate assistance?</h3>
        <p className="mt-2 text-muted-foreground">
          For urgent matters, you can contact us directly at support@spendwise.com 
          or call our customer service line at +1 (800) 123-4567, available 
          Monday-Friday, 9am-5pm EST.
        </p>
      </div>
    </>
  );
}
