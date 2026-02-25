import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage users and permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            User management feature coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
