import { Router } from 'express';
import * as authCtrl from '../controllers/authController';
import * as impactCtrl from '../controllers/impactController';
import * as workstreamCtrl from '../controllers/workstreamController';
import * as mangroveCtrl from '../controllers/mangroveController';
import * as vesselCtrl from '../controllers/vesselController';
import * as researchCtrl from '../controllers/researchController';
import * as donationCtrl from '../controllers/donationController';
import * as adminCtrl from '../controllers/adminController';
import { verifyToken, requireRoles } from '../middleware/auth';
import { logAuditAction } from '../middleware/auditLogger';

const router = Router();

// Auth Routes
router.post('/auth/login', authCtrl.login);
router.get('/auth/profile', verifyToken, authCtrl.getProfile);

// Public Impact & Carbon Routes
router.get('/impact', impactCtrl.getImpactSummary);
router.get('/carbon', impactCtrl.getCarbonMetrics);

// Workstreams & Pillars
router.get('/pillars', workstreamCtrl.getPillars);
router.get('/workstreams', workstreamCtrl.getWorkstreams);

// Mangroves & Vessels
router.get('/mangroves', mangroveCtrl.getMangroveSites);
router.get('/vessels', vesselCtrl.getVessels);
router.get('/vessels/:vesselId', vesselCtrl.getVesselById);

// Research & Datasets
router.get('/datasets', researchCtrl.getDatasets);
router.post('/datasets/request-access', researchCtrl.requestDatasetAccess);

// Donations & Campaigns
router.get('/donations/campaigns', donationCtrl.getCampaigns);
router.post('/donations', donationCtrl.createDonation);

// Admin Routes (Protected by JWT & RBAC)
router.get('/admin/tasks', verifyToken, adminCtrl.getTasks);
router.post('/admin/tasks', verifyToken, requireRoles('SUPER_ADMIN', 'FOUNDER', 'ADMIN', 'FIELD_STAFF'), logAuditAction('CREATE_TASK', 'Tasks', 'Created new operations task'), adminCtrl.createTask);
router.patch('/admin/tasks/:taskId', verifyToken, adminCtrl.updateTaskStatus);
router.get('/admin/trainees', verifyToken, requireRoles('SUPER_ADMIN', 'FOUNDER', 'ADMIN', 'HR_MANAGER', 'TRAINER'), adminCtrl.getTrainees);
router.get('/admin/audit-logs', verifyToken, requireRoles('SUPER_ADMIN', 'FOUNDER', 'ADMIN'), adminCtrl.getAuditLogs);

export default router;
