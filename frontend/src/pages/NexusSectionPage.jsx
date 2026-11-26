import { ArrowLeft, Layers } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getEmergencyById } from '../data/emergencies';

/**
 * Clean Stage-1 module placeholder ensuring every Nexus navigation link works
 * without displaying fake or hardcoded production data.
 */
export default function NexusSectionPage({ title, subtitle, moduleStage }) {
  const [searchParams] = useSearchParams();
  const emergencyParam = searchParams.get('emergency');
  const preselectedEmergency = getEmergencyById(emergencyParam);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-nexus-cyan transition-colors hover:text-nexus-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Nexus Command Center
      </Link>

      <div className="mt-6 rounded-2xl border border-white/10 bg-nexus-card p-6 shadow-nexus-card sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-nexus-violet/40 bg-nexus-violet/15 text-nexus-violet">
            <Layers className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-nexus-cyan">
              {moduleStage}
            </span>
            <h1 className="text-2xl font-bold text-nexus-text">{title}</h1>
          </div>
        </div>

        <p className="mt-4 text-base leading-relaxed text-nexus-muted">{subtitle}</p>

        {preselectedEmergency && (
          <div
            className="mt-6 rounded-xl border bg-nexus-navy/85 p-5"
            style={{ borderColor: `${preselectedEmergency.accentHex}55` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-nexus-cyan">
              Emergency Protocol Pre-Selected From Homepage
            </p>
            <p className="mt-1 text-lg font-bold text-nexus-text">
              {preselectedEmergency.title} — {preselectedEmergency.subtitle}
            </p>
            <p className="mt-1 text-sm text-nexus-muted">
              Suggested Priority: {preselectedEmergency.priority} · Threat Level:{' '}
              {preselectedEmergency.threatLevel} · Required Skills:{' '}
              {preselectedEmergency.requiredSkills.join(', ')}
            </p>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-nexus-navy/60 p-5">
          <p className="text-sm text-nexus-muted">
            This module is scheduled for the next implementation stage and will connect directly to the live MongoDB backend (no placeholder/fake operational data is shown).
          </p>
        </div>
      </div>
    </div>
  );
}
