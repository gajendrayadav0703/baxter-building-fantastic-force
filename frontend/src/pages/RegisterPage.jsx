import { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  AtSign,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SkylineBackdrop from '../components/home/SkylineBackdrop';
import { useAuth } from '../context/AuthContext';

/**
 * Responsive Cyberpunk Nexus Registration Page.
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters.';
    }
    const cleanUsername = form.username.trim().toLowerCase();
    if (cleanUsername.length < 3) {
      nextErrors.username = 'Username must be at least 3 characters.';
    } else if (!/^[a-z0-9_.-]+$/.test(cleanUsername)) {
      nextErrors.username = 'Use only letters, numbers, underscores, dots, or hyphens.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setServerError('');
      return;
    }

    setErrors({});
    setServerError('');
    setIsSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        username: form.username.trim().toLowerCase(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate('/', { replace: true });
    } catch (error) {
      if (error.errors) {
        const mapped = {};
        for (const [key, messages] of Object.entries(error.errors)) {
          if (Array.isArray(messages) && messages[0]) {
            mapped[key] = messages[0];
          }
        }
        setErrors(mapped);
      }
      setServerError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          aria-labelledby="register-heading"
          className="rounded-2xl border border-white/10 bg-nexus-card/95 p-6 shadow-nexus-card backdrop-blur-md sm:p-8"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-nexus-violet/40 bg-nexus-navy/90 px-3.5 py-1 text-[11px] font-semibold tracking-widest text-nexus-violet">
              <ShieldCheck className="h-3.5 w-3.5 text-nexus-cyan" aria-hidden="true" />
              NEXUS CLEARANCE
            </div>

            <h1
              id="register-heading"
              className="mt-4 text-2xl font-extrabold tracking-tight text-nexus-text sm:text-3xl"
            >
              Create Account
            </h1>
            <p className="mt-2 text-sm text-nexus-muted">
              Register for Nexus Command Center access. First user receives Commander role.
            </p>
          </div>

          {serverError && (
            <div
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-xl border border-nexus-orange/50 bg-nexus-orange/10 px-3.5 py-2.5 text-xs font-medium text-nexus-orange"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold uppercase tracking-wider text-nexus-muted"
              >
                Full Name
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-nexus-muted">
                  <User className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField('name')}
                  placeholder="Reed Richards"
                  aria-invalid={Boolean(errors.name)}
                  className={`w-full rounded-xl border bg-nexus-navy/90 py-2.5 pl-10 pr-4 text-sm text-nexus-text placeholder:text-nexus-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-nexus-cyan ${
                    errors.name ? 'border-nexus-orange/70' : 'border-white/15 hover:border-nexus-cyan/45'
                  }`}
                />
              </div>
              {errors.name && (
                <p role="alert" className="mt-1 text-xs font-medium text-nexus-orange">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="register-username"
                className="block text-xs font-semibold uppercase tracking-wider text-nexus-muted"
              >
                Username
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-nexus-muted">
                  <AtSign className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="register-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={form.username}
                  onChange={updateField('username')}
                  placeholder="mrfantastic"
                  aria-invalid={Boolean(errors.username)}
                  className={`w-full rounded-xl border bg-nexus-navy/90 py-2.5 pl-10 pr-4 text-sm text-nexus-text placeholder:text-nexus-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-nexus-cyan ${
                    errors.username
                      ? 'border-nexus-orange/70'
                      : 'border-white/15 hover:border-nexus-cyan/45'
                  }`}
                />
              </div>
              {errors.username && (
                <p role="alert" className="mt-1 text-xs font-medium text-nexus-orange">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold uppercase tracking-wider text-nexus-muted"
              >
                Email
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-nexus-muted">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField('email')}
                  placeholder="reed@baxter.nexus"
                  aria-invalid={Boolean(errors.email)}
                  className={`w-full rounded-xl border bg-nexus-navy/90 py-2.5 pl-10 pr-4 text-sm text-nexus-text placeholder:text-nexus-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-nexus-cyan ${
                    errors.email ? 'border-nexus-orange/70' : 'border-white/15 hover:border-nexus-cyan/45'
                  }`}
                />
              </div>
              {errors.email && (
                <p role="alert" className="mt-1 text-xs font-medium text-nexus-orange">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold uppercase tracking-wider text-nexus-muted"
              >
                Password
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-nexus-muted">
                  <Lock className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={updateField('password')}
                  placeholder="At least 8 characters"
                  aria-invalid={Boolean(errors.password)}
                  className={`w-full rounded-xl border bg-nexus-navy/90 py-2.5 pl-10 pr-11 text-sm text-nexus-text placeholder:text-nexus-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-nexus-cyan ${
                    errors.password
                      ? 'border-nexus-orange/70'
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
                <p role="alert" className="mt-1 text-xs font-medium text-nexus-orange">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-semibold uppercase tracking-wider text-nexus-muted"
              >
                Confirm Password
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-nexus-muted">
                  <Lock className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={updateField('confirmPassword')}
                  placeholder="Re-enter your password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  className={`w-full rounded-xl border bg-nexus-navy/90 py-2.5 pl-10 pr-4 text-sm text-nexus-text placeholder:text-nexus-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-nexus-cyan ${
                    errors.confirmPassword
                      ? 'border-nexus-orange/70'
                      : 'border-white/15 hover:border-nexus-cyan/45'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p role="alert" className="mt-1 text-xs font-medium text-nexus-orange">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-nexus-cyan px-4 py-2.5 text-sm font-bold text-nexus-void shadow-nexus-cyan transition-colors hover:bg-nexus-cyan/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-card"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Create Nexus Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-nexus-muted">
            Already have Nexus clearance?{' '}
            <Link
              to="/login"
              className="rounded font-semibold text-nexus-cyan transition-colors hover:text-nexus-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
            >
              Sign In
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
