import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommandShell from './components/layout/CommandShell';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NexusSectionPage from './pages/NexusSectionPage';

export default function App() {
  return (
    <BrowserRouter>
      <CommandShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/hero-network"
            element={
              <NexusSectionPage
                title="Hero Network"
                subtitle="Manage hero profiles, abilities, expertise levels, availability windows, and active workload."
                moduleStage="Next Feature Module"
              />
            }
          />
          <Route
            path="/mission-control"
            element={
              <NexusSectionPage
                title="Mission Control"
                subtitle="Create and edit missions, assign heroes via the Squad Sync Engine, prevent double-bookings, and track live status."
                moduleStage="Next Feature Module"
              />
            }
          />
          <Route
            path="/threat-intelligence"
            element={
              <NexusSectionPage
                title="Threat Intelligence"
                subtitle="Live mission statistics, success rates, threat distribution, and workload analytics powered by MongoDB."
                moduleStage="Analytics Module"
              />
            }
          />
          <Route
            path="/vanguard-leaderboard"
            element={
              <NexusSectionPage
                title="Vanguard Leaderboard"
                subtitle="Hero performance rankings, mission success metrics, and historical achievements."
                moduleStage="Performance Module"
              />
            }
          />
          <Route
            path="/signal-hub"
            element={
              <NexusSectionPage
                title="Signal Hub"
                subtitle="Real-time operational notifications for hero assignments, mission updates, deadlines, and cancellations."
                moduleStage="Notifications Module"
              />
            }
          />
          <Route
            path="/mission-archives"
            element={
              <NexusSectionPage
                title="Mission Archives"
                subtitle="Historical archive of completed, aborted, and past operations."
                moduleStage="Archives Module"
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={
              <NexusSectionPage
                title="Commander Registration"
                subtitle="Create a new Commander or Operator account to access Nexus Command Center."
                moduleStage="Module 1 · Auth"
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CommandShell>
    </BrowserRouter>
  );
}
