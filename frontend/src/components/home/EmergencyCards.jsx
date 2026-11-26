import { useRef } from 'react';
import { Atom, CheckCircle2, Cross, Flame, Shield, Waves } from 'lucide-react';
import { EMERGENCIES } from '../../data/emergencies';

const ICON_MAP = {
  Flame,
  Waves,
  Shield,
  Cross,
  Atom,
};

/**
 * Interactive grid of five emergency response cards.
 * Keeps unselected cards clearly readable while spotlighting the active card,
 * and supports Tab + Arrow-key navigation.
 */
export default function EmergencyCards({ selectedId, onSelect }) {
  const hasSelection = Boolean(selectedId);
  const buttonRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    const total = EMERGENCIES.length;
    let nextIndex = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % total;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + total) % total;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = total - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section aria-label="Emergency type selection" className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {EMERGENCIES.map((emergency, index) => {
          const IconComponent = ICON_MAP[emergency.iconName] || Shield;
          const isSelected = selectedId === emergency.id;
          const isDimmed = hasSelection && !isSelected;

          return (
            <button
              key={emergency.id}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${emergency.title}: ${emergency.subtitle}`}
              onClick={() => onSelect(isSelected ? null : emergency.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={[
                'group relative flex min-h-[148px] flex-col items-start justify-between rounded-2xl border p-5 text-left',
                'transition-all duration-300 ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-void',
                isSelected
                  ? `${emergency.activeCardClass} -translate-y-1 ring-2`
                  : 'border-white/15 bg-nexus-card/95 shadow-nexus-card hover:-translate-y-0.5 hover:border-white/30 hover:bg-nexus-card',
                isDimmed ? 'opacity-85 hover:opacity-100' : 'opacity-100',
              ].join(' ')}
            >
              <div className="flex w-full items-start justify-between gap-3">
                <div
                  className={[
                    'flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105',
                    emergency.iconBoxClass,
                  ].join(' ')}
                >
                  <IconComponent className="h-6 w-6" aria-hidden="true" />
                </div>

                {isSelected && (
                  <span
                    className={[
                      'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold',
                      emergency.accentBadgeClass,
                    ].join(' ')}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Selected
                  </span>
                )}
              </div>

              <div className="mt-5">
                <h2 className="text-base font-bold tracking-wide text-nexus-text">
                  {emergency.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-nexus-muted">
                  {emergency.subtitle}
                </p>
              </div>

              {/* Subtle bottom accent bar */}
              <div
                className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: isSelected ? '100%' : '32%',
                    backgroundColor: emergency.accentHex,
                    opacity: isSelected ? 1 : 0.78,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
