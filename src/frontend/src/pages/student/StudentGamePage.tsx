import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentGamePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Learning Game</h1>
        <p className="text-muted-foreground mt-2">
          Play through levels and answer quizzes to unlock new challenges
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>2D Platformer Game</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Game feature coming soon. Complete levels and answer educational quizzes to progress!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
