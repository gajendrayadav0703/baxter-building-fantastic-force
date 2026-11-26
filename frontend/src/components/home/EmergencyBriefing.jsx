import { ArrowRight, RotateCcw, ShieldAlert, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Lightweight, non-graphic SVG illustrations tailored to each emergency type.
 * All motion classes are automatically disabled under prefers-reduced-motion.
 */
function EmergencySceneIllustration({ emergencyId }) {
  if (emergencyId === 'fire') {
    return (
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        role="img"
        aria-label="Dark city skyline with burning building, rising smoke, and restrained flames"
      >
        <rect width="320" height="200" rx="14" fill="#0C1425" />
        <ellipse cx="160" cy="174" rx="118" ry="40" fill="#FF7139" fillOpacity="0.18" />

        {/* Surrounding dark skyline buildings */}
        <rect x="24" y="98" width="42" height="90" rx="2" fill="#131E36" />
        <rect x="76" y="76" width="40" height="112" rx="2" fill="#16233E" />
        <rect x="206" y="82" width="42" height="106" rx="2" fill="#16233E" />
        <rect x="256" y="102" width="38" height="86" rx="2" fill="#131E36" />

        {/* Central affected tower */}
        <rect
          x="128"
          y="68"
          width="64"
          height="120"
          rx="3"
          fill="#1B2844"
          stroke="#FF7139"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <rect x="140" y="84" width="14" height="8" rx="1" fill="#FF7139" fillOpacity="0.72" />
        <rect x="164" y="84" width="14" height="8" rx="1" fill="#FF7139" fillOpacity="0.5" />
        <rect x="140" y="102" width="14" height="8" rx="1" fill="#FF9F43" fillOpacity="0.62" />
        <rect x="164" y="102" width="14" height="8" rx="1" fill="#FF7139" fillOpacity="0.7" />
        <rect x="140" y="120" width="14" height="8" rx="1" fill="#16D9F5" fillOpacity="0.28" />
        <rect x="164" y="120" width="14" height="8" rx="1" fill="#16D9F5" fillOpacity="0.28" />

        {/* Rising smoke wisps */}
        <g className="animate-nexus-smoke">
          <circle cx="148" cy="40" r="10" fill="#A9B5C9" fillOpacity="0.25" />
          <circle cx="166" cy="27" r="13" fill="#A9B5C9" fillOpacity="0.20" />
          <circle cx="156" cy="15" r="8" fill="#A9B5C9" fillOpacity="0.15" />
        </g>

        {/* Moving restrained flames */}
        <g className="animate-nexus-flame">
          <path
            d="M140 68C140 54 150 47 155 38C160 47 170 54 170 68H140Z"
            fill="#FF7139"
            fillOpacity="0.92"
          />
        </g>
        <g className="animate-nexus-flame-alt">
          <path
            d="M153 68C153 56 161 49 166 42C171 49 180 56 180 68H153Z"
            fill="#FF5232"
            fillOpacity="0.78"
          />
          <path
            d="M150 68C150 60 156 54 160 49C164 54 169 60 169 68H150Z"
            fill="#FFB347"
            fillOpacity="0.92"
          />
        </g>
      </svg>
    );
  }

  if (emergencyId === 'flood') {
    return (
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        role="img"
        aria-label="Flood rescue flowing water and gentle wave motion illustration"
      >
        <rect width="320" height="200" rx="14" fill="#0C1425" />
        <ellipse cx="160" cy="154" rx="132" ry="44" fill="#16D9F5" fillOpacity="0.16" />

        {/* City piers */}
        <rect x="65" y="76" width="44" height="100" rx="2" fill="#16233E" />
        <rect x="138" y="54" width="44" height="122" rx="2" fill="#1B2B4B" stroke="#16D9F5" strokeOpacity="0.45" />
        <rect x="210" y="84" width="44" height="92" rx="2" fill="#16233E" />

        {/* Rescue beacon */}
        <circle
          cx="160"
          cy="46"
          r="15"
          stroke="#16D9F5"
          strokeOpacity="0.65"
          strokeWidth="1.5"
          className="animate-nexus-pulse"
        />
        <circle cx="160" cy="46" r="5" fill="#16D9F5" />

        {/* Gentle dual-layer flowing waves */}
        <g className="animate-nexus-wave-slow">
          <path
            d="M-20 136C25 126 70 146 115 136C160 126 205 146 250 136C295 126 320 138 340 136V200H-20V136Z"
            fill="#16D9F5"
            fillOpacity="0.18"
          />
        </g>
        <g className="animate-nexus-wave">
          <path
            d="M-20 156C30 146 80 166 130 156C180 146 230 166 280 156C310 150 328 154 340 156V200H-20V156Z"
            fill="#16D9F5"
            fillOpacity="0.34"
          />
        </g>
      </svg>
    );
  }

  if (emergencyId === 'attack') {
    return (
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        role="img"
        aria-label="City perimeter animated violet shield illustration"
      >
        <rect width="320" height="200" rx="14" fill="#0C1425" />
        <ellipse cx="160" cy="142" rx="126" ry="62" fill="#9B5CFF" fillOpacity="0.15" />

        {/* Protected skyline */}
        <rect x="74" y="102" width="38" height="76" rx="2" fill="#16233E" />
        <rect x="138" y="72" width="44" height="106" rx="2" fill="#1D2B4C" stroke="#9B5CFF" strokeOpacity="0.55" />
        <rect x="208" y="96" width="38" height="82" rx="2" fill="#16233E" />

        {/* Animated violet defensive shield */}
        <path
          d="M42 178C42 100 95 40 160 40C225 40 278 100 278 178"
          stroke="#9B5CFF"
          strokeWidth="2.5"
          strokeDasharray="12 8"
          className="animate-nexus-shield"
        />
        <path
          d="M64 178C64 115 107 64 160 64C213 64 256 115 256 178"
          stroke="#16D9F5"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          className="animate-nexus-pulse"
        />
      </svg>
    );
  }

  if (emergencyId === 'medical') {
    return (
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        role="img"
        aria-label="Medical emergency green pulse and medical indicator illustration"
      >
        <rect width="320" height="200" rx="14" fill="#0C1425" />
        <circle
          cx="160"
          cy="94"
          r="62"
          fill="#32C98A"
          fillOpacity="0.12"
          className="animate-nexus-pulse"
        />
        <circle
          cx="160"
          cy="94"
          r="42"
          stroke="#32C98A"
          strokeOpacity="0.55"
          strokeWidth="1.75"
          className="animate-nexus-pulse"
        />

        {/* Medical cross indicator */}
        <rect x="150" y="66" width="20" height="56" rx="4" fill="#32C98A" fillOpacity="0.92" />
        <rect x="132" y="84" width="56" height="20" rx="4" fill="#32C98A" fillOpacity="0.92" />

        {/* Animated bio-telemetry ECG line */}
        <path
          d="M24 164H112L126 146L142 176L158 136L174 170L188 158H296"
          stroke="#32C98A"
          strokeWidth="2.25"
          strokeDasharray="14 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-nexus-ecg"
        />
      </svg>
    );
  }

  // Tech Crisis
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full"
      role="img"
      aria-label="Tech crisis animated cyan circuit lines illustration"
    >
      <rect width="320" height="200" rx="14" fill="#0C1425" />
      <circle
        cx="160"
        cy="100"
        r="56"
        stroke="#16D9F5"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        className="animate-nexus-pulse"
      />
      <circle cx="160" cy="100" r="34" stroke="#9B5CFF" strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx="160" cy="100" r="12" fill="#16D9F5" fillOpacity="0.9" />

      {/* Animated cyan circuit lines */}
      <g className="animate-nexus-circuit" strokeDasharray="12 6" strokeLinecap="round">
        <path d="M34 100H104M216 100H286" stroke="#16D9F5" strokeWidth="2.2" />
        <path d="M160 18V44M160 156V182" stroke="#16D9F5" strokeWidth="2.2" />
        <path d="M68 48L114 78M206 122L252 152" stroke="#9B5CFF" strokeWidth="1.8" />
        <path d="M252 48L206 78M114 122L68 152" stroke="#16D9F5" strokeWidth="1.8" />
      </g>

      {/* Circuit endpoint nodes */}
      <circle cx="34" cy="100" r="3.5" fill="#16D9F5" />
      <circle cx="286" cy="100" r="3.5" fill="#16D9F5" />
      <circle cx="160" cy="18" r="3.5" fill="#16D9F5" />
      <circle cx="160" cy="182" r="3.5" fill="#16D9F5" />
    </svg>
  );
}

