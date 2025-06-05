/**
 * Default MSW handlers for API mocking
 * These handlers provide mock implementations of our backend APIs for testing
 */
import { HttpResponse, http } from 'msw';

// Mock data
const mockClaims = [
  {
    id: '1',
    claimNumber: 'CL12345678',
    status: 'approved',
    type: 'medical',
    patient: {
      id: 'P001',
      name: 'John Doe',
      relationship: 'self',
    },
    provider: {
      id: 'PR001',
      name: 'General Hospital',
      network: 'in',
      specialty: 'General Practice',
    },
    dateOfService: '2025-02-15',
    dateReceived: '2025-02-16',
    dateProcessed: '2025-02-20',
    totalBilled: 1500,
    totalAllowed: 1200,
    totalPaid: 960,
    memberResponsibility: 240,
    serviceLines: [
      {
        id: 'SL001',
        serviceDate: '2025-02-15',
        description: 'Office visit',
        serviceType: 'office_visit',
        billed: 1500,
        allowed: 1200,
        memberResponsibility: 240,
        planPaid: 960,
      },
    ],
    eob: {
      id: 'EOB001',
      url: '/api/mock/eob/CL12345678.pdf',
      dateGenerated: '2025-02-21',
    },
  },
  {
    id: '2',
    claimNumber: 'CL12345679',
    status: 'denied',
    type: 'pharmacy',
    patient: {
      id: 'P001',
      name: 'John Doe',
      relationship: 'self',
    },
    provider: {
      id: 'PR002',
      name: 'Main Street Pharmacy',
      network: 'in',
      specialty: 'Pharmacy',
    },
    dateOfService: '2025-02-18',
    dateReceived: '2025-02-19',
    dateProcessed: '2025-02-22',
    totalBilled: 300,
    totalAllowed: 0,
    totalPaid: 0,
    memberResponsibility: 300,
    serviceLines: [
      {
        id: 'SL002',
        serviceDate: '2025-02-18',
        description: 'Prescription medication',
        serviceType: 'prescription',
        billed: 300,
        allowed: 0,
        memberResponsibility: 300,
        planPaid: 0,
      },
    ],
    eob: null,
  },
];

/**
 * API handlers for MSW
 * These mock our backend API endpoints for testing
 */
export const handlers = [
  // GET /api/claims - Get all claims
  http.get('/api/claims', () => {
    return HttpResponse.json({
      claims: mockClaims,
      totalCount: mockClaims.length,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    });
  }),

  // GET /api/claims/:id - Get a specific claim
  http.get('/api/claims/:id', ({ params }) => {
    const { id } = params;
    const claim = mockClaims.find(c => c.id === id);
    
    if (!claim) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json({ claim });
  }),

  // POST /api/claims/appeals - Submit an appeal
  http.post('/api/claims/appeals', async () => {
    // We don't need to use the request body for the mock
    return HttpResponse.json({
      appealId: 'AP' + Math.floor(Math.random() * 1000000),
      status: 'submitted',
    });
  }),

  // GET /api/claims/:id/eob - Get EOB document
  http.get('/api/claims/:id/eob', ({ params }) => {
    const { id } = params;
    const claim = mockClaims.find(c => c.id === id);
    
    if (!claim || !claim.eob) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json({ url: claim.eob.url });
  }),

  // Auth API mock handlers
  http.post('/api/auth/signin', async () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'broker'
      },
      token: 'mock-jwt-token'
    });
  }),

  http.post('/api/auth/signout', async () => {
    return HttpResponse.json({ success: true });
  }),

  // User API mock handlers
  http.get('/api/user/profile', async () => {
    return HttpResponse.json({
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'broker',
      isActive: true,
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: {
          email: true,
          push: false
        }
      }
    });
  }),

  // Example API endpoints for broker portal
  http.get('/api/broker/clients', async () => {
    return HttpResponse.json({
      clients: [
        { id: '1', name: 'Acme Corp', size: 'Large', status: 'Active' },
        { id: '2', name: 'Globex Industries', size: 'Medium', status: 'Active' },
        { id: '3', name: 'Small Business LLC', size: 'Small', status: 'Pending' }
      ]
    });
  }),

  // Example API endpoints for employer portal
  http.get('/api/employer/plans', async () => {
    return HttpResponse.json({
      plans: [
        { id: '1', name: 'Basic Health Plan', type: 'Medical', status: 'Active' },
        { id: '2', name: 'Premium Dental Plan', type: 'Dental', status: 'Active' },
        { id: '3', name: 'Vision Plus Plan', type: 'Vision', status: 'Active' }
      ]
    });
  })
];
