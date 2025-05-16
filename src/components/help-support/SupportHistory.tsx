
import React from 'react';
import { Card } from '@/components/ui/card';

interface SupportRequest {
  id: number;
  title: string;
  narration: string;
  date: string;
  is_default: boolean;
}

interface SupportHistoryProps {
  supportHistory: SupportRequest[];
  fetchingHistory: boolean;
}

export function SupportHistory({ supportHistory, fetchingHistory }: SupportHistoryProps) {
  if (fetchingHistory) {
    return <p>Loading your support history...</p>;
  }
  
  if (supportHistory.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p>You haven't submitted any support requests yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {supportHistory.map((request) => (
        <Card key={request.id} className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
            <div>
              <span className="font-medium">{request.title}</span>
              <span className="text-sm text-muted-foreground ml-2">
                {new Date(request.date).toLocaleDateString()}
              </span>
            </div>
            <div className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
              {request.is_default ? 'Resolved' : 'Pending'}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{request.narration}</p>
        </Card>
      ))}
    </div>
  );
}
