import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router, Route, RootRoute, RouterProvider } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Auth pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';

// Admin pages
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminOverview from '@/pages/admin/AdminOverview';
import AdminStudyTips from '@/pages/admin/AdminStudyTips';
import AdminGameManagement from '@/pages/admin/AdminGameManagement';
import AdminAIAssistant from '@/pages/admin/AdminAIAssistant';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminSettings from '@/pages/admin/AdminSettings';

// Student pages
import StudentLayout from '@/pages/student/StudentLayout';
import StudentDashboard from '@/pages/student/StudentDashboard';
import StudentStudyTips from '@/pages/student/StudentStudyTips';
import StudentNotes from '@/pages/student/StudentNotes';
import StudentQuizzes from '@/pages/student/StudentQuizzes';
import StudentPlanner from '@/pages/student/StudentPlanner';
import StudentTimer from '@/pages/student/StudentTimer';
import StudentGamePage from '@/pages/student/StudentGamePage';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Root route
const rootRoute = new RootRoute();

// Auth routes
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

const forgotPasswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
});

// Admin routes
const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <ProtectedRoute requireAdmin>
      <AdminLayout />
    </ProtectedRoute>
  ),
});

const adminIndexRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/',
  component: AdminOverview,
});

const adminTipsRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/tips',
  component: AdminStudyTips,
});

const adminGamesRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/games',
  component: AdminGameManagement,
});

const adminAIRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/ai',
  component: AdminAIAssistant,
});

const adminUsersRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/users',
  component: AdminUsers,
});

const adminSettingsRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/settings',
  component: AdminSettings,
});

// Student routes
const studentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/student',
  component: () => (
    <ProtectedRoute>
      <StudentLayout />
    </ProtectedRoute>
  ),
});

const studentIndexRoute = new Route({
  getParentRoute: () => studentRoute,
  path: '/',
  component: StudentDashboard,
});

const studentTipsRoute = new Route({
  getParentRoute: () => studentRoute,
  path: '/tips',
  component: StudentStudyTips,
});

const studentNotesRoute = new Route({
  getParentRoute: () => studentRoute,
  path: '/notes',
  component: StudentNotes,
});

const studentQuizzesRoute = new Route({
  getParentRoute: () => studentRoute,
  path: '/quizzes',
  component: StudentQuizzes,
});

const studentPlannerRoute = new Route({
  getParentRoute: () => studentRoute,
  path: '/planner',
  component: StudentPlanner,
});

const studentTimerRoute = new Route({
  getParentRoute: () => studentRoute,
  path: '/timer',
  component: StudentTimer,
});

const studentGameRoute = new Route({
  getParentRoute: () => studentRoute,
  path: '/game',
  component: StudentGamePage,
});

// Index redirect
function IndexRedirect() {
  React.useEffect(() => {
    window.location.href = '/login';
  }, []);
  return null;
}

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexRedirect,
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  forgotPasswordRoute,
  adminRoute.addChildren([
    adminIndexRoute,
    adminTipsRoute,
    adminGamesRoute,
    adminAIRoute,
    adminUsersRoute,
    adminSettingsRoute,
  ]),
  studentRoute.addChildren([
    studentIndexRoute,
    studentTipsRoute,
    studentNotesRoute,
    studentQuizzesRoute,
    studentPlannerRoute,
    studentTimerRoute,
    studentGameRoute,
  ]),
]);

// Create router
const router = new Router({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
