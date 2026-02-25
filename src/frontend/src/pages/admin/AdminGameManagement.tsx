import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Gamepad2,
  Trophy,
  BarChart3,
  Users,
  TrendingUp,
  Library,
  Radio,
  Plus,
  Rocket,
} from 'lucide-react';

interface GameFeatureTile {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  stat: string;
  statLabel: string;
}

const gameTiles: GameFeatureTile[] = [
  {
    id: 'create-game',
    title: 'Create New Game',
    description: 'Design custom educational games for your class',
    icon: Plus,
    colorClass: 'text-chart-1',
    bgClass: 'bg-chart-1/10',
    stat: '0',
    statLabel: 'games created',
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    description: 'View top performing students across all levels',
    icon: Trophy,
    colorClass: 'text-chart-2',
    bgClass: 'bg-chart-2/10',
    stat: '12',
    statLabel: 'students ranked',
  },
  {
    id: 'student-progress',
    title: 'Student Progress Tracking',
    description: 'Monitor individual student game performance',
    icon: BarChart3,
    colorClass: 'text-chart-3',
    bgClass: 'bg-chart-3/10',
    stat: '8',
    statLabel: 'active students',
  },
  {
    id: 'assign-game',
    title: 'Assign Game to Class',
    description: 'Assign games to specific classes or students',
    icon: Users,
    colorClass: 'text-chart-4',
    bgClass: 'bg-chart-4/10',
    stat: '2',
    statLabel: 'assignments',
  },
  {
    id: 'analytics',
    title: 'Performance Analytics',
    description: 'Deep dive into game completion data and trends',
    icon: TrendingUp,
    colorClass: 'text-chart-5',
    bgClass: 'bg-chart-5/10',
    stat: '78%',
    statLabel: 'avg score',
  },
  {
    id: 'library',
    title: 'Game Library',
    description: 'Browse all available educational games',
    icon: Library,
    colorClass: 'text-chart-1',
    bgClass: 'bg-chart-1/10',
    stat: '3',
    statLabel: 'games available',
  },
  {
    id: 'live-control',
    title: 'Live Game Control Panel',
    description: 'Monitor and control active game sessions in real time',
    icon: Radio,
    colorClass: 'text-chart-2',
    bgClass: 'bg-chart-2/10',
    stat: '0',
    statLabel: 'sessions live',
  },
];

export default function AdminGameManagement() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display text-foreground">Game Management</h1>
        <p className="text-muted-foreground mt-1">
          Create, manage, and monitor educational games for your students
        </p>
      </div>

      {/* Feature Tiles Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {gameTiles.map((tile) => (
          <GameFeatureTile key={tile.id} tile={tile} />
        ))}
      </div>

      {/* Getting Started Empty State */}
      <Card className="border-dashed border-2 border-border bg-muted/30 shadow-none">
        <CardContent className="flex flex-col items-center justify-center py-14 text-center gap-4">
          <div className="p-4 rounded-full bg-primary/10">
            <Rocket className="h-10 w-10 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-display text-foreground mb-2">
              Ready to launch your first game?
            </CardTitle>
            <CardDescription className="max-w-md mx-auto text-base">
              Get started by creating an educational game for your class. Students will play
              through levels and answer quiz questions to unlock new content.
            </CardDescription>
          </div>
          <div className="flex gap-3 flex-wrap justify-center mt-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create First Game
            </Button>
            <Button variant="outline" className="gap-2">
              <Library className="h-4 w-4" />
              Browse Game Library
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GameFeatureTile({ tile }: { tile: GameFeatureTile }) {
  const Icon = tile.icon;
  return (
    <Card className="group cursor-pointer border-border shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl ${tile.bgClass} mb-1`}>
            <Icon className={`h-6 w-6 ${tile.colorClass}`} />
          </div>
          <Badge variant="secondary" className="text-xs font-medium shrink-0 mt-1">
            <span className="font-bold mr-1">{tile.stat}</span>
            {tile.statLabel}
          </Badge>
        </div>
        <CardTitle className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
          {tile.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">{tile.description}</p>
      </CardContent>
    </Card>
  );
}
