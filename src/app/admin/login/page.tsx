'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Prefill demo credentials for convenience
  useEffect(() => {
    setUsername('admin');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Logged in successfully');
        router.push(redirectTo);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground p-4 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 -left-32 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none float-slow" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-brand-orange-light/10 blur-3xl pointer-events-none float-slow" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card rounded-3xl p-8 sm:p-10 shadow-soft-lg">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center">
              <span className="font-display text-2xl font-extrabold italic text-brand-orange">A</span>
            </div>
            <div className="leading-tight text-left">
              <div className="font-display text-xl font-bold">Arslan Traders</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Admin Access
              </div>
            </div>
          </Link>

          <h1 className="font-display text-headline font-bold text-center mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-center text-[14px] mb-8">
            Sign in to manage your store
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-2 text-[13px] text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-bold text-muted-foreground mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-bold text-muted-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-gradient text-white text-[15px] font-bold hover:scale-[1.01] transition-transform disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 rounded-xl bg-accent/40 border border-border">
            <div className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-1">
              Demo Credentials
            </div>
            <div className="text-[13px] text-foreground">
              Username: <span className="font-mono font-bold">admin</span>
            </div>
            <div className="text-[13px] text-foreground">
              Password: <span className="font-mono font-bold">arslan2025</span>
            </div>
          </div>

          <Link
            href="/"
            className="mt-6 flex items-center justify-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
