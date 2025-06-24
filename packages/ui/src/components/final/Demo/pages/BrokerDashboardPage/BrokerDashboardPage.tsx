import React from 'react'
import { DashboardLayout } from '../../templates/DashboardLayout/DashboardLayout'
import { StatBlock } from '../../molecules/StatBlock/StatBlock'
import { Card } from '../../molecules/Card/Card'
import { Alert } from '../../molecules/Alert/Alert'
import { Button } from '../../atoms/Button/Button'
import { Badge } from '../../atoms/Badge/Badge'
import {
  mockCommissionSummary,
  mockQuickLinks,
  mockGroups,
  mockCommissionRecords,
  mockBrokers,
} from '../../utils/mockData'
import { User } from '../../organisms/SiteHeader/SiteHeader'

export interface BrokerDashboardPageProps {
  /** Current user information */
  user?: User
  /** Loading state */
  loading?: boolean
  /** Error message */
  error?: string
  /** Number of notifications */
  notificationCount?: number
  /** Whether to show welcome message */
  showWelcome?: boolean
  /** Custom welcome message */
  welcomeMessage?: string
  /** Whether to show quick actions sidebar */
  showQuickActions?: boolean
}

const BrokerDashboardPage = React.forwardRef<
  HTMLDivElement,
  BrokerDashboardPageProps
>(
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
    const commissionData = mockCommissionSummary[0]
    const recentGroups = mockGroups.slice(0, 3)
    const recentCommissions = mockCommissionRecords.slice(0, 3)

    const getGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) return 'Good morning'
      if (hour < 17) return 'Good afternoon'
      return 'Good evening'
    }

    const firstName = user?.name?.split(' ')[0] || 'Broker'
    const defaultWelcome = `${getGreeting()}, ${firstName}. Here's what's happening with your accounts today.`

    // Format currency helper
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    }

    // Format date helper
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }

    // Quick Actions Sidebar
    const QuickActionsSidebar = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Quick Actions
          </h3>
          <nav className="space-y-1">
            {mockQuickLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-secondary-blue-1-accent hover:text-secondary-blue-2 transition-colors"
              >
                <div className="w-5 h-5 bg-primary-blue/10 rounded flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-primary-blue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {link.title}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Recent Groups
          </h3>
          <div className="space-y-2">
            {recentGroups.map(group => (
              <div
                key={group.id}
                className="p-3 bg-tertiary-gray-5 hover:bg-tertiary-gray-6 transition-colors rounded-md"
              >
                <p className="text-sm font-medium text-gray-900">
                  {group.name}
                </p>
                <p className="text-xs text-gray-500">
                  {group.memberCount} members • {group.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

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
              We've updated the commission reporting system with enhanced
              analytics and trend data.
              <a
                href="/broker/training"
                className="text-primary-blue hover:text-secondary-blue-3 ml-1"
              >
                Learn more about the new features
              </a>
            </Alert>
          </div>
        )}

        {/* Commission Summary Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Commission Summary
          </h2>
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
            />
            <StatBlock
              value={commissionData.groupCount}
              label="Active Groups"
              format="number"
              variant="info"
            />
            <StatBlock
              value={commissionData.memberCount}
              label="Total Members"
              format="number"
              trend={{
                value: 8.3,
                direction: 'up',
                period: 'last month',
              }}
            />
            <StatBlock
              value={commissionData.pendingCommission}
              label="Pending Commission"
              format="currency"
              variant="warning"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <Card.Header>
              <h3 className="font-semibold">Recent Activity</h3>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {recentCommissions.map(record => (
                  <div
                    key={record.id}
                    className="flex items-center gap-3 p-3 bg-tertiary-gray-5 hover:bg-tertiary-gray-6 transition-colors rounded-md"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        record.status === 'paid'
                          ? 'bg-status-success'
                          : record.status === 'pending'
                            ? 'bg-status-warning'
                            : 'bg-primary-blue'
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{record.groupName}</p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(record.commissionAmount)} •{' '}
                        {formatDate(record.paymentDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
            <Card.Footer>
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </Card.Footer>
          </Card>

          <Card className="shadow-card">
            <Card.Header>
              <h3 className="font-semibold">Recent Payments</h3>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {recentCommissions.map(record => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-tertiary-gray-5 hover:bg-tertiary-gray-6 transition-colors rounded-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{record.groupName}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(record.paymentDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(record.commissionAmount)}
                      </p>
                      <Badge
                        variant={
                          record.status === 'paid' ? 'success' : 'warning'
                        }
                        className={
                          record.status === 'paid'
                            ? 'bg-label-success text-status-success'
                            : 'bg-label-warning text-status-warning'
                        }
                      >
                        {record.status}
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockQuickLinks.map(tool => (
              <Card
                key={tool.id}
                hoverable
                className="text-center shadow-card hover:shadow-lg transition-shadow"
              >
                <Card.Content className="p-4">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-primary-blue"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-gray-500">{tool.description}</p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )

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
            <Button
              variant="outline"
              size="sm"
              className="text-primary-blue border-primary-blue hover:bg-primary-blue/10"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Export Data
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-primary-blue hover:bg-secondary-blue-2 text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Quote
            </Button>
          </div>
        }
        {...props}
      >
        <DashboardContent />
      </DashboardLayout>
    )
  }
)

BrokerDashboardPage.displayName = 'BrokerDashboardPage'

export { BrokerDashboardPage }
