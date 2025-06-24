import React, { useState } from 'react'
import { DashboardLayout } from '../../templates/DashboardLayout/DashboardLayout'
import { StatBlock } from '../../molecules/StatBlock/StatBlock'
import { Card } from '../../molecules/Card/Card'
import { Alert } from '../../molecules/Alert/Alert'
import { Button } from '../../atoms/Button/Button'
import { Badge } from '../../atoms/Badge/Badge'
import { Input } from '../../atoms/Input/Input'
import {
  mockCommissionSummary,
  mockReportCategories,
  mockBrokers,
  type ReportCategory,
} from '../../utils/mockData'
import { User } from '../../organisms/SiteHeader/SiteHeader'

export interface ReportingOverviewPageProps {
  /** Current user information */
  user?: User
  /** Loading state */
  loading?: boolean
  /** Error message */
  error?: string
  /** Number of notifications */
  notificationCount?: number
  /** Whether to show quick access sidebar */
  showQuickAccess?: boolean
  /** Featured report categories */
  featuredCategories?: string[]
}

interface RecentReport {
  id: string
  name: string
  type: string
  generatedDate: string
  size: string
  status: 'ready' | 'generating' | 'failed'
}

const ReportingOverviewPage = React.forwardRef<
  HTMLDivElement,
  ReportingOverviewPageProps
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
      showQuickAccess = true,
      //featuredCategories = ['commission', 'member', 'group'],
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
    )

    const commissionData = mockCommissionSummary[0]

    // Sample recent reports data
    const recentReports: RecentReport[] = [
      {
        id: 'RPT001',
        name: 'Q4 Commission Summary',
        type: 'Commission Report',
        generatedDate: '2024-01-15',
        size: '2.3 MB',
        status: 'ready',
      },
      {
        id: 'RPT002',
        name: 'Member Enrollment Trends',
        type: 'Member Analytics',
        generatedDate: '2024-01-14',
        size: '1.8 MB',
        status: 'ready',
      },
      {
        id: 'RPT003',
        name: 'Group Performance Analysis',
        type: 'Group Report',
        generatedDate: '2024-01-13',
        size: '3.1 MB',
        status: 'generating',
      },
      {
        id: 'RPT004',
        name: 'YTD Sales Performance',
        type: 'Sales Analytics',
        generatedDate: '2024-01-12',
        size: '1.5 MB',
        status: 'ready',
      },
    ]

    // Filter report categories based on search and selection
    const filteredCategories = mockReportCategories.filter(category => {
      if (selectedCategory && category.category !== selectedCategory)
        return false
      if (
        searchTerm &&
        !category.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false
      return true
    })

    // Quick Access Sidebar
    const QuickAccessSidebar = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Report Shortcuts
          </h3>
          <nav className="space-y-2">
            <a
              href="/broker/reporting/commission"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582z" />
                </svg>
              </div>
              <span>Commission Reports</span>
            </a>
            <a
              href="/broker/reporting/members"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>Member Reports</span>
            </a>
            <a
              href="/broker/reporting/groups"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg
                  className="w-4 h-4 text-purple-600"
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
              <span>Group Reports</span>
            </a>
            <a
              href="/broker/reporting/analytics"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Sales Analytics</span>
            </a>
          </nav>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Scheduled Reports
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Monthly Commission
              </p>
              <p className="text-xs text-blue-600">Next: Jan 31, 2024</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-green-900">
                Weekly Activity
              </p>
              <p className="text-xs text-green-600">Next: Every Monday</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-purple-900">
                Quarterly Review
              </p>
              <p className="text-xs text-purple-600">Next: Mar 31, 2024</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
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
              Create Custom Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
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
              Export All Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Schedule Report
            </Button>
          </div>
        </div>
      </div>
    )

    // Main Content
    const MainContent = () => (
      <div className="space-y-8">
        {/* Alert for new features or important notices */}
        <Alert
          variant="info"
          title="Enhanced Reporting Available"
          onClose={() => {}}
        >
          New analytics features are now available including trend analysis and
          predictive insights.
          <a
            href="/broker/training/reporting"
            className="text-blue-600 hover:underline ml-1"
          >
            Learn about the new features
          </a>
        </Alert>

        {/* Reporting Summary Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Reporting Summary
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
                period: 'vs last year',
              }}
            />
            <StatBlock
              value={mockReportCategories.reduce(
                (acc, cat) => acc + cat.reportCount,
                0
              )}
              label="Available Reports"
              format="number"
              variant="info"
            />
            <StatBlock
              value={recentReports.filter(r => r.status === 'ready').length}
              label="Recent Reports"
              format="number"
              subtitle="Ready for download"
            />
            <StatBlock
              value={3}
              label="Scheduled Reports"
              format="number"
              variant="default"
              subtitle="Auto-generated"
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {['commission', 'member', 'group', 'analytics'].map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Report Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Report Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map(category => (
              <ReportCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Reports
            </h2>
            <Button variant="outline" size="sm">
              View All Reports
            </Button>
          </div>

          <Card>
            <Card.Content className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Generated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentReports.map(report => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {report.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" size="sm">
                            {report.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(report.generatedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              report.status === 'ready'
                                ? 'success'
                                : report.status === 'generating'
                                  ? 'warning'
                                  : 'error'
                            }
                            size="sm"
                          >
                            {report.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {report.status === 'ready' ? (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </Button>
                            </div>
                          ) : (
                            <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    )

    return (
      <DashboardLayout
        ref={ref}
        title="Reporting Overview"
        subtitle="Access all your reports, analytics, and business intelligence tools in one place"
        user={user}
        activePath="/broker/reporting"
        showSidebar={showQuickAccess}
        sidebar={showQuickAccess ? <QuickAccessSidebar /> : undefined}
        showBreadcrumbs={true}
        breadcrumbs={[
          { label: 'Dashboard', href: '/broker/dashboard' },
          { label: 'Reporting' },
        ]}
        notificationCount={notificationCount}
        loading={loading}
        error={error}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Schedule Report
            </Button>
            <Button variant="primary" size="sm">
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
              Create Report
            </Button>
          </div>
        }
        {...props}
      >
        <MainContent />
      </DashboardLayout>
    )
  }
)

ReportingOverviewPage.displayName = 'ReportingOverviewPage'

const ReportCategoryCard = ({ category }: { category: ReportCategory }) => (
  <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-lg">
    <Card.Header>
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
            category.category === 'commission'
              ? 'bg-green-100'
              : category.category === 'member'
                ? 'bg-blue-100'
                : category.category === 'group'
                  ? 'bg-purple-100'
                  : 'bg-orange-100'
          }`}
        >
          <svg
            className={`w-6 h-6 ${
              category.category === 'commission'
                ? 'text-green-600'
                : category.category === 'member'
                  ? 'text-blue-600'
                  : category.category === 'group'
                    ? 'text-purple-600'
                    : 'text-orange-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {category.category === 'commission' && (
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582z" />
            )}
            {category.category === 'member' && (
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0z" />
            )}
            {category.category === 'group' && (
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                clipRule="evenodd"
              />
            )}
            {category.category === 'analytics' && (
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {category.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Last updated: {new Date(category.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card.Header>
    <Card.Content className="flex-1">
      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" size="sm">
          {category.reportCount} reports
        </Badge>
        <Badge variant="outline" size="sm">
          {category.category}
        </Badge>
      </div>
    </Card.Content>
    <Card.Footer className="mt-auto">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Browse Reports
        </Button>
        <Button variant="primary" size="sm" className="flex-1">
          Generate New
        </Button>
      </div>
    </Card.Footer>
  </Card>
)

export { ReportingOverviewPage }