/**
 * Displays the selected emergency scene, protocol requirements, and Create Mission CTA.
 */
export default function EmergencyBriefing({ emergency, onClear }) {
  const navigate = useNavigate();

  if (!emergency) {
    return (
      <section
        aria-live="polite"
        className="mt-8 rounded-2xl border border-dashed border-white/20 bg-nexus-navy/80 px-6 py-6 text-center backdrop-blur-sm"
      >
        <p className="text-sm font-medium text-nexus-muted sm:text-base">
          Choose one of the five emergency cards above to preview mission requirements and launch response protocols.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-live="polite"
      className="mt-8 overflow-hidden rounded-2xl border bg-nexus-card/95 p-5 shadow-nexus-card backdrop-blur-md transition-all duration-300 sm:p-8"
      style={{ borderColor: `${emergency.accentHex}66` }}
    >
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Emergency Visual Scene */}
        <div className="lg:col-span-5">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-nexus-void">
            <EmergencySceneIllustration emergencyId={emergency.id} />
          </div>
        </div>

        {/* Mission Requirements & Create Mission Action */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={[
                'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider',
                emergency.accentBadgeClass,
              ].join(' ')}
            >
              {emergency.protocolCode}
            </span>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-nexus-muted transition-colors hover:border-white/25 hover:bg-white/5 hover:text-nexus-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset Selection
            </button>
          </div>

          <h3 className="mt-4 text-xl font-bold text-nexus-text sm:text-2xl">
            {emergency.title} — Mission Requirements
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-nexus-muted sm:text-base">
            {emergency.summary}
          </p>

          {/* Operational Metadata */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-nexus-navy/85 px-4 py-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-nexus-muted">
                <ShieldAlert className="h-3.5 w-3.5 text-nexus-cyan" aria-hidden="true" />
                Threat Level
              </div>
              <p className="mt-1 text-sm font-semibold text-nexus-text">{emergency.threatLevel}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-nexus-navy/85 px-4 py-3">
              <div className="text-xs font-medium text-nexus-muted">Response Priority</div>
              <p className="mt-1 text-sm font-semibold text-nexus-text">{emergency.priority}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-nexus-navy/85 px-4 py-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-nexus-muted">
                <Users className="h-3.5 w-3.5 text-nexus-violet" aria-hidden="true" />
                Suggested Squad
              </div>
              <p className="mt-1 text-sm font-semibold text-nexus-text">
                {emergency.recommendedSquad}
              </p>
            </div>
          </div>

          {/* Required Skills */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-nexus-muted">
              Required Capabilities
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {emergency.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/15 bg-nexus-navy px-3 py-1.5 text-xs font-medium text-nexus-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => navigate(`/mission-control?emergency=${emergency.id}`)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-nexus-cyan px-6 py-3 text-sm font-bold text-nexus-void shadow-nexus-cyan transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-card sm:w-auto"
            >
              Create Mission
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/hero-network')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-nexus-navy px-5 py-3 text-sm font-semibold text-nexus-text transition-colors hover:border-nexus-violet/55 hover:text-nexus-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-card sm:w-auto"
            >
              Inspect Hero Network
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
