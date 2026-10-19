import mongoose, { Schema, Document } from 'mongoose';

// 1. User Schema
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  department?: string;
  avatar?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: [
      'SUPER_ADMIN', 'FOUNDER', 'ADMIN', 'RESEARCHER', 
      'FIELD_STAFF', 'FINANCE', 'CONTENT_EDITOR', 'HR_MANAGER', 
      'TRAINER', 'VIEWER'
    ],
    default: 'VIEWER'
  },
  department: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 2. Pillar Schema
export interface IPillar extends Document {
  code: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  impactAreas: string[];
}

const PillarSchema = new Schema<IPillar>({
  code: { type: String, required: true, unique: true }, // SAHAJA, SHRAMA, SPARSHA
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true },
  impactAreas: [{ type: String }]
});

// 3. Workstream Schema
export interface IWorkstream extends Document {
  code: string;
  name: string;
  pillar: string; // SAHAJA | SHRAMA | SPARSHA
  category: string;
  status: 'Planning' | 'Active' | 'Scaling' | 'Completed';
  location: string;
  district: string;
  kpi: string;
  projectOwner: string;
  impactSummary: string;
  beneficiariesCount: number;
}

const WorkstreamSchema = new Schema<IWorkstream>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  pillar: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true, enum: ['Planning', 'Active', 'Scaling', 'Completed'] },
  location: { type: String, required: true },
  district: { type: String, required: true },
  kpi: { type: String, required: true },
  projectOwner: { type: String, required: true },
  impactSummary: { type: String, required: true },
  beneficiariesCount: { type: Number, default: 0 }
});

// 4. Impact Metric Schema
export interface IImpactMetric extends Document {
  year: number;
  district: string;
  householdsReached: number;
  mangrovesRestoredHa: number;
  youthTrained: number;
  carbonAvoidedTons: number;
  renewableEnergyKwh: number;
  inlandWaterwaysKm: number;
}

const ImpactMetricSchema = new Schema<IImpactMetric>({
  year: { type: Number, required: true },
  district: { type: String, required: true },
  householdsReached: { type: Number, default: 0 },
  mangrovesRestoredHa: { type: Number, default: 0 },
  youthTrained: { type: Number, default: 0 },
  carbonAvoidedTons: { type: Number, default: 0 },
  renewableEnergyKwh: { type: Number, default: 0 },
  inlandWaterwaysKm: { type: Number, default: 0 }
});

// 5. Carbon Record Schema
export interface ICarbonRecord extends Document {
  projectId: string;
  projectName: string;
  district: string;
  year: number;
  tCO2eAvoided: number;
  verificationStatus: 'Verified' | 'Pending' | 'Projected';
  methodology: string;
  reportUrl?: string;
}

const CarbonRecordSchema = new Schema<ICarbonRecord>({
  projectId: { type: String, required: true },
  projectName: { type: String, required: true },
  district: { type: String, required: true },
  year: { type: Number, required: true },
  tCO2eAvoided: { type: Number, required: true },
  verificationStatus: { type: String, enum: ['Verified', 'Pending', 'Projected'], default: 'Pending' },
  methodology: { type: String, required: true },
  reportUrl: { type: String }
});

// 6. Mangrove Site Schema
export interface IMangroveSite extends Document {
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

const MangroveSiteSchema = new Schema<IMangroveSite>({
  siteName: { type: String, required: true },
  district: { type: String, required: true },
  hectares: { type: Number, required: true },
  plantingDate: { type: String, required: true },
  species: [{ type: String }],
  survivalRatePercent: { type: Number, required: true },
  volunteersCount: { type: Number, default: 0 },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  status: { type: String, default: 'Active Planting' },
  beforeImageUrl: { type: String, required: true },
  afterImageUrl: { type: String, required: true },
  timeline: [{
    step: { type: String },
    status: { type: String },
    date: { type: String }
  }]
});

// 7. Vessel & Telemetry Schema
export interface IVessel extends Document {
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

const VesselSchema = new Schema<IVessel>({
  vesselId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['Operational', 'Maintenance', 'Docked'], default: 'Operational' },
  solarCapacityKw: { type: Number, required: true },
  batteryCapacityKwh: { type: Number, required: true },
  totalEnergyGeneratedKwh: { type: Number, default: 0 },
  totalCo2AvoidedKg: { type: Number, default: 0 },
  totalDistanceKm: { type: Number, default: 0 },
  currentLat: { type: Number, required: true },
  currentLng: { type: Number, required: true },
  speedKnots: { type: Number, default: 0 },
  batteryPercent: { type: Number, default: 100 },
  solarInputKw: { type: Number, default: 0 },
  specifications: { type: Map, of: String },
  gallery: [{ type: String }]
});

// 8. Dataset Schema
export interface IDataset extends Document {
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

const DatasetSchema = new Schema<IDataset>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  doi: { type: String, required: true },
  authors: [{ type: String }],
  university: { type: String, required: true },
  year: { type: Number, required: true },
  datasetType: { type: String, required: true },
  accessLevel: { type: String, enum: ['PUBLIC', 'PARTNER_ONLY', 'RESTRICTED', 'EMBARGOED'], default: 'PUBLIC' },
  fileUrl: { type: String, required: true },
  fileSizeMb: { type: Number, required: true },
  downloadsCount: { type: Number, default: 0 },
  citation: { type: String, required: true }
});

