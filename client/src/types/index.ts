export interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'FOUNDER' | 'ADMIN' | 'RESEARCHER' | 'FIELD_STAFF' | 'FINANCE' | 'CONTENT_EDITOR' | 'HR_MANAGER' | 'TRAINER' | 'VIEWER';
  department?: string;
  avatar?: string;
}

export interface Pillar {
  _id: string;
  code: 'SAHAJA' | 'SHRAMA' | 'SPARSHA';
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  impactAreas: string[];
}

export interface Workstream {
  _id: string;
  code: string;
  name: string;
  pillar: 'SAHAJA' | 'SHRAMA' | 'SPARSHA';
  category: string;
  status: 'Planning' | 'Active' | 'Scaling' | 'Completed';
  location: string;
  district: string;
  kpi: string;
  projectOwner: string;
  impactSummary: string;
  beneficiariesCount: number;
}

export interface ImpactSummary {
  householdsReached: number;
  mangrovesRestoredHa: number;
  youthTrained: number;
  carbonAvoidedTons: number;
  renewableEnergyKwh: number;
  inlandWaterwaysKm: number;
}

export interface CarbonRecord {
  _id: string;
  projectId: string;
  projectName: string;
  district: string;
  year: number;
  tCO2eAvoided: number;
  verificationStatus: 'Verified' | 'Pending' | 'Projected';
  methodology: string;
  reportUrl?: string;
}

export interface MangroveSite {
  _id: string;
  siteName: string;
  district: string;
  hectares: number;
  plantingDate: string;
  species: string[];
  survivalRatePercent: number;
  volunteersCount: number;
  lat: number;
  lng: number;
  status: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  timeline: { step: string; status: 'completed' | 'in_progress' | 'upcoming'; date: string }[];
}

export interface Vessel {
  _id: string;
  vesselId: string;
  name: string;
  type: string;
  status: 'Operational' | 'Maintenance' | 'Docked';
  solarCapacityKw: number;
  batteryCapacityKwh: number;
  totalEnergyGeneratedKwh: number;
  totalCo2AvoidedKg: number;
  totalDistanceKm: number;
  currentLat: number;
  currentLng: number;
  speedKnots: number;
  batteryPercent: number;
  solarInputKw: number;
  specifications: Record<string, string>;
  gallery: string[];
}

export interface Dataset {
  _id: string;
  title: string;
  description: string;
  doi: string;
  authors: string[];
  university: string;
  year: number;
  datasetType: string;
  accessLevel: 'PUBLIC' | 'PARTNER_ONLY' | 'RESTRICTED' | 'EMBARGOED';
  fileUrl: string;
  fileSizeMb: number;
  downloadsCount: number;
  citation: string;
}

export interface Campaign {
  _id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  supportersCount: number;
  imageUrl: string;
}

export interface Trainee {
  _id: string;
  traineeId: string;
  fullName: string;
  email: string;
  phone: string;
  batchCode: string;
  district: string;
  courseName: string;
  attendancePercent: number;
  completionStatus: 'Enrolled' | 'Graduated' | 'Certified' | 'Placed';
  certificateNumber?: string;
  qrVerificationUrl?: string;
}

export interface TaskItem {
  _id: string;
  taskId: string;
  title: string;
  description: string;
  workstreamCode: string;
  boardName: string;
  status: 'Planning' | 'In Progress' | 'Under Review' | 'Completed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assigneeName: string;
  assigneeAvatar?: string;
  subtasks: { id: string; title: string; completed: boolean }[];
  dueDate: string;
}

export interface AuditLogItem {
  _id: string;
  userEmail: string;
  userRole: string;
  action: string;
  resource: string;
  ipAddress: string;
  details: string;
  timestamp: string;
}
