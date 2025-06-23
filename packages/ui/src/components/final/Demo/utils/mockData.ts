// Mock Data for Broker Portal Storybook

export interface Broker {
    id: string;
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
    agencyName: string;
    territory: string;
    status: 'active' | 'inactive' | 'pending';
    commissionLevel: number;
    joinDate: string;
  }
  
  export interface Group {
    id: string;
    name: string;
    groupNumber: string;
    effectiveDate: string;
    memberCount: number;
    status: 'active' | 'pending' | 'terminated';
    planType: 'PPO' | 'HMO' | 'HDHP' | 'EPO';
    renewalDate: string;
    brokerName: string;
    premiumAmount: number;
  }
  
  export interface CommissionRecord {
    id: string;
    groupName: string;
    groupNumber: string;
    planType: string;
    effectiveDate: string;
    memberCount: number;
    premiumAmount: number;
    commissionRate: number;
    commissionAmount: number;
    paymentDate: string;
    status: 'paid' | 'pending' | 'processing';
    paymentMethod: 'direct_deposit' | 'check';
  }
  
  export interface CommissionSummary {
    period: string;
    totalCommission: number;
    paidCommission: number;
    pendingCommission: number;
    groupCount: number;
    memberCount: number;
    averageCommissionRate: number;
  }
  
  export interface Member {
    id: string;
    subscriberId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ssn: string;
    groupNumber: string;
    planType: string;
    effectiveDate: string;
    status: 'active' | 'terminated' | 'pending';
    dependentCount: number;
  }
  
  export interface ReportCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
    reportCount: number;
    lastUpdated: string;
    category: 'commission' | 'member' | 'group' | 'analytics';
  }
  
  export interface QuickLink {
    id: string;
    title: string;
    description: string;
    icon: string;
    url: string;
    category: 'sales' | 'service' | 'reports' | 'resources';
    featured?: boolean;
  }
  
  // Sample Brokers
  export const mockBrokers: Broker[] = [
    {
      id: 'BRK001',
      name: 'John Smith',
      email: 'john.smith@agency.com',
      phone: '(423) 555-0123',
      licenseNumber: 'TN-12345',
      agencyName: 'Smith Insurance Agency',
      territory: 'East Tennessee',
      status: 'active',
      commissionLevel: 8.5,
      joinDate: '2020-03-15',
    },
    {
      id: 'BRK002',
      name: 'Sarah Johnson',
      email: 'sarah.j@benefits.com',
      phone: '(615) 555-0456',
      licenseNumber: 'TN-67890',
      agencyName: 'Johnson Benefits Group',
      territory: 'Middle Tennessee',
      status: 'active',
      commissionLevel: 9.0,
      joinDate: '2019-08-22',
    },
    {
      id: 'BRK003',
      name: 'Michael Davis',
      email: 'mdavis@insurance.com',
      phone: '(901) 555-0789',
      licenseNumber: 'TN-11223',
      agencyName: 'Davis Insurance Solutions',
      territory: 'West Tennessee',
      status: 'active',
      commissionLevel: 7.5,
      joinDate: '2021-01-10',
    },
  ];
  
  // Sample Groups
  export const mockGroups: Group[] = [
    {
      id: 'GRP001',
      name: 'TechCorp Inc.',
      groupNumber: 'TC-2024-001',
      effectiveDate: '2024-01-01',
      memberCount: 45,
      status: 'active',
      planType: 'PPO',
      renewalDate: '2024-12-31',
      brokerName: 'John Smith',
      premiumAmount: 47250.00,
    },
    {
      id: 'GRP002', 
      name: 'Manufacturing Solutions LLC',
      groupNumber: 'MS-2024-002',
      effectiveDate: '2024-03-01',
      memberCount: 78,
      status: 'active',
      planType: 'HMO',
      renewalDate: '2025-02-28',
      brokerName: 'Sarah Johnson',
      premiumAmount: 62400.00,
    },
    {
      id: 'GRP003',
      name: 'Local Restaurant Group',
      groupNumber: 'LR-2024-003',
      effectiveDate: '2024-06-01',
      memberCount: 23,
      status: 'pending',
      planType: 'HDHP',
      renewalDate: '2025-05-31',
      brokerName: 'Michael Davis',
      premiumAmount: 18400.00,
    },
  ];
  
  // Sample Commission Records
  export const mockCommissionRecords: CommissionRecord[] = [
    {
      id: 'COM001',
      groupName: 'TechCorp Inc.',
      groupNumber: 'TC-2024-001',
      planType: 'PPO',
      effectiveDate: '2024-01-01',
      memberCount: 45,
      premiumAmount: 47250.00,
      commissionRate: 8.5,
      commissionAmount: 4016.25,
      paymentDate: '2024-01-15',
      status: 'paid',
      paymentMethod: 'direct_deposit',
    },
    {
      id: 'COM002',
      groupName: 'Manufacturing Solutions LLC',
      groupNumber: 'MS-2024-002',
      planType: 'HMO',
      effectiveDate: '2024-03-01',
      memberCount: 78,
      premiumAmount: 62400.00,
      commissionRate: 9.0,
      commissionAmount: 5616.00,
      paymentDate: '2024-03-15',
      status: 'paid',
      paymentMethod: 'direct_deposit',
    },
    {
      id: 'COM003',
      groupName: 'Local Restaurant Group',
      groupNumber: 'LR-2024-003',
      planType: 'HDHP',
      effectiveDate: '2024-06-01',
      memberCount: 23,
      premiumAmount: 18400.00,
      commissionRate: 7.5,
      commissionAmount: 1380.00,
      paymentDate: '2024-06-15',
      status: 'pending',
      paymentMethod: 'check',
    },
  ];
  
  // Sample Commission Summary
  export const mockCommissionSummary: CommissionSummary[] = [
    {
      period: '2024 YTD',
      totalCommission: 125486.50,
      paidCommission: 115486.50,
      pendingCommission: 10000.00,
      groupCount: 47,
      memberCount: 1256,
      averageCommissionRate: 8.2,
    },
    {
      period: '2024 Q4',
      totalCommission: 32150.75,
      paidCommission: 28150.75,
      pendingCommission: 4000.00,
      groupCount: 12,
      memberCount: 324,
      averageCommissionRate: 8.5,
    },
    {
      period: '2024 Q3',
      totalCommission: 28975.25,
      paidCommission: 28975.25,
      pendingCommission: 0,
      groupCount: 11,
      memberCount: 298,
      averageCommissionRate: 8.1,
    },
  ];
  
  // Sample Members
  export const mockMembers: Member[] = [
    {
      id: 'MEM001',
      subscriberId: 'TC001001',
      firstName: 'Robert',
      lastName: 'Wilson',
      dateOfBirth: '1985-04-12',
      ssn: '***-**-1234',
      groupNumber: 'TC-2024-001',
      planType: 'PPO',
      effectiveDate: '2024-01-01',
      status: 'active',
      dependentCount: 2,
    },
    {
      id: 'MEM002',
      subscriberId: 'MS002001',
      firstName: 'Lisa',
      lastName: 'Anderson',
      dateOfBirth: '1978-09-25',
      ssn: '***-**-5678',
      groupNumber: 'MS-2024-002',
      planType: 'HMO',
      effectiveDate: '2024-03-01',
      status: 'active',
      dependentCount: 3,
    },
  ];
  
  // Sample Report Categories
  export const mockReportCategories: ReportCategory[] = [
    {
      id: 'RPT001',
      title: 'Commission Reports',
      description: 'View commission statements, payments, and historical data',
      icon: 'dollar-sign',
      reportCount: 8,
      lastUpdated: '2024-01-15',
      category: 'commission',
    },
    {
      id: 'RPT002',
      title: 'Member Analytics',
      description: 'Member enrollment trends and demographic reports',
      icon: 'users',
      reportCount: 5,
      lastUpdated: '2024-01-14',
      category: 'member',
    },
    {
      id: 'RPT003',
      title: 'Group Performance',
      description: 'Group-level performance metrics and renewal analysis',
      icon: 'building',
      reportCount: 6,
      lastUpdated: '2024-01-13',
      category: 'group',
    },
    {
      id: 'RPT004',
      title: 'Sales Analytics',
      description: 'Sales performance, pipeline, and forecasting reports',
      icon: 'trending-up',
      reportCount: 4,
      lastUpdated: '2024-01-12',
      category: 'analytics',
    },
  ];
  
  // Sample Quick Links
  export const mockQuickLinks: QuickLink[] = [
    {
      id: 'QL001',
      title: 'Quote Builder',
      description: 'Create quotes for new prospects',
      icon: 'calculator',
      url: '/broker/quote-builder',
      category: 'sales',
      featured: true,
    },
    {
      id: 'QL002',
      title: 'Member Search',
      description: 'Search member information and claims',
      icon: 'search',
      url: '/broker/member-search',
      category: 'service',
      featured: true,
    },
    {
      id: 'QL003',
      title: 'Commission Reports',
      description: 'View latest commission statements',
      icon: 'file-text',
      url: '/broker/commission-reports',
      category: 'reports',
      featured: true,
    },
    {
      id: 'QL004',
      title: 'Marketing Materials',
      description: 'Download sales flyers and materials',
      icon: 'download',
      url: '/broker/marketing-materials',
      category: 'resources',
    },
    {
      id: 'QL005',
      title: 'Training Center',
      description: 'Access training resources and certifications',
      icon: 'book-open',
      url: '/broker/training-center',
      category: 'resources',
    },
    {
      id: 'QL006',
      title: 'Support Center',
      description: 'Get help and submit support tickets',
      icon: 'help-circle',
      url: '/broker/support',
      category: 'service',
    },
  ];
  
  // Helper functions for generating more mock data
  export function generateRandomCommission(count: number = 10): CommissionRecord[] {
    const records: CommissionRecord[] = [];
    const groupNames = [
      'Alpha Manufacturing', 'Beta Services', 'Gamma Technologies', 'Delta Solutions',
      'Epsilon Corp', 'Zeta Industries', 'Eta Enterprises', 'Theta Systems'
    ];
    
    for (let i = 0; i < count; i++) {
      const groupName = groupNames[i % groupNames.length];
      const memberCount = Math.floor(Math.random() * 100) + 10;
      const premiumAmount = memberCount * (Math.random() * 500 + 800);
      const commissionRate = Math.random() * 5 + 6;
      
      records.push({
        id: `COM${String(i + 100).padStart(3, '0')}`,
        groupName,
        groupNumber: `${groupName.charAt(0)}${groupName.charAt(groupName.indexOf(' ') + 1)}-2024-${String(i + 1).padStart(3, '0')}`,
        planType: ['PPO', 'HMO', 'HDHP', 'EPO'][Math.floor(Math.random() * 4)],
        effectiveDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
        memberCount,
        premiumAmount: Math.round(premiumAmount * 100) / 100,
        commissionRate: Math.round(commissionRate * 100) / 100,
        commissionAmount: Math.round(premiumAmount * (commissionRate / 100) * 100) / 100,
        paymentDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15`,
        status: ['paid', 'pending', 'processing'][Math.floor(Math.random() * 3)] as 'paid' | 'pending' | 'processing',
        paymentMethod: Math.random() > 0.5 ? 'direct_deposit' : 'check',
      });
    }
    
    return records;
  }
  
  export const sampleFormData = {
    memberSearch: {
      subscriberId: 'TC001001',
      lastName: 'Wilson',
      dateOfBirth: '1985-04-12',
      ssn: '***-**-1234',
    },
    groupSearch: {
      groupNumber: 'TC-2024-001',
      groupName: 'TechCorp Inc.',
      effectiveDate: '2024-01-01',
    },
    reportFilters: {
      dateRange: 'ytd',
      broker: 'BRK001',
      groupType: 'all',
      status: 'active',
    },
  };