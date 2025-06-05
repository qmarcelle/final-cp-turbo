import { http, HttpResponse } from 'msw'

/**
 * API handlers for Consumer Portals backend services
 * These handlers mock the actual API endpoints your apps will call
 */
export const handlers = [
  // Auth endpoints
  http.get('/api/auth/session', () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        role: 'broker'
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })
  }),

  // Member search endpoints
  http.get('/api/members/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    
    return HttpResponse.json({
      members: [
        {
          id: '12345',
          firstName: 'Jane',
          lastName: 'Smith',
          memberId: 'M12345',
          dateOfBirth: '1985-06-15',
          planType: 'Medicare Advantage'
        }
      ],
      totalCount: 1,
      query
    })
  }),

  // Member details
  http.get('/api/members/:memberId', ({ params }) => {
    return HttpResponse.json({
      id: params.memberId,
      firstName: 'Jane',
      lastName: 'Smith',
      memberId: params.memberId,
      dateOfBirth: '1985-06-15',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '90210'
      },
      contact: {
        phone: '(555) 123-4567',
        email: 'jane.smith@email.com'
      },
      plan: {
        type: 'Medicare Advantage',
        planName: 'Health Plus Gold',
        effectiveDate: '2024-01-01',
        status: 'Active'
      }
    })
  }),

  // Claims endpoints
  http.get('/api/members/:memberId/claims', ({ params }) => {
    return HttpResponse.json({
      claims: [
        {
          id: 'CLM001',
          memberId: params.memberId,
          serviceDate: '2024-01-15',
          provider: 'City Medical Center',
          amount: 250.00,
          status: 'Processed',
          description: 'Office Visit'
        }
      ],
      totalCount: 1
    })
  }),

  // Prior auth endpoints
  http.get('/api/members/:memberId/prior-auths', ({ params }) => {
    return HttpResponse.json({
      priorAuths: [
        {
          id: 'PA001',
          memberId: params.memberId,
          requestDate: '2024-01-10',
          service: 'MRI Scan',
          status: 'Approved',
          provider: 'Imaging Center North'
        }
      ],
      totalCount: 1
    })
  }),

  // Commission reports
  http.get('/api/reports/commission', () => {
    return HttpResponse.json({
      data: [
        {
          period: '2024-01',
          totalCommission: 15250.00,
          enrollments: 45,
          averageCommission: 338.89
        }
      ]
    })
  }),

  // Error simulation for testing
  http.get('/api/test/error', () => {
    return new HttpResponse(null, { 
      status: 500,
      statusText: 'Internal Server Error'
    })
  }),

  // Network delay simulation
  http.get('/api/test/slow', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return HttpResponse.json({ message: 'This was slow!' })
  })
] 