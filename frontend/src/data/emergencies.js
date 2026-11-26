export const EMERGENCIES = [
  {
    id: 'fire',
    title: 'FIRE EMERGENCY',
    subtitle: 'Contain the Blaze',
    iconName: 'Flame',
    accentHex: '#FF7139',
    accentBadgeClass: 'bg-[#FF7139]/15 text-[#FF7139] border-[#FF7139]/40',
    activeCardClass:
      'border-[#FF7139] bg-[#17243B] shadow-nexus-orange ring-1 ring-[#FF7139]/50',
    iconBoxClass: 'bg-[#FF7139]/15 text-[#FF7139] border-[#FF7139]/30',
    glowGradient:
      'radial-gradient(circle at 50% 22%, rgba(255, 113, 57, 0.20), rgba(17, 27, 49, 0.45) 48%, rgba(8, 13, 25, 0) 75%)',
    protocolCode: 'NEXUS-01 // THERMAL RESPONSE',
    summary:
      'Deploy heat-resistant containment units, establish aerial evacuation corridors, and protect nearby civilian blocks.',
    threatLevel: 'High',
    priority: 'Critical',
    recommendedSquad: '2 Heroes',
    requiredSkills: ['Thermal Containment', 'Aerial Evacuation', 'Hazard Suppression'],
  },
  {
    id: 'flood',
    title: 'FLOOD RESCUE',
    subtitle: 'Save Lives',
    iconName: 'Waves',
    accentHex: '#16D9F5',
    accentBadgeClass: 'bg-[#16D9F5]/15 text-[#16D9F5] border-[#16D9F5]/40',
    activeCardClass:
      'border-[#16D9F5] bg-[#17243B] shadow-nexus-cyan ring-1 ring-[#16D9F5]/50',
    iconBoxClass: 'bg-[#16D9F5]/15 text-[#16D9F5] border-[#16D9F5]/30',
    glowGradient:
      'radial-gradient(circle at 50% 22%, rgba(22, 217, 245, 0.18), rgba(17, 27, 49, 0.45) 48%, rgba(8, 13, 25, 0) 75%)',
    protocolCode: 'NEXUS-02 // AQUATIC EXTRACTION',
    summary:
      'Coordinate rapid water-level extraction, stabilize flood barriers, and guide stranded districts to high-ground shelters.',
    threatLevel: 'High',
    priority: 'Urgent',
    recommendedSquad: '2 Heroes',
    requiredSkills: ['Aquatic Rescue', 'Structural Reinforcement', 'Civilian Extraction'],
  },
  {
    id: 'attack',
    title: 'CITY UNDER ATTACK',
    subtitle: 'Defend the City',
    iconName: 'Shield',
    accentHex: '#9B5CFF',
    accentBadgeClass: 'bg-[#9B5CFF]/15 text-[#9B5CFF] border-[#9B5CFF]/40',
    activeCardClass:
      'border-[#9B5CFF] bg-[#17243B] shadow-nexus-violet ring-1 ring-[#9B5CFF]/50',
    iconBoxClass: 'bg-[#9B5CFF]/15 text-[#9B5CFF] border-[#9B5CFF]/30',
    glowGradient:
      'radial-gradient(circle at 50% 22%, rgba(155, 92, 255, 0.22), rgba(17, 27, 49, 0.45) 48%, rgba(8, 13, 25, 0) 75%)',
    protocolCode: 'NEXUS-03 // PERIMETER DEFENSE',
    summary:
      'Raise sector defense shields, neutralize hostile threats at the perimeter, and maintain command synchronization.',
    threatLevel: 'Omega',
    priority: 'Critical',
    recommendedSquad: '3–4 Heroes',
    requiredSkills: ['Tactical Defense', 'Heavy Combat', 'Perimeter Shielding'],
  },
  {
    id: 'medical',
    title: 'MEDICAL EMERGENCY',
    subtitle: 'Provide Aid',
    iconName: 'Cross',
    accentHex: '#32C98A',
    accentBadgeClass: 'bg-[#32C98A]/15 text-[#32C98A] border-[#32C98A]/40',
    activeCardClass:
      'border-[#32C98A] bg-[#17243B] shadow-nexus-green ring-1 ring-[#32C98A]/50',
    iconBoxClass: 'bg-[#32C98A]/15 text-[#32C98A] border-[#32C98A]/30',
    glowGradient:
      'radial-gradient(circle at 50% 22%, rgba(50, 201, 138, 0.18), rgba(17, 27, 49, 0.45) 48%, rgba(8, 13, 25, 0) 75%)',
    protocolCode: 'NEXUS-04 // RAPID BIO-AID',
    summary:
      'Dispatch field triage specialists, secure clean medical transit lanes, and support regional hospital networks.',
    threatLevel: 'Moderate',
    priority: 'Urgent',
    recommendedSquad: '2 Heroes',
    requiredSkills: ['Field Triage', 'Rapid Bio-Aid', 'Safe Transport'],
  },
  {
    id: 'tech',
    title: 'TECH CRISIS',
    subtitle: 'Stabilize Systems',
    iconName: 'Atom',
    accentHex: '#16D9F5',
    accentBadgeClass: 'bg-[#16D9F5]/15 text-[#16D9F5] border-[#16D9F5]/40',
    activeCardClass:
      'border-[#16D9F5] bg-[#17243B] shadow-nexus-cyan ring-1 ring-[#16D9F5]/50',
    iconBoxClass: 'bg-[#16D9F5]/15 text-[#16D9F5] border-[#16D9F5]/30',
    glowGradient:
      'radial-gradient(circle at 50% 22%, rgba(22, 217, 245, 0.22), rgba(155, 92, 255, 0.16) 45%, rgba(8, 13, 25, 0) 76%)',
    protocolCode: 'NEXUS-05 // GRID STABILIZATION',
    summary:
      'Isolate failing power nodes, counter cyber intrusions, and restore Baxter Nexus communications across the city.',
    threatLevel: 'High',
    priority: 'Urgent',
    recommendedSquad: '2 Heroes',
    requiredSkills: ['Grid Stabilization', 'Cyber Defense', 'Energy Containment'],
  },
];

export function getEmergencyById(id) {
  return EMERGENCIES.find((item) => item.id === id) || null;
}
