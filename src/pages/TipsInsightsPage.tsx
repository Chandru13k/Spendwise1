
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Share2, ThumbsUp } from 'lucide-react';

export function TipsInsightsPage() {
  const tips = [
    {
      id: 1,
      title: '50/30/20 Rule for Budgeting',
      description: 'Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.',
      category: 'Budgeting',
      tags: ['budget', 'planning', 'beginner'],
      likes: 245
    },
    {
      id: 2,
      title: 'Track Every Expense',
      description: 'Consistent tracking of all expenses, no matter how small, helps identify spending patterns and potential savings opportunities.',
      category: 'Tracking',
      tags: ['habit', 'expenses', 'consistency'],
      likes: 189
    },
    {
      id: 3,
      title: 'Emergency Fund Importance',
      description: 'Aim to save 3-6 months of living expenses in an easily accessible account for unexpected emergencies.',
      category: 'Saving',
      tags: ['emergency', 'fund', 'security'],
      likes: 312
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tips & Insights</h1>
          <p className="text-muted-foreground">Learn smart financial habits and strategies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">All Topics</Button>
          <Button variant="outline">Bookmarked</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => (
          <Card key={tip.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tip.title}</CardTitle>
                  <CardDescription className="mt-2">{tip.category}</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {tip.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground">{tip.likes}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
