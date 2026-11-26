import { useState } from 'react';
import EmergencyBriefing from '../components/home/EmergencyBriefing';
import EmergencyCards from '../components/home/EmergencyCards';
import SkylineBackdrop from '../components/home/SkylineBackdrop';
import { getEmergencyById } from '../data/emergencies';

/**
 * Stage 1 Homepage: Nexus Command Center.
 */
export default function HomePage() {
  const [selectedEmergencyId, setSelectedEmergencyId] = useState(null);
  const activeEmergency = getEmergencyById(selectedEmergencyId);

  return (
    <div className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden bg-nexus-void">
      <SkylineBackdrop activeEmergency={activeEmergency} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <section aria-labelledby="nexus-hero-heading" className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-nexus-cyan/35 bg-nexus-navy/90 px-4 py-1.5 text-xs font-semibold tracking-widest text-nexus-cyan backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-nexus-green" aria-hidden="true" />
            NEXUS COMMAND CENTER
          </div>

          <h1
            id="nexus-hero-heading"
            className="mt-5 text-2xl font-extrabold tracking-tight text-nexus-text sm:mt-6 sm:text-4xl lg:text-[3.25rem] lg:leading-[1.12]"
          >
            EVERY CRISIS HAS A SOLUTION.
          </h1>

          <p className="mt-3 text-lg font-bold tracking-wide text-nexus-cyan sm:text-2xl">
            WE&apos;RE READY TO RESPOND.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-nexus-muted sm:text-lg">
            Select an emergency type to begin a mission and bring the Fantastic Force into action.
          </p>
        </section>

        {/* Five Interactive Emergency Cards */}
        <div className="mt-8 sm:mt-12">
          <EmergencyCards
            selectedId={selectedEmergencyId}
            onSelect={setSelectedEmergencyId}
          />
        </div>

        {/* Dynamic Emergency Selection Transition & Mission Briefing */}
        <EmergencyBriefing
          emergency={activeEmergency}
          onClear={() => setSelectedEmergencyId(null)}
        />

        {/* Identity Footer */}
        <footer className="mt-10 border-t border-white/10 pt-6 text-center sm:mt-12">
          <p className="text-xs font-semibold leading-relaxed tracking-widest text-nexus-muted">
            BAXTER BUILDING — FANTASTIC FORCE &nbsp;·&nbsp;{' '}
            <span className="text-nexus-cyan">
              NEXUS PROTOCOL: EVERY CRISIS HAS A RESPONSE.
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
