/**
 * Futuristic dark city skyline backdrop featuring the central Baxter Building tower.
 * Smoothly shifts subtle atmospheric glow based on the selected emergency.
 */
export default function SkylineBackdrop({ activeEmergency }) {
  const glowStyle = activeEmergency
    ? activeEmergency.glowGradient
    : 'radial-gradient(circle at 50% 20%, rgba(22, 217, 245, 0.14), rgba(155, 92, 255, 0.10) 42%, rgba(8, 13, 25, 0) 74%)';

  const towerAccent = activeEmergency ? activeEmergency.accentHex : '#16D9F5';

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Smooth ambient atmosphere shift */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{ background: glowStyle }}
      />

      {/* Subtle tactical grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #16D9F5 1px, transparent 1px), linear-gradient(to bottom, #16D9F5 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Futuristic City Skyline + Prominent Baxter Building Tower */}
      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 h-[320px] w-full sm:h-[380px] lg:h-[420px]"
        fill="none"
      >
        <defs>
          <linearGradient id="skylineFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111B31" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#080D19" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="baxterTower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3050" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#0D1527" stopOpacity="0.99" />
          </linearGradient>
        </defs>

        {/* Distant city silhouette */}
        <path
          d="M0 420V290H75V240H140V310H205V210H280V275H350V185H430V265H505V220H575V295H645V250H795V295H865V215H945V260H1020V190H1100V280H1175V225H1255V295H1330V245H1440V420H0Z"
          fill="#0B1324"
          fillOpacity="0.9"
        />

        {/* Mid-ground skyline buildings */}
        <rect x="40" y="255" width="76" height="165" rx="2" fill="url(#skylineFade)" />
        <rect x="145" y="220" width="90" height="200" rx="2" fill="url(#skylineFade)" />
        <rect x="270" y="265" width="84" height="155" rx="2" fill="url(#skylineFade)" />
        <rect x="385" y="195" width="98" height="225" rx="2" fill="url(#skylineFade)" />
        <rect x="515" y="245" width="92" height="175" rx="2" fill="url(#skylineFade)" />

        <rect x="835" y="245" width="92" height="175" rx="2" fill="url(#skylineFade)" />
        <rect x="955" y="195" width="100" height="225" rx="2" fill="url(#skylineFade)" />
        <rect x="1085" y="260" width="84" height="160" rx="2" fill="url(#skylineFade)" />
        <rect x="1195" y="220" width="94" height="200" rx="2" fill="url(#skylineFade)" />
        <rect x="1315" y="250" width="88" height="170" rx="2" fill="url(#skylineFade)" />

        {/* Central Prominent Baxter Building Tower */}
        <g>
          {/* Antenna Spire */}
          <line
            x1="720"
            y1="38"
            x2="720"
            y2="88"
            stroke={towerAccent}
            strokeWidth="2.5"
            className="transition-colors duration-500"
          />
          <circle
            cx="720"
            cy="36"
            r="4"
            fill={towerAccent}
            className="transition-colors duration-500"
          />

          {/* Upper Crown */}
          <path d="M684 115L720 82L756 115V145H684V115Z" fill="url(#baxterTower)" />
          {/* Main Tower Body */}
          <rect
            x="662"
            y="145"
            width="116"
            height="275"
            rx="3"
            fill="url(#baxterTower)"
            stroke={towerAccent}
            strokeOpacity="0.35"
            strokeWidth="1.2"
            className="transition-colors duration-500"
          />
          {/* Side Pylons */}
          <rect x="636" y="205" width="26" height="215" fill="#131E35" />
          <rect x="778" y="205" width="26" height="215" fill="#131E35" />

          {/* Glowing Vertical Spine */}
          <line
            x1="720"
            y1="145"
            x2="720"
            y2="415"
            stroke={towerAccent}
            strokeWidth="2"
            strokeOpacity="0.65"
            className="transition-colors duration-500"
          />

          {/* Horizontal Floor Beacons */}
          {[175, 210, 245, 280, 315, 350].map((yPos) => (
            <line
              key={yPos}
              x1="678"
              y1={yPos}
              x2="762"
              y2={yPos}
              stroke={towerAccent}
              strokeOpacity="0.28"
              strokeWidth="1.5"
              className="transition-colors duration-500"
            />
          ))}
        </g>

        {/* Subtle window lights */}
        <g fill="#16D9F5" fillOpacity="0.22">
          <rect x="165" y="242" width="12" height="4" rx="1" />
          <rect x="190" y="242" width="12" height="4" rx="1" />
          <rect x="408" y="220" width="16" height="4" rx="1" />
          <rect x="440" y="220" width="16" height="4" rx="1" />
          <rect x="978" y="218" width="16" height="4" rx="1" />
          <rect x="1010" y="218" width="16" height="4" rx="1" />
          <rect x="1220" y="244" width="14" height="4" rx="1" />
        </g>
      </svg>

      {/* Dark Scrim for high text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-nexus-void/75 via-nexus-void/55 to-nexus-void" />
    </div>
  );
}
