import React from 'react';
import { DashboardLayout } from '../../templates/DashboardLayout/DashboardLayout';
import { StatBlock } from '../../molecules/StatBlock/StatBlock';
import { Card } from '../../molecules/Card/Card';
import { Alert } from '../../molecules/Alert/Alert';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { 
  mockCommissionSummary, 
  mockQuickLinks, 
  mockGroups, 
  mockCommissionRecords,
  mockBrokers 
} from '../../utils/mockData';
import { User } from '../../organisms/SiteHeader/SiteHeader';

export interface BrokerDashboardPageProps {
  /** Current user information */
  user?: User;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Number of notifications */
  notificationCount?: number;
  /** Whether to show welcome message */
  showWelcome?: boolean;
  /** Custom welcome message */
  welcomeMessage?: string;
  /** Whether to show quick actions sidebar */
  showQuickActions?: boolean;
}

const BrokerDashboardPage = React.forwardRef<HTMLDivElement, BrokerDashboardPageProps>(
  (
    {
      user = {
        name: mockBrokers[0].name,
        email: mockBrokers[0].email,
        role: 'Licensed Broker',
        agency: mockBrokers[0].agencyName,
      },
      loading = false,
      error,
      notificationCount = 0,
      showWelcome = true,
      welcomeMessage,
      showQuickActions = true,
      ...props
    },
    ref
  ) => {
    const commissionData = mockCommissionSummary[0];
    const recentGroups = mockGroups.slice(0, 3);
    const recentCommissions = mockCommissionRecords.slice(0, 3);
    
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    };

    const firstName = user?.name?.split(' ')[0] || 'Broker';
    const defaultWelcome = `${getGreeting()}, ${firstName}. Here's what's happening with your accounts today.`;

    // Quick Actions Sidebar
    const QuickActionsSidebar = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <nav className="space-y-2">
            {mockQuickLinks.slice(0, 6).map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{link.title}</p>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              </a>
            ))}
          </nav>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Groups</h3>
          <div className="space-y-3">
            {recentGroups.map((group) => (
              <div key={group.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{group.name}</h4>
                  <Badge
                    variant={group.status === 'active' ? 'success' : group.status === 'pending' ? 'warning' : 'error'}
                    size="sm"
                  >
                    {group.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mb-1">{group.groupNumber}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{group.memberCount} members</span>
                  <Badge variant="outline" size="sm">{group.planType}</Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Groups
          </Button>
        </div>
      </div>
    );

    // Main Dashboard Content
    const DashboardContent = () => (
      <div className="space-y-8">
        {/* Welcome Message & Alerts */}
        {showWelcome && (
          <div className="space-y-4">
            {/* System Alert Example */}
            <Alert
              variant="info"
              title="New Features Available"
              onClose={() => {}}
            >
              We've updated the commission reporting system with enhanced analytics and trend data. 
              <a href="/broker/training" className="text-blue-600 hover:underline ml-1">
                Learn more about the new features
              </a>
            </Alert>
          </div>
        )}

        {/* Commission Summary Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBlock
              value={commissionData.totalCommission}
              label="YTD Commission"
              format="currency"
              variant="success"
              trend={{
                value: 15.8,
                direction: 'up',
                period: 'last year',
              }}
              action={
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </Button>
              }
            />
            <StatBlock
              value={commissionData.paidCommission}
              label="Paid Commission"
              format="currency"
              subtitle="Payments received"
            />
            <StatBlock
              value={commissionData.pendingCommission}
              label="Pending Commission"
              format="currency"
              variant="warning"
              subtitle="Processing payments"
            />
            <StatBlock
              value={commissionData.groupCount}
              label="Active Groups"
              format="number"
              variant="info"
              trend={{
                value: 8.3,
                direction: 'up',
                period: 'last month',
              }}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recent Activity</h3>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </Button>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New member enrolled</p>
                    <p className="text-sm text-gray-600">Robert Wilson joined TechCorp Inc. health plan</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Commission processed</p>
                    <p className="text-sm text-gray-600">$2,450.00 payment for Manufacturing Solutions LLC</p>
                    <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Quote expiring soon</p>
                    <p className="text-sm text-gray-600">Local Restaurant Group quote expires in 3 days</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New group inquiry</p>
                    <p className="text-sm text-gray-600">Startup Tech LLC requested group coverage information</p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            </Card.Content>
            <Card.Footer>
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </Card.Footer>
          </Card>

          {/* Recent Commission Payments */}
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recent Commission Payments</h3>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {recentCommissions.map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{commission.groupName}</p>
                      <p className="text-xs text-gray-500">{commission.groupNumber}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(commission.paymentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        ${commission.commissionAmount.toLocaleString()}
                      </p>
                      <Badge
                        variant={commission.status === 'paid' ? 'success' : commission.status === 'pending' ? 'warning' : 'secondary'}
                        size="sm"
                      >
                        {commission.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
            <Card.Footer>
              <Button variant="outline" size="sm" className="w-full">
                View All Payments
              </Button>
            </Card.Footer>
          </Card>
        </div>

        {/* Quick Tools Grid */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockQuickLinks.map((tool) => (
              <Card key={tool.id} hoverable className="text-center">
                <Card.Content className="p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{tool.title}</h4>
                  <p className="text-xs text-gray-600">{tool.description}</p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <DashboardLayout
        ref={ref}
        title="Broker Dashboard"
        subtitle={welcomeMessage || defaultWelcome}
        user={user}
        activePath="/broker/dashboard"
        showSidebar={showQuickActions}
        sidebar={showQuickActions ? <QuickActionsSidebar /> : undefined}
        notificationCount={notificationCount}
        loading={loading}
        error={error}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export Data
            </Button>
            <Button variant="primary" size="sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Quote
            </Button>
          </div>
        }
        {...props}
      >
        <DashboardContent />
      </DashboardLayout>
    );
  }
);

BrokerDashboardPage.displayName = 'BrokerDashboardPage';

export { BrokerDashboardPage };