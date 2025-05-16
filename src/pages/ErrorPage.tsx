
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  type: '404' | '500' | '401' | 'session-expired' | 'payment-failure' | 'network-error';
}

export function ErrorPage({ type }: ErrorPageProps) {
  const navigate = useNavigate();

  const errorMessages = {
    '404': {
      title: "Oops! Page not found.",
      description: "The page you're looking for doesn't exist or has been moved.",
      action: "Go to Dashboard"
    },
    '500': {
      title: "Something went wrong on our end.",
      description: "Our team has been notified. Please try again later.",
      action: "Retry"
    },
    '401': {
      title: "Unauthorized Access",
      description: "You need to log in to view this page.",
      action: "Log In"
    },
    'session-expired': {
      title: "Session Expired",
      description: "Your session has expired. Please log in again.",
      action: "Log In"
    },
    'payment-failure': {
      title: "Payment Failed",
      description: "Transaction failed. Please try another payment method.",
      action: "Retry Payment"
    },
    'network-error': {
      title: "No Internet Connection",
      description: "Please check your network and try again.",
      action: "Retry Connection"
    }
  };

  const error = errorMessages[type];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-destructive">{error.title}</h1>
        <p className="text-muted-foreground">{error.description}</p>
        
        <div className="flex justify-center space-x-4">
          <Button onClick={() => {
            type === '404' ? navigate('/dashboard') : navigate('/login')
          }}>
            {error.action}
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}
