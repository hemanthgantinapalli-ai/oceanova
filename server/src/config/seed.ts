import bcrypt from 'bcryptjs';
import {
  UserModel, PillarModel, WorkstreamModel, ImpactMetricModel,
  CarbonRecordModel, MangroveSiteModel, VesselModel, DatasetModel,
  CampaignModel, TraineeModel, TaskModel
} from '../models/Schemas';

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Starting database seeding process...');

    // 1. Seed Pillars
    await PillarModel.deleteMany({});
    await PillarModel.insertMany([
      {
        code: 'SAHAJA',
        title: 'Sahaja Pillar',
        tagline: 'Renewable Energy & Clean Blue Infrastructure',
        description: 'Pioneering solar-electric inland navigation, wave-assisted energy systems, and decarbonized coastal mobility.',
        iconName: 'Zap',
        impactAreas: ['Solar Marine Mobility', 'Clean Navigation', 'Inland Waterway Decarbonization']
      },
      {
        code: 'SHRAMA',
        title: 'Shrama Pillar',
        tagline: 'Rural Empowerment & Regenerative Ecosystems',
        description: 'Empowering coastal and estuarine communities through mangrove restoration, blue carbon farming, and sustainable aquaculture.',
        iconName: 'Trees',
        impactAreas: ['Mangrove Restoration', 'Coastal Livelihoods', 'Climate Resilience']
      },
      {
        code: 'SPARSHA',
        title: 'Sparsha Pillar',
        tagline: 'Innovation, Marine AI & STEM Makerspaces',
        description: 'Fostering deep-tech climate research, open ocean datasets, youth technical training, and autonomous water vessel innovation.',
        iconName: 'Cpu',
        impactAreas: ['Youth STEM Education', 'Ocean Big Data', 'AI Water Robotics']
      }
    ]);

    // 2. Seed Workstreams (12 Workstreams)
    await WorkstreamModel.deleteMany({});
    await WorkstreamModel.insertMany([
      {
        code: 'WS-01',
        name: 'Solar Inland Mobility',
        pillar: 'SAHAJA',
        category: 'Clean Transport',
        status: 'Active',
        location: 'Kakinada Waterways',
        district: 'East Godavari',
        kpi: '1,800 km zero-emission waterway transport',
        projectOwner: 'Er. Rajesh Varma',
        impactSummary: 'Operating Surya Boat 1.0 fleet, replacing diesel ferry transit with 100% solar electric propulsion.',
        beneficiariesCount: 8400
      },
      {
        code: 'WS-02',
        name: 'Estuarine Mangrove Bio-Shields',
        pillar: 'SHRAMA',
        category: 'Ecosystem Restoration',
        status: 'Scaling',
        location: 'Coringa Wildlife Sanctuary',
        district: 'Kakinada',
        kpi: '500 Ha mangrove bio-barrier planted',
        projectOwner: 'Dr. Ananya Rao',
        impactSummary: 'Restoring native Avicennia and Rhizophora species with 92% 3-year survival rate.',
        beneficiariesCount: 12500
      },
      {
        code: 'WS-03',
        name: 'AI Floating Debris Interceptors',
        pillar: 'SPARSHA',
        category: 'Robotics & Waste',
        status: 'Active',
        location: 'Kriyananda Estuary',
        district: 'Dr. B.R. Ambedkar Konaseema',
        kpi: '45 tons plastic debris extracted/yr',
        projectOwner: 'Vikram Sethi',
        impactSummary: 'Autonomous solar catamarans capturing riverine macro-plastics before ocean entry.',
        beneficiariesCount: 4200
      },
      {
        code: 'WS-04',
        name: 'Coastal Aquaculture Decarbonization',
        pillar: 'SAHAJA',
        category: 'Clean Energy',
        status: 'Active',
        location: 'Bapatla Creek Hub',
        district: 'Bapatla',
        kpi: '350 kW off-grid solar aeration installed',
        projectOwner: 'Sravani Reddy',
        impactSummary: 'Solar-powered paddlewheel aerators reducing diesel grid reliance for shrimp farmers.',
        beneficiariesCount: 3100
      },
      {
        code: 'WS-05',
        name: 'Youth Marine Bio-Makerspaces',
        pillar: 'SPARSHA',
        category: 'STEM Education',
        status: 'Scaling',
        location: 'Vizag Coastal Lab',
        district: 'Visakhapatnam',
        kpi: '2,500 youth trained in marine tech',
        projectOwner: 'Priya Sundaram',
        impactSummary: 'Hands-on robotics, water quality sensors, and GIS mapping training for coastal high-schoolers.',
        beneficiariesCount: 2500
      },
      {
        code: 'WS-06',
        name: 'Blue Carbon Intelligence Mapping',
        pillar: 'SPARSHA',
        category: 'Research & Data',
        status: 'Active',
        location: 'Krishna River Delta',
        district: 'Krishna',
        kpi: '3,300 tCO2e/yr blue carbon verified',
        projectOwner: 'Dr. Madhavan Nair',
        impactSummary: 'Drone LIDAR and soil core sediment analysis for accurate carbon sequestration accounting.',
        beneficiariesCount: 1800
      },
      {
        code: 'WS-07',
        name: 'Community Seaweed & Bio-refinery',
        pillar: 'SHRAMA',
        category: 'Sustainable Livelihoods',
        status: 'Planning',
        location: 'Kalingapatnam Coast',
        district: 'Srikakulam',
        kpi: '120 Women self-help group members employed',
        projectOwner: 'Lakshmi Devi',
        impactSummary: 'Kappaphycus seaweed cultivation for organic bio-stimulants and bioplastics.',
        beneficiariesCount: 950
      },
      {
        code: 'WS-08',
        name: 'Solar-Powered Cold Chain Logistics',
        pillar: 'SAHAJA',
        category: 'Renewable Storage',
        status: 'Active',
        location: 'Gilakaladindi Fishing Harbor',
        district: 'Krishna',
        kpi: '15 MT daily solar ice generation',
        projectOwner: 'K. Rama Krishna',
        impactSummary: 'Decentralized solar ice plant eliminating spoilage for traditional artisanal fishermen.',
        beneficiariesCount: 2200
      },
      {
        code: 'WS-09',
        name: 'Eco-Vessel Fleet Electrification',
        pillar: 'SAHAJA',
        category: 'Clean Transport',
        status: 'Planning',
        location: 'Rajahmundry River Port',
        district: 'East Godavari',
        kpi: '10 Electric passenger tenders commissioned',
        projectOwner: 'Er. Rajesh Varma',
        impactSummary: 'Retrofitting traditional wooden boats with brushless DC electric motors and LFP batteries.',
        beneficiariesCount: 5100
      },
      {
        code: 'WS-10',
        name: 'Climate-Resilient Fisherfolk Cooperatives',
        pillar: 'SHRAMA',
        category: 'Community Empowerment',
        status: 'Active',
        location: 'Nizamapatnam Coastal Belt',
        district: 'Guntur / Bapatla',
        kpi: '18 Cooperative micro-grants disbursed',
        projectOwner: 'Venkatesh Babu',
        impactSummary: 'Safety-at-sea satellite telemetry transponders and micro-insurance for small craft.',
        beneficiariesCount: 3400
      },
      {
        code: 'WS-11',
        name: 'Ocean Acidification Monitoring Network',
        pillar: 'SPARSHA',
        category: 'Ocean Science',
        status: 'Active',
        location: 'Bay of Bengal Transect',
        district: 'Coastal Andhra Corridor',
        kpi: '24/7 real-time pH and salinity IoT telemetry',
        projectOwner: 'Dr. Ananya Rao',
        impactSummary: 'Continuous buoy deployment tracking pH drift and coastal thermal anomalies.',
        beneficiariesCount: 1200
      },
      {
        code: 'WS-12',
        name: 'GISELA Coastal Women Green Tech Fellowship',
        pillar: 'SHRAMA',
        category: 'Women Empowerment',
        status: 'Scaling',
        location: 'Hope Island & Coringa Communities',
        district: 'East Godavari',
        kpi: '150 Women Green-Tech Fellows graduated',
        projectOwner: 'Dr. Gisela Founder',
        impactSummary: 'Specialized training for women in solar system maintenance, mangrove nursery management and eco-tourism.',
        beneficiariesCount: 1500
      }
    ]);

    // 3. Seed Impact Metrics
    await ImpactMetricModel.deleteMany({});
    await ImpactMetricModel.insertMany([
      { year: 2024, district: 'Kakinada', householdsReached: 8200, mangrovesRestoredHa: 140, youthTrained: 750, carbonAvoidedTons: 920, renewableEnergyKwh: 420000, inlandWaterwaysKm: 550 },
      { year: 2025, district: 'Kakinada', householdsReached: 12400, mangrovesRestoredHa: 210, youthTrained: 1100, carbonAvoidedTons: 1450, renewableEnergyKwh: 630000, inlandWaterwaysKm: 750 },
      { year: 2026, district: 'Krishna Delta', householdsReached: 8900, mangrovesRestoredHa: 150, youthTrained: 650, carbonAvoidedTons: 930, renewableEnergyKwh: 400000, inlandWaterwaysKm: 500 }
    ]);

    // 4. Seed Mangrove Sites
    await MangroveSiteModel.deleteMany({});
    await MangroveSiteModel.insertMany([
      {
        siteName: 'Coringa Bio-Shield Sector 4',
        district: 'Kakinada',
        hectares: 180,
        plantingDate: '2024-06-15',
        species: ['Avicennia marina', 'Rhizophora mucronata', 'Excoecaria agallocha'],
        survivalRatePercent: 94.2,
        volunteersCount: 450,
        lat: 16.8912,
        lng: 82.3124,
        status: 'Monitored Growth',
        beforeImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        afterImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        timeline: [
          { step: 'Baseline Ecological Survey', status: 'completed', date: '2024-01-10' },
          { step: 'Community Nursery Sapling Preparation', status: 'completed', date: '2024-03-20' },
          { step: 'Mass Planting Drive (Phase I)', status: 'completed', date: '2024-06-15' },
          { step: 'Drone Canopy Monitoring', status: 'in_progress', date: '2025-11-01' }
        ]
      },
      {
        siteName: 'Krishna Estuary Restoration Zone B',
        district: 'Krishna',
        hectares: 140,
        plantingDate: '2025-02-10',
        species: ['Rhizophora mucronata', 'Ceriops decandra'],
        survivalRatePercent: 89.8,
        volunteersCount: 320,
        lat: 15.7823,
        lng: 80.8912,
        status: 'Active Planting',
        beforeImageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
        afterImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        timeline: [
          { step: 'Hydrological Channel Clearing', status: 'completed', date: '2024-11-05' },
          { step: 'Sapling Propagation', status: 'completed', date: '2024-12-15' },
          { step: 'Planting Kickoff', status: 'completed', date: '2025-02-10' }
        ]
      }
    ]);

    // 5. Seed Vessels
    await VesselModel.deleteMany({});
    await VesselModel.insertMany([
      {
        vesselId: 'SURYA-01',
        name: 'Surya Boat 1.0',
        type: 'Solar Passenger Catamaran',
        status: 'Operational',
        solarCapacityKw: 8.5,
        batteryCapacityKwh: 42.0,
        totalEnergyGeneratedKwh: 1248.5,
        totalCo2AvoidedKg: 842.0,
        totalDistanceKm: 1240.5,
        currentLat: 16.9891,
        currentLng: 82.2475,
        speedKnots: 6.8,
        batteryPercent: 88,
        solarInputKw: 4.2,
        specifications: {
          'Passenger Capacity': '25 Persons',
          'Hull Material': 'Recycled Composite Fiber',
          'Propulsion': 'Dual 10kW BLDC Electric Motors',
          'Solar Array': 'Flexible Monocrystalline Panels'
        },
        gallery: [
          'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800&q=80'
        ]
      },
      {
        vesselId: 'MANGROVE-02',
        name: 'AI Mangrove Boat 2.0',
        type: 'Autonomous Ocean & Creek Interceptor',
        status: 'Operational',
        solarCapacityKw: 12.0,
        batteryCapacityKwh: 64.0,
        totalEnergyGeneratedKwh: 2410.8,
        totalCo2AvoidedKg: 1680.4,
        totalDistanceKm: 1890.2,
        currentLat: 16.5412,
        currentLng: 81.5231,
        speedKnots: 8.4,
        batteryPercent: 94,
        solarInputKw: 6.8,
        specifications: {
          'Navigation': 'Autonomous LiDAR & Computer Vision',
          'Debris Payload': '500 kg Hydraulic Conveyor Mesh',
          'Water Testing': 'Multi-parameter Sonde (pH, DO, Salinity)'
        },
        gallery: [
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
        ]
      }
    ]);

    // 6. Seed Datasets & Publications
    await DatasetModel.deleteMany({});
    await DatasetModel.insertMany([
      {
        title: 'Coringa Mangrove Estuarine Carbon Stocks Dataset (2024-2026)',
        description: 'Comprehensive blue carbon soil core analysis, canopy density LIDAR point clouds, and species distribution maps.',
        doi: '10.5281/zenodo.oceanova.2026.01',
        authors: ['Dr. Ananya Rao', 'Dr. Madhavan Nair', 'Priya Sundaram'],
        university: 'Andhra University & OceaNova Research Lab',
        year: 2026,
        datasetType: 'GeoTIFF / CSV',
        accessLevel: 'PUBLIC',
        fileUrl: 'https://oceanova.org/datasets/coringa_carbon_2026.zip',
        fileSizeMb: 142.5,
        downloadsCount: 380,
        citation: 'Rao et al. (2026). Coringa Estuarine Blue Carbon Accounting. OceaNova Data Repository. DOI:10.5281/zenodo.oceanova.2026.01'
      },
      {
        title: 'Godavari Delta High-Resolution Water Quality & pH Telemetry',
        description: '24/7 continuous IoT buoy measurements of sea surface temperature, salinity, micro-plastic PPM, and pH levels.',
        doi: '10.5281/zenodo.oceanova.2026.02',
        authors: ['Vikram Sethi', 'Dr. Ananya Rao'],
        university: 'OceaNova Ocean Science Unit',
        year: 2025,
        datasetType: 'NetCDF / JSON',
        accessLevel: 'PUBLIC',
        fileUrl: 'https://oceanova.org/datasets/godavari_iot_ph_2025.nc',
        fileSizeMb: 88.0,
        downloadsCount: 520,
        citation: 'Sethi & Rao (2025). Godavari Coastal Telemetry Series. OceaNova Science. DOI:10.5281/zenodo.oceanova.2026.02'
      }
    ]);

    // 7. Seed Campaigns
    await CampaignModel.deleteMany({});
    await CampaignModel.insertMany([
      {
        code: 'CAMP-MANGROVE',
        title: 'Restore 1 Hectare of Mangrove Bio-Shield',
        category: 'Ecosystem Restoration',
        description: 'Fund sapling cultivation, community planting drives, and 3-year satellite monitoring in Coringa Estuary.',
        goalAmount: 250000,
        raisedAmount: 185000,
        supportersCount: 340,
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        code: 'CAMP-YOUTH',
        title: 'Sponsor a Youth Marine Tech Fellow',
        category: 'Youth & Education',
        description: 'Provide a 6-month hands-on STEM robotics and GIS coastal navigation scholarship for underprivileged coastal students.',
        goalAmount: 150000,
        raisedAmount: 98000,
        supportersCount: 195,
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
      }
    ]);

    // 8. Seed Tasks for Admin Kanban
    await TaskModel.deleteMany({});
    await TaskModel.insertMany([
      {
        taskId: 'TSK-101',
        title: 'Deploy Solar Aeration Unit at Bapatla Creek Sector 2',
        description: 'Install 15kW off-grid solar array for shrimp farming cooperative.',
        workstreamCode: 'WS-04',
        boardName: 'Solar Mobility & Energy',
        status: 'In Progress',
        priority: 'High',
        assigneeName: 'Sravani Reddy',
        dueDate: '2026-09-01',
        subtasks: [
          { id: 'st-1', title: 'Mount solar frames on floating barge', completed: true },
          { id: 'st-2', title: 'Connect BLDC motor controller', completed: false }
        ]
      },
      {
        taskId: 'TSK-102',
        title: 'Coringa Sector 4 Drone Canopy Mapping Run',
        description: 'Autonomous aerial survey for survival rate verification.',
        workstreamCode: 'WS-02',
        boardName: 'Mangrove Operations',
        status: 'Under Review',
        priority: 'Medium',
        assigneeName: 'Dr. Ananya Rao',
        dueDate: '2026-08-25',
        subtasks: [
          { id: 'st-3', title: 'Calibrate multispectral camera', completed: true }
        ]
      }
    ]);

    // 9. Seed Users (Super Admin & Founder)
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash('admin123', salt);

    await UserModel.deleteMany({});
    await UserModel.insertMany([
      {
        name: 'Dr. OceaNova Founder',
        email: 'founder@oceanova.org',
        passwordHash: passHash,
        role: 'FOUNDER',
        department: 'Executive Leadership',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'Dr. Ananya Rao',
        email: 'ananya@oceanova.org',
        passwordHash: passHash,
        role: 'RESEARCHER',
        department: 'Blue Carbon Science',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      }
    ]);

    console.log('[Seed] Database successfully populated with realistic seed data!');
  } catch (err) {
    console.error('[Seed] Error during seeding:', err);
  }
};
