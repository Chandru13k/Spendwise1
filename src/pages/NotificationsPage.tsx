
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertTriangle, Info, Settings } from 'lucide-react';

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Budget Alert',
      description: 'You have reached 90% of your Dining budget.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Successful',
      description: 'Your subscription has been renewed successfully.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      description: 'Check out our new budget planning tool.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Unusual Activity',
      description: 'We noticed a large expense from your account.',
      time: '2 days ago',
      read: true
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important alerts and information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Mark All as Read</Button>
          <Button variant="outline">Clear All</Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border rounded-lg flex items-start gap-4 ${
                notification.read ? 'bg-card' : 'bg-accent/10'
              }`}
            >
              <div className="mt-1">
                {notification.type === 'alert' && (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                )}
                {notification.type === 'success' && (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
                {notification.type === 'info' && (
                  <Info className="h-5 w-5 text-info" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">You're all caught up!</h3>
            <p className="text-muted-foreground">No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
