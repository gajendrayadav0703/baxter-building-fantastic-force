import { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SkylineBackdrop from '../components/home/SkylineBackdrop';

/**
 * Responsive Cyberpunk Nexus Login Page for the Baxter Building Command Center.
 */
export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!identifier.trim()) {
      nextErrors.identifier = 'Please enter your email or username.';
    }
    if (!password) {
      nextErrors.password = 'Please enter your password.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusMessage(null);
      return;
    }

    setErrors({});
    setStatusMessage({
      type: 'info',
      text: `Ready to authenticate "${identifier.trim()}". Backend JWT login unlocks in Module 1.`,
    });
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center overflow-hidden bg-nexus-void px-4 py-10 sm:px-6 lg:px-8">
      <SkylineBackdrop activeEmergency={null} />

      <div className="relative z-10 w-full max-w-md">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-nexus-cyan transition-colors hover:text-nexus-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Nexus Command Center
        </Link>

        <section
          aria-labelledby="login-heading"
          className="rounded-2xl border border-white/10 bg-nexus-card/95 p-6 shadow-nexus-card backdrop-blur-md sm:p-8"
        >
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-nexus-cyan/35 bg-nexus-navy/90 px-3.5 py-1 text-[11px] font-semibold tracking-widest text-nexus-cyan">
              <ShieldCheck className="h-3.5 w-3.5 text-nexus-green" aria-hidden="true" />
              NEXUS ACCESS PORTAL
            </div>

            <h1
              id="login-heading"
              className="mt-4 text-2xl font-extrabold tracking-tight text-nexus-text sm:text-3xl"
            >
              Commander Login
            </h1>
            <p className="mt-2 text-sm text-nexus-muted">
              Sign in to access Hero Network, Mission Control, and live Nexus operations.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {/* Email / Username */}
            <div>
              <label
                htmlFor="login-identifier"
                className="block text-xs font-semibold uppercase tracking-wider text-nexus-muted"
              >
                Email or Username
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-nexus-muted">
                  <User className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="login-identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errors.identifier) {
                      setErrors((prev) => ({ ...prev, identifier: undefined }));
                    }
                  }}
                  placeholder="commander@baxter.nexus"
                  aria-invalid={Boolean(errors.identifier)}
                  aria-describedby={errors.identifier ? 'login-identifier-error' : undefined}
                  className={`w-full rounded-xl border bg-nexus-navy/90 py-2.5 pl-10 pr-4 text-sm text-nexus-text placeholder:text-nexus-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-nexus-cyan ${
                    errors.identifier
                      ? 'border-nexus-orange/70 focus:ring-nexus-orange'
                      : 'border-white/15 hover:border-nexus-cyan/45'
                  }`}
                />
              </div>
              {errors.identifier && (
                <p
                  id="login-identifier-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-nexus-orange"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-nexus-muted"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice((prev) => !prev)}
                  className="rounded text-xs font-medium text-nexus-cyan transition-colors hover:text-nexus-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-nexus-muted">
                  <Lock className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                  className={`w-full rounded-xl border bg-nexus-navy/90 py-2.5 pl-10 pr-11 text-sm text-nexus-text placeholder:text-nexus-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-nexus-cyan ${
                    errors.password
                      ? 'border-nexus-orange/70 focus:ring-nexus-orange'
                      : 'border-white/15 hover:border-nexus-cyan/45'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-3 text-nexus-muted transition-colors hover:text-nexus-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="login-password-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-nexus-orange"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password inline notice */}
            {showForgotNotice && (
              <div
                role="status"
                className="rounded-xl border border-nexus-violet/40 bg-nexus-violet/10 px-3.5 py-2.5 text-xs leading-relaxed text-nexus-muted"
              >
                Password reset will connect to the Nexus Auth service in Module 1. Contact your
                Lead Commander if you need manual clearance.
              </div>
            )}

            {/* Submit feedback */}
            {statusMessage && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-xl border border-nexus-cyan/40 bg-nexus-cyan/10 px-3.5 py-2.5 text-xs leading-relaxed text-nexus-text"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-nexus-cyan"
                  aria-hidden="true"
                />
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-nexus-cyan px-4 py-2.5 text-sm font-bold text-nexus-void shadow-nexus-cyan transition-colors hover:bg-nexus-cyan/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-card"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Login to Nexus
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-nexus-muted">
            Need Nexus clearance?{' '}
            <Link
              to="/register"
              className="font-semibold text-nexus-cyan transition-colors hover:text-nexus-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan rounded"
            >
              Sign Up
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
