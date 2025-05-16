
import React from 'react';
import { Card } from '@/components/ui/card';

export function FAQContent() {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">How do I reset my password?</h3>
        <p className="text-muted-foreground">
          Go to the login page and click on "Forgot password?". Enter your email address 
          and follow the instructions sent to your email to reset your password.
        </p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">How do I add a new expense category?</h3>
        <p className="text-muted-foreground">
          Navigate to Settings {'>'}  Categories, then click on "Add Category" button. 
          Enter the name and select an icon for your new category.
        </p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Can I export my financial data?</h3>
        <p className="text-muted-foreground">
          Yes, go to Reports {'>'}  Export Data. You can export your data in CSV or PDF format 
          for any date range you specify.
        </p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Is my financial data secure?</h3>
        <p className="text-muted-foreground">
          Yes, we use bank-level encryption to protect your data. We also implement strict 
          access controls and regular security audits to ensure your information remains safe.
        </p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">How do I cancel my subscription?</h3>
        <p className="text-muted-foreground">
          Go to Profile {'>'}  Subscription, then click on "Cancel Subscription". Follow the 
          prompts to confirm cancellation. Your service will continue until the end of the 
          current billing period.
        </p>
      </div>
    </Card>
  );
}
