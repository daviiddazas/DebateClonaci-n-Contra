export interface Speaker {
  id: string;
  name: string;
  title: string;
  role: string;
  specialty: string;
  avatarColor: string;
  institutionRole: string;
  credentialId: string;
  university: string;
  diplomaText: string;
  signatureTitle: string;
  photoUrl?: string; // Optional image URL for credential photo/diploma scan
}

export interface EvidenceChartData {
  type: 'bar' | 'pie' | 'comparison' | 'timeline' | 'flow' | 'infographic';
  title: string;
  subtitle: string;
  dataPoints: Array<{ label: string; value: number | string; detail?: string; color?: string; highlighted?: boolean }>;
  notes: string;
  source: string;
}

export interface SubSlide {
  id: string;
  subIndex: number; // 1, 2, or 3
  parentMotiveId: number; // 1, 2, 3, or 4
  nodeLabel3D: string; // Compact text for 3D Sprite
  title: string;
  thesis: string;
  keySupportPoint: string;
  evidenceSummary: string;
  evidenceGraphicType: string;
  evidenceData: EvidenceChartData;
  scientificReference: string;
  mediaUrl?: string; // Optional custom image or video URL
  mediaType?: 'image' | 'video' | 'auto'; // Media display type
  isLocked: boolean; // For lock/save toggle
}

export interface MainMotive {
  id: number;
  number: string;
  shortTitle: string;
  fullTitle: string;
  speakerId: string;
  speakerName: string;
  speakerTitle: string;
  themeColor: string;
  accentColor: string;
  badge: string;
  description: string;
  threeDType: 'scnt_cell' | 'dna_blastocyst' | 'epigenetic_neural' | 'gyroscope_law';
  subSlides: SubSlide[];
}

export type ThemeMode = 'dark' | 'light';
export type ViewLayout = 'split' | 'cinema3d' | 'slidefocus';
