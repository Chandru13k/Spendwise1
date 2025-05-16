
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ContactModal } from '@/components/modals/ContactModal';
import { VideoPlayerModal } from '@/components/modals/VideoPlayerModal';

export function LandingPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="border-b">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">SpendWise</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="#features" className="text-sm hover:text-primary">Features</Link>
              <Link to="#pricing" className="text-sm hover:text-primary">Pricing</Link>
              <Link to="/app/tips" className="text-sm hover:text-primary">Tips & Insights</Link>
              <Button variant="ghost" onClick={() => setIsContactModalOpen(true)}>Contact Us</Button>
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Take control of your finances</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              SpendWise helps you track expenses, plan budgets, and achieve your financial goals with powerful yet simple tools.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg">Get Started For Free</Button>
              </Link>
              <Button size="lg" variant="outline" onClick={() => setIsVideoModalOpen(true)}>
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Everything you need to manage your money</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Expense Tracking</h3>
                <p className="text-muted-foreground">
                  Easily track and categorize your spending to understand where your money goes.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Budget Planning</h3>
                <p className="text-muted-foreground">
                  Create custom budgets and get alerts when you're approaching your limits.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Financial Insights</h3>
                <p className="text-muted-foreground">
                  Get personalized insights and tips to improve your financial health.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link to="/app/tips">
                <Button>Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Simple, transparent pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-3xl font-bold mb-6">$0<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Basic expense tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Monthly reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Up to 3 budgets</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </div>
              
              <div className="p-6 bg-primary text-primary-foreground rounded-lg shadow-md border border-primary relative">
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium">Popular</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Premium</h3>
                <p className="text-3xl font-bold mb-6">$9.99<span className="text-lg opacity-90 font-normal">/mo</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Advanced expense tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Unlimited reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Unlimited budgets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Smart insights</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button variant="secondary" className="w-full">Get Started</Button>
                </Link>
              </div>
              
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-2">Business</h3>
                <p className="text-3xl font-bold mb-6">$24.99<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>All Premium features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">SpendWise</h3>
                <p className="text-sm text-muted-foreground">
                  Smart finance management for everyone.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link to="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/app/tips" className="text-muted-foreground hover:text-foreground">Tips & Insights</Link></li>
                  <li><Link to="/app/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => setIsContactModalOpen(true)} className="text-muted-foreground hover:text-foreground">Contact Us</button></li>
                  <li><a href="mailto:support@finflow.com" className="text-muted-foreground hover:text-foreground">support@finflow.com</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>© 2025 SpendWise. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Modals */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <VideoPlayerModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="SpendWise in Action" 
      />
    </>
  );
}
