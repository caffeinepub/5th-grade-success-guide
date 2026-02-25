import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminStatistics } from '@/hooks/useQueries';
import {
  BookOpen,
  Users,
  Gamepad2,
  TrendingUp,
  Rocket,
  Star,
  Award,
  BookMarked,
  UserPlus,
  Clock,
  ArrowRight,
} from 'lucide-react';

const SKELETON_IDS = ['stat-a', 'stat-b', 'stat-c', 'stat-d'] as const;

const recentActivity = [
  {
    id: 'act-1',
    icon: UserPlus,
    description: 'New student joined the platform',
    timestamp: '2 minutes ago',
    color: 'text-chart-1',
    bg: 'bg-chart-1/10',
  },
  {
    id: 'act-2',
    icon: Star,
    description: 'Level 3 completed by a student — Math quiz scored 93%',
    timestamp: '18 minutes ago',
    color: 'text-chart-2',
    bg: 'bg-chart-2/10',
  },
  {
    id: 'act-3',
    icon: BookMarked,
    description: 'New study tip added: "Mastering Fractions"',
    timestamp: '1 hour ago',
    color: 'text-chart-3',
    bg: 'bg-chart-3/10',
  },
  {
    id: 'act-4',
    icon: Award,
    description: 'Student reached the leaderboard top 3',
    timestamp: '2 hours ago',
    color: 'text-chart-4',
    bg: 'bg-chart-4/10',
  },
  {
    id: 'act-5',
    icon: Clock,
    description: 'Weekly class performance report generated',
    timestamp: '5 hours ago',
    color: 'text-chart-5',
    bg: 'bg-chart-5/10',
  },
];

export default function AdminOverview() {
  const { data: stats, isLoading } = useAdminStatistics();

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers?.toString() ?? '0',
      icon: Users,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
    {
      title: 'Study Tips',
      value: stats?.totalStudyTips?.toString() ?? '0',
      icon: BookOpen,
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
    },
    {
      title: 'Active Games',
      value: '4',
      icon: Gamepad2,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
    {
      title: 'Class Performance',
      value: '78%',
      icon: TrendingUp,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-display text-foreground">Dashboard Overview</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKELETON_IDS.map((id) => (
            <Card key={id} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your platform's activity and manage your class
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            className="shadow-sm hover:shadow-md transition-shadow border-border"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Launch Game CTA */}
      <Card className="border-0 bg-gradient-to-r from-primary/90 to-primary shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-white" />
          <div className="absolute -bottom-8 left-20 w-24 h-24 rounded-full bg-white" />
        </div>
        <CardContent className="py-6 px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/20">
              <Rocket className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-display text-primary-foreground">
                Quick Launch Game
              </h2>
              <p className="text-primary-foreground/80 text-sm mt-0.5">
                Start a live game session for your class right now
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 font-semibold shrink-0"
          >
            <Link to="/admin/games">
              Go to Game Management
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-sm border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 py-3 border-b border-border last:border-0"
              >
                <div className={`p-2 rounded-lg ${item.bg} shrink-0 mt-0.5`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">{item.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Nav */}
        <Card className="shadow-sm border-border h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Manage Study Tips', href: '/admin/tips', icon: BookOpen, color: 'text-chart-5' },
              { label: 'Game Management', href: '/admin/games', icon: Gamepad2, color: 'text-chart-1' },
              { label: 'AI Assistant', href: '/admin/ai', icon: TrendingUp, color: 'text-chart-2' },
              { label: 'View Users', href: '/admin/users', icon: Users, color: 'text-chart-3' },
            ].map((action) => (
              <Button
                key={action.label}
                asChild
                variant="outline"
                className="w-full justify-start gap-3 hover:bg-muted/60"
              >
                <Link to={action.href}>
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                  <span className="text-sm">{action.label}</span>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
