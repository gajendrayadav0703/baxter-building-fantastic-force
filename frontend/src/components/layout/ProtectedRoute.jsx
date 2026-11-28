import { Loader2, ShieldCheck } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Guards operational routes, waiting for session verification before
 * redirecting unauthenticated users to /login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="flex min-h-[calc(100vh-4.25rem)] items-center justify-center bg-nexus-void px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-nexus-card px-6 py-4 shadow-nexus-card">
          <Loader2 className="h-5 w-5 animate-spin text-nexus-cyan" aria-hidden="true" />
          <div className="flex items-center gap-2 text-sm font-medium text-nexus-text">
            <ShieldCheck className="h-4 w-4 text-nexus-green" aria-hidden="true" />
            <span>Verifying Nexus clearance...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