// 9. Campaign & Donation Schema
export interface ICampaign extends Document {
  code: string;
  title: string;
  category: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  supportersCount: number;
  imageUrl: string;
}

const CampaignSchema = new Schema<ICampaign>({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  supportersCount: { type: Number, default: 0 },
  imageUrl: { type: String, required: true }
});

export interface IDonation extends Document {
  donorName: string;
  donorEmail: string;
  campaignCode: string;
  amount: number;
  currency: string;
  paymentStatus: 'COMPLETED' | 'PENDING' | 'FAILED';
  razorpayPaymentId?: string;
  receiptNumber: string;
  createdAt: Date;
}

const DonationSchema = new Schema<IDonation>({
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  campaignCode: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentStatus: { type: String, enum: ['COMPLETED', 'PENDING', 'FAILED'], default: 'COMPLETED' },
  razorpayPaymentId: { type: String },
  receiptNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 10. Trainee Schema
export interface ITrainee extends Document {
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

const TraineeSchema = new Schema<ITrainee>({
  traineeId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  batchCode: { type: String, required: true },
  district: { type: String, required: true },
  courseName: { type: String, required: true },
  attendancePercent: { type: Number, default: 100 },
  completionStatus: { type: String, enum: ['Enrolled', 'Graduated', 'Certified', 'Placed'], default: 'Certified' },
  certificateNumber: { type: String },
  qrVerificationUrl: { type: String }
});

// 11. Task Schema (Project Management)
export interface ITask extends Document {
  taskId: string;
  title: string;
  description: string;
  workstreamCode: string;
  boardName: string; // e.g. 'Mangrove Operations', 'Solar Mobility', 'Clean Coastal'
  status: 'Planning' | 'In Progress' | 'Under Review' | 'Completed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assigneeName: string;
  assigneeAvatar?: string;
  subtasks: { id: string; title: string; completed: boolean }[];
  dueDate: string;
}

const TaskSchema = new Schema<ITask>({
  taskId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  workstreamCode: { type: String, required: true },
  boardName: { type: String, default: 'General Operations' },
  status: { type: String, enum: ['Planning', 'In Progress', 'Under Review', 'Completed'], default: 'In Progress' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  assigneeName: { type: String, required: true },
  assigneeAvatar: { type: String },
  subtasks: [{
    id: { type: String },
    title: { type: String },
    completed: { type: Boolean, default: false }
  }],
  dueDate: { type: String, required: true }
});

// 12. Audit Log Schema
export interface IAuditLog extends Document {
  userEmail: string;
  userRole: string;
  action: string;
  resource: string;
  ipAddress: string;
  details: string;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  userEmail: { type: String, required: true },
  userRole: { type: String, required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  ipAddress: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
export const PillarModel = mongoose.model<IPillar>('Pillar', PillarSchema);
export const WorkstreamModel = mongoose.model<IWorkstream>('Workstream', WorkstreamSchema);
export const ImpactMetricModel = mongoose.model<IImpactMetric>('ImpactMetric', ImpactMetricSchema);
export const CarbonRecordModel = mongoose.model<ICarbonRecord>('CarbonRecord', CarbonRecordSchema);
export const MangroveSiteModel = mongoose.model<IMangroveSite>('MangroveSite', MangroveSiteSchema);
export const VesselModel = mongoose.model<IVessel>('Vessel', VesselSchema);
export const DatasetModel = mongoose.model<IDataset>('Dataset', DatasetSchema);
export const CampaignModel = mongoose.model<ICampaign>('Campaign', CampaignSchema);
export const DonationModel = mongoose.model<IDonation>('Donation', DonationSchema);
export const TraineeModel = mongoose.model<ITrainee>('Trainee', TraineeSchema);
export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
export const AuditLogModel = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
