import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GraduationCap, UserPlus, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const { register, isAuthenticated, isLoading, role } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: UserRole.user as UserRole.admin | UserRole.user,
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate({ to: role === UserRole.admin ? '/admin' : '/student' });
    }
  }, [isAuthenticated, isLoading, navigate, role]);

  const validateUsername = (username: string): string => {
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username must be less than 20 characters';
    if (!/^[a-zA-Z0-9]+$/.test(username)) return 'Username can only contain letters and numbers';
    return '';
  };

  const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; color: string; icon: React.ReactNode } => {
    if (password.length === 0) return { strength: 'weak', color: 'text-muted-foreground', icon: null };
    if (password.length < 8) return { strength: 'weak', color: 'text-destructive', icon: <XCircle className="h-4 w-4" /> };
    
    let score = 0;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { strength: 'medium', color: 'text-warning', icon: <AlertCircle className="h-4 w-4" /> };
    return { strength: 'strong', color: 'text-success', icon: <CheckCircle2 className="h-4 w-4" /> };
  };

  const validatePassword = (password: string): string => {
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const handleUsernameChange = (username: string) => {
    setFormData({ ...formData, username });
    setErrors({ ...errors, username: validateUsername(username) });
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    setErrors({ 
      ...errors, 
      password: validatePassword(password),
      confirmPassword: formData.confirmPassword && password !== formData.confirmPassword ? 'Passwords do not match' : ''
    });
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setFormData({ ...formData, confirmPassword });
    setErrors({ 
      ...errors, 
      confirmPassword: confirmPassword !== formData.password ? 'Passwords do not match' : ''
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = formData.password !== formData.confirmPassword ? 'Passwords do not match' : '';

    if (usernameError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      toast.error('Please fix the errors before submitting');
      return;
    }

    if (!formData.name) {
      toast.error('Please enter your name');
      return;
    }

    setIsRegistering(true);
    try {
      await register(formData.username, formData.password, formData.name, formData.role);
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Username may already exist.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-display text-foreground">5th Grade Success</h1>
        </div>
        <p className="text-muted-foreground">Create your learning account</p>
      </div>

      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join thousands of successful students</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                required
                autoComplete="username"
                className={errors.username ? 'border-destructive' : ''}
              />
              {errors.username && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
              {formData.password && !errors.password && (
                <p className={`text-sm flex items-center gap-1 ${passwordStrength.color}`}>
                  {passwordStrength.icon}
                  Password strength: {passwordStrength.strength}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={`pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>I am a...</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as UserRole.admin | UserRole.user })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={UserRole.user} id="student" />
                  <Label htmlFor="student" className="font-normal cursor-pointer">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={UserRole.admin} id="admin" />
                  <Label htmlFor="admin" className="font-normal cursor-pointer">
                    Teacher / Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              disabled={isRegistering}
              className="w-full"
              size="lg"
            >
              {isRegistering ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Built with ❤️ using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
