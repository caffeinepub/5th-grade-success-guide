import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminQuizzes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Quiz Manager</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage quizzes for students
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Quiz management feature coming soon. This will include creating quizzes with 15 questions, 4 options each.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
