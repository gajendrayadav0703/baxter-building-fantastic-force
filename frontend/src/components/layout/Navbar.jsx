import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Archive, Bell, ChevronDown, LogIn, LogOut, Menu, User, UserPlus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Hero Network', to: '/hero-network' },
  { label: 'Mission Control', to: '/mission-control' },
  { label: 'Threat Intelligence', to: '/threat-intelligence' },
  { label: 'Vanguard Leaderboard', to: '/vanguard-leaderboard' },
  { label: 'Signal Hub', to: '/signal-hub' },
];

/**
 * Top command navigation bar with responsive mobile/tablet drawer,
 * working profile menu, and keyboard Escape support.
 */
export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const mobileToggleRef = useRef(null);
  const profileMenuRef = useRef(null);

  const handleLogout = async () => {
    setProfileOpen(false);
    setMobileOpen(false);
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (mobileOpen) {
          setMobileOpen(false);
          mobileToggleRef.current?.focus();
        }
        if (profileOpen) {
          setProfileOpen(false);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen, profileOpen]);

  const linkClassName = ({ isActive }) =>
    [
      'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-navy',
      isActive
        ? 'bg-nexus-cyan/15 text-nexus-cyan border border-nexus-cyan/40'
        : 'text-nexus-muted hover:text-nexus-text hover:bg-nexus-card/80 border border-transparent',
    ].join(' ');

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-nexus-navy/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-navy"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-nexus-cyan/40 bg-nexus-card shadow-nexus-cyan">
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
              <path
                d="M16 3L21 8V28H11V8L16 3Z"
                stroke="#16D9F5"
                strokeWidth="1.75"
                fill="rgba(22, 217, 245, 0.12)"
              />
              <path d="M16 3V28" stroke="#9B5CFF" strokeWidth="1.25" strokeOpacity="0.8" />
              <path d="M7 28H25" stroke="#16D9F5" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="16" cy="11" r="1.6" fill="#16D9F5" />
            </svg>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-bold tracking-wide text-nexus-text sm:text-base">
                BAXTER BUILDING
              </span>
              <span className="hidden rounded-full border border-nexus-violet/45 bg-nexus-violet/15 px-2.5 py-0.5 text-[11px] font-semibold text-nexus-violet md:inline-block">
                Cyberpunk Nexus
              </span>
            </div>
            <p className="truncate text-xs font-medium tracking-wider text-nexus-cyan">
              FANTASTIC FORCE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/signal-hub"
            aria-label="Open Signal Hub notifications"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-nexus-card text-nexus-muted transition-colors hover:border-nexus-cyan/45 hover:text-nexus-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-navy"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Interactive Profile Popover */}
          <div ref={profileMenuRef} className="relative hidden sm:block">
            <button
              type="button"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-nexus-card px-3 text-xs font-semibold text-nexus-text transition-colors hover:border-nexus-cyan/45 hover:text-nexus-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-navy"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-nexus-cyan/15 text-nexus-cyan">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="max-w-[120px] truncate">
                {isAuthenticated ? user.name : 'Commander'}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-nexus-muted transition-transform duration-200 ${
                  profileOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {profileOpen && (
              <div
                role="menu"
                aria-label="Commander console menu"
                className="absolute right-0 mt-2 w-60 rounded-xl border border-white/15 bg-nexus-card p-2 shadow-nexus-card"
              >
                <div className="border-b border-white/10 px-3 py-2">
                  {isAuthenticated ? (
                    <>
                      <p className="truncate text-xs font-semibold text-nexus-text">{user.name}</p>
                      <p className="mt-0.5 truncate text-xs text-nexus-cyan">
                        @{user.username} · <span className="capitalize">{user.role}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-nexus-text">Nexus Console</p>
                      <p className="mt-0.5 text-xs text-nexus-muted">Not signed in</p>
                    </>
                  )}
                </div>
                <Link
                  to="/mission-archives"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-nexus-text transition-colors hover:bg-nexus-navy hover:text-nexus-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
                >
                  <Archive className="h-3.5 w-3.5 text-nexus-violet" aria-hidden="true" />
                  Mission Archives
                </Link>
                {isAuthenticated ? (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-nexus-orange transition-colors hover:bg-nexus-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
                  >
                    <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-nexus-text transition-colors hover:bg-nexus-navy hover:text-nexus-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
                    >
                      <LogIn className="h-3.5 w-3.5 text-nexus-cyan" aria-hidden="true" />
                      Commander Login
                    </Link>
                    <Link
                      to="/register"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-nexus-text transition-colors hover:bg-nexus-navy hover:text-nexus-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
                    >
                      <UserPlus className="h-3.5 w-3.5 text-nexus-green" aria-hidden="true" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile / Tablet Drawer Toggle */}
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="nexus-mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-nexus-card text-nexus-text transition-colors hover:border-nexus-cyan/45 hover:text-nexus-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-navy xl:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Tablet / Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="nexus-mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-nexus-navy px-4 py-4 xl:hidden"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-medium text-nexus-muted">
              Theme: <span className="font-semibold text-nexus-violet">Cyberpunk Nexus</span>
            </span>
            <span className="text-xs font-medium text-nexus-text">Commander Console</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={linkClassName}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/mission-archives"
              onClick={() => setMobileOpen(false)}
              className={linkClassName}
            >
              Mission Archives
            </NavLink>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-left text-sm font-medium text-nexus-orange transition-colors hover:bg-nexus-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign Out ({user.name})
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={linkClassName}
                >
                  Commander Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className={linkClassName}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
