import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentPlanner() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Study Planner</h1>
        <p className="text-muted-foreground mt-2">
          Plan your study schedule effectively
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Study planner feature coming soon. Create custom study schedules!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
