export type ThemeMode = 'dark' | 'light';

export interface EquipmentItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'Strength Training' | 'Performance Training' | 'Free Weight Training' | 'Endurance Training' | 'Functional Training';
  description: string;
  features: string[];
  specs: {
    material: string;
    loadCapacity: string;
    footprint: string;
    sensorTelemetry: string;
  };
  highlightStat: string;
  statLabel: string;
}

export interface TrainingMode {
  id: 'build' | 'burn' | 'perform';
  title: string;
  subtitle: string;
  focus: string;
  description: string;
  biometrics: {
    intensity: number; // 0-100
    hypertrophy: number;
    endurance: number;
    agility: number;
  };
  schedule: string;
  suitableFor: string;
  tag: string;
  accentGradient: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  image: string;
  certifications: string[];
  stats: {
    clientsTrained: string;
    rating: string;
    specialtyFocus: string;
  };
  social: {
    instagram: string;
    linkedin?: string;
  };
}

export interface FacilityZone {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  sqft: string;
  features: string[];
  equipmentSummary: string;
  climate: string;
  coordinates: { x: number; y: number; z: number }; // 3D tour focus coordinates
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  tagline: string;
  popular?: boolean;
  features: string[];
  exclusiveBonus: string;
  accent: 'amber' | 'cyan' | 'rose';
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredMode: 'build' | 'burn' | 'perform' | 'undecided';
  preferredTrainer?: string;
  selectedPlan?: string;
  visitDate: string;
  visitSlot: string;
  notes?: string;
}
