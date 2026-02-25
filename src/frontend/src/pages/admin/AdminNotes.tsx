import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminNotes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-foreground">Notes Manager</h1>
        <p className="text-muted-foreground mt-2">
          Upload and manage study notes for students
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notes Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Notes management feature coming soon. This will include file uploads using the blob-storage component.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
