const API_BASE = '/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('oceanova_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'API Request Failed');
  }
  return json;
}

export const api = {
  get: (endpoint: string, options?: any) => {
    let url = endpoint;
    if (options?.params) {
      const query = new URLSearchParams();
      Object.keys(options.params).forEach(key => {
        if (options.params[key] !== undefined && options.params[key] !== '') {
          query.append(key, options.params[key]);
        }
      });
      const queryString = query.toString();
      if (queryString) url += `?${queryString}`;
    }
    return request<any>(url, { method: 'GET' });
  },
  post: (endpoint: string, data: any) => {
    return request<any>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  patch: (endpoint: string, data: any) => {
    return request<any>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
};

export const fetchImpactSummary = async (year?: number) => {
  const res = await api.get('/impact', { params: { year } });
  return res.data;
};

export const fetchCarbonMetrics = async () => {
  const res = await api.get('/carbon');
  return res.data;
};

export const fetchPillars = async () => {
  const res = await api.get('/pillars');
  return res.data;
};

export const fetchWorkstreams = async (filters?: { district?: string; pillar?: string; status?: string }) => {
  const res = await api.get('/workstreams', { params: filters });
  return res.data;
};

export const fetchMangroveSites = async () => {
  const res = await api.get('/mangroves');
  return res.data;
};

export const fetchVessels = async () => {
  const res = await api.get('/vessels');
  return res.data;
};

export const fetchDatasets = async (params?: any) => {
  const res = await api.get('/datasets', { params });
  return res.data;
};

export const fetchCampaigns = async () => {
  const res = await api.get('/donations/campaigns');
  return res.data;
};

export const postDonation = async (data: any) => {
  const res = await api.post('/donations', data);
  return res;
};

export const fetchAdminTasks = async () => {
  const res = await api.get('/admin/tasks');
  return res.data;
};

export const updateTaskStatusApi = async (taskId: string, status: string) => {
  const res = await api.patch(`/admin/tasks/${taskId}`, { status });
  return res.data;
};

export const fetchAdminTrainees = async () => {
  const res = await api.get('/admin/trainees');
  return res.data;
};

export const fetchAdminAuditLogs = async () => {
  const res = await api.get('/admin/audit-logs');
  return res.data;
};
