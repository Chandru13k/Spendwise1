
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function AddIncomePage() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Salary');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!amount || !title || !date) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to add income');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate a random unique ID for the transaction
      const randomId = Math.floor(Math.random() * 1000000) + 20; // Start after default data IDs
      
      const { error } = await supabase
        .from('transactions')
        .insert({
          id: randomId,
          title: title,
          amount: parseFloat(amount),
          date: date,
          category: category,
          type: 'income',
          user_id: user.id,
          is_default: false
        });

      if (error) throw error;
      
      toast.success('Income added successfully');
      navigate('/app/dashboard');
    } catch (error: any) {
      console.error('Error adding income:', error.message);
      toast.error('Failed to add income: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Add Income</h1>
      
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter income title" 
          />
        </div>
        
        <div>
          <Label>Amount (₹)</Label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Enter income amount" 
          />
        </div>
        
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select income category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Salary">Salary</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Investment">Investment</SelectItem>
              <SelectItem value="Rental">Rental</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Date</Label>
          <Input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        
        <div className="flex space-x-4">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Income'}
          </Button>
          <Button variant="outline" onClick={() => navigate('/app/dashboard')}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
