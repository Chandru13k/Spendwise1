
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkUrl: string;
}

export function AuthLayout({
  children,
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkUrl
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Brand Section - Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">SpendWise</h1>
          <p className="mt-2 text-primary-foreground/90">Smart expense tracking & financial management</p>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Take control of your finances</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                <span>Track expenses and income</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                <span>Create custom budgets</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                <span>Generate detailed reports</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                <span>Get financial insights</span>
              </li>
            </ul>
          </div>
        </div>
        
        <p className="text-sm text-primary-foreground/80">© 2025 SpendWise. All rights reserved.</p>
      </div>
      
      {/* Form Section - Right Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          {children}
          
          <p className="text-sm text-center text-muted-foreground">
            {footerText}{" "}
            <Link to={footerLinkUrl} className="text-primary hover:underline">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
