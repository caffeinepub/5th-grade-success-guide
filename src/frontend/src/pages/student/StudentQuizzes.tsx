import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentQuizzes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Quizzes</h1>
        <p className="text-muted-foreground mt-2">
          Test your knowledge and track your progress
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Quizzes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Quiz feature coming soon. Take quizzes to test your knowledge!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
