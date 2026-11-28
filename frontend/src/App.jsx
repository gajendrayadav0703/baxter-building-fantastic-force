import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommandShell from './components/layout/CommandShell';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NexusSectionPage from './pages/NexusSectionPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CommandShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/hero-network"
            element={
              <ProtectedRoute>
                <NexusSectionPage
                  title="Hero Network"
                  subtitle="Manage hero profiles, abilities, expertise levels, availability windows, and active workload."
                  moduleStage="Next Feature Module"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mission-control"
            element={
              <ProtectedRoute>
                <NexusSectionPage
                  title="Mission Control"
                  subtitle="Create and edit missions, assign heroes via the Squad Sync Engine, prevent double-bookings, and track live status."
                  moduleStage="Next Feature Module"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/threat-intelligence"
            element={
              <ProtectedRoute>
                <NexusSectionPage
                  title="Threat Intelligence"
                  subtitle="Live mission statistics, success rates, threat distribution, and workload analytics powered by MongoDB."
                  moduleStage="Analytics Module"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vanguard-leaderboard"
            element={
              <ProtectedRoute>
                <NexusSectionPage
                  title="Vanguard Leaderboard"
                  subtitle="Hero performance rankings, mission success metrics, and historical achievements."
                  moduleStage="Performance Module"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signal-hub"
            element={
              <ProtectedRoute>
                <NexusSectionPage
                  title="Signal Hub"
                  subtitle="Real-time operational notifications for hero assignments, mission updates, deadlines, and cancellations."
                  moduleStage="Notifications Module"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mission-archives"
            element={
              <ProtectedRoute>
                <NexusSectionPage
                  title="Mission Archives"
                  subtitle="Historical archive of completed, aborted, and past operations."
                  moduleStage="Archives Module"
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </CommandShell>
      </AuthProvider>
    </BrowserRouter>
  );
}
