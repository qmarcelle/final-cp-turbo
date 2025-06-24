import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { DashboardLayout } from '../../templates/DashboardLayout/DashboardLayout'
import { StatBlock } from '../../molecules/StatBlock/StatBlock'
import { Card } from '../../molecules/Card/Card'
import { Button } from '../../atoms/Button/Button'
import { Badge } from '../../atoms/Badge/Badge'
import { Select } from '../../atoms/Select/Select'
import { Input } from '../../atoms/Input/Input'
import {
  mockCommissionSummary,
  mockGroups,
  mockBrokers,
  generateRandomCommission,
} from '../../utils/mockData'
import { User } from '../../organisms/SiteHeader/SiteHeader'

export interface BookOfBusinessPageProps {
  /** Current user information */
  user?: User
  /** Loading state */
  loading?: boolean
  /** Error message */
  error?: string
  /** Number of notifications */
  notificationCount?: number
  /** Whether to show filters sidebar */
  showFilters?: boolean
  /** Default time period */
  defaultPeriod?: string
  /** Default broker selection */
  defaultBroker?: string
}

interface FilterState {
  period: string
  broker: string
  status: string
  planType: string
  searchTerm: string
}

const BookOfBusinessPage = React.forwardRef<
  HTMLDivElement,
  BookOfBusinessPageProps
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
      showFilters = true,
      defaultPeriod = 'ytd',
      defaultBroker = 'all',
      ...props
    },
    ref
  ) => {
    const [filters, setFilters] = useState<FilterState>({
      period: defaultPeriod,
      broker: defaultBroker,
      status: 'all',
      planType: 'all',
      searchTerm: '',
    })

    const [viewType, setViewType] = useState<'summary' | 'detailed'>('summary')

    // Generate extended commission data for demonstration
    const allCommissionData = generateRandomCommission(15)
    const commissionData = mockCommissionSummary[0]

    // Filter data based on current filters
    const filteredGroups = mockGroups.filter(group => {
      if (filters.status !== 'all' && group.status !== filters.status)
        return false
      if (filters.planType !== 'all' && group.planType !== filters.planType)
        return false
      if (
        filters.searchTerm &&
        !group.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
        return false
      return true
    })

    const updateFilter = (key: keyof FilterState, value: string) => {
      setFilters(prev => ({ ...prev, [key]: value }))
    }

    // Filters Sidebar
    const FiltersSidebar = () => {
      const methods = useForm({
        defaultValues: {
          period: filters.period,
          broker: filters.broker,
          status: filters.status,
          planType: filters.planType,
        },
      })

      const onSubmit = (data: any) => {
        Object.entries(data).forEach(([key, value]) => {
          updateFilter(key as keyof FilterState, value as string)
        })
      }

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Report Filters
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period
                  </label>
                  <Select
                    name="period"
                    control={methods.control}
                    options={[
                      { value: 'ytd', label: 'Year to Date' },
                      { value: 'q4', label: 'Q4 2024' },
                      { value: 'q3', label: 'Q3 2024' },
                      { value: 'q2', label: 'Q2 2024' },
                      { value: 'q1', label: 'Q1 2024' },
                      { value: 'custom', label: 'Custom Range' },
                    ]}
                    placeholder="Select time period..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Broker
                  </label>
                  <Select
                    name="broker"
                    control={methods.control}
                    options={[
                      { value: 'all', label: 'All Brokers' },
                      ...mockBrokers.map(broker => ({
                        value: broker.id,
                        label: broker.name,
                      })),
                    ]}
                    placeholder="Select broker..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Select
                    name="status"
                    control={methods.control}
                    options={[
                      { value: 'all', label: 'All Statuses' },
                      ...Array.from(
                        new Set(mockGroups.map(group => group.status))
                      ).map(status => ({
                        value: status,
                        label: status.charAt(0).toUpperCase() + status.slice(1),
                      })),
                    ]}
                    placeholder="Select status..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Type
                  </label>
                  <Select
                    name="planType"
                    control={methods.control}
                    options={[
                      { value: 'all', label: 'All Plan Types' },
                      ...Array.from(
                        new Set(mockGroups.map(group => group.planType))
                      ).map(type => ({
                        value: type,
                        label: type,
                      })),
                    ]}
                    placeholder="Select plan type..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Groups
                  </label>
                  <Input
                    type="search"
                    placeholder="Search by group name..."
                    value={filters.searchTerm}
                    onChange={e => updateFilter('searchTerm', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mb-2"
                onClick={() => {
                  methods.reset({
                    period: defaultPeriod,
                    broker: defaultBroker,
                    status: 'all',
                    planType: 'all',
                  })
                  setFilters({
                    period: defaultPeriod,
                    broker: defaultBroker,
                    status: 'all',
                    planType: 'all',
                    searchTerm: '',
                  })
                }}
              >
                Reset Filters
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Stats
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {filteredGroups.length}
                  </p>
                  <p className="text-xs text-gray-500">Total Groups</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    {filteredGroups.filter(g => g.status === 'active').length}
                  </p>
                  <p className="text-xs text-green-600">Active Groups</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">
                    {filteredGroups.filter(g => g.status === 'pending').length}
                  </p>
                  <p className="text-xs text-yellow-600">Pending Groups</p>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      )
    }

    // Main Content
    const MainContent = () => (
      <div className="space-y-8">
        {/* Summary Statistics */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Business Performance
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewType === 'summary' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewType('summary')}
              >
                Summary
              </Button>
              <Button
                variant={viewType === 'detailed' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewType('detailed')}
              >
                Detailed
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBlock
              value={commissionData.totalCommission}
              label="Total Commission"
              subtitle={`${filters.period.toUpperCase()} Performance`}
              format="currency"
              variant="success"
              trend={{
                value: 15.8,
                direction: 'up',
                period: 'vs last period',
              }}
            />
            <StatBlock
              value={commissionData.groupCount}
              label="Active Groups"
              format="number"
              variant="info"
              trend={{
                value: 8.3,
                direction: 'up',
                period: 'vs last month',
              }}
            />
            <StatBlock
              value={commissionData.memberCount}
              label="Total Members"
              format="number"
              subtitle="Across all groups"
            />
            <StatBlock
              value={commissionData.averageCommissionRate}
              label="Avg Commission Rate"
              format="number"
              variant="default"
            />
          </div>
        </div>

        {/* Groups Table/Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Groups ({filteredGroups.length})
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
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
                Export
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
                Add Group
              </Button>
            </div>
          </div>

          {viewType === 'summary' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGroups.map(group => (
                <Card key={group.id} hoverable>
                  <Card.Header>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {group.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {group.groupNumber}
                        </p>
                      </div>
                      <Badge
                        variant={
                          group.status === 'active'
                            ? 'success'
                            : group.status === 'pending'
                              ? 'warning'
                              : 'error'
                        }
                      >
                        {group.status}
                      </Badge>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Plan Type</p>
                          <Badge variant="outline" size="sm">
                            {group.planType}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-gray-500">Members</p>
                          <p className="font-semibold">{group.memberCount}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Premium</p>
                          <p className="font-semibold">
                            ${group.premiumAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Renewal</p>
                          <p className="text-gray-700">
                            {new Date(group.renewalDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                  <Card.Footer>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="primary" size="sm" className="flex-1">
                        Manage
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <Card.Content className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Group
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plan Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Members
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Renewal
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredGroups.map(group => (
                        <tr key={group.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {group.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {group.groupNumber}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{group.planType}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {group.memberCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${group.premiumAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                group.status === 'active'
                                  ? 'success'
                                  : group.status === 'pending'
                                    ? 'warning'
                                    : 'error'
                              }
                            >
                              {group.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(group.renewalDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* Commission Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Commission Activity
          </h2>
          <Card>
            <Card.Content className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Group
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Members
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allCommissionData.slice(0, 10).map(commission => (
                      <tr key={commission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {commission.groupName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {commission.groupNumber}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{commission.planType}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {commission.memberCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${commission.commissionAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {commission.commissionRate}% rate
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              commission.status === 'paid'
                                ? 'success'
                                : commission.status === 'pending'
                                  ? 'warning'
                                  : 'secondary'
                            }
                          >
                            {commission.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(
                            commission.paymentDate
                          ).toLocaleDateString()}
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
        title="Book of Business"
        subtitle="Comprehensive view of your group portfolio and commission performance"
        user={user}
        activePath="/broker/reporting/book-of-business"
        showSidebar={showFilters}
        sidebar={showFilters ? <FiltersSidebar /> : undefined}
        showBreadcrumbs={true}
        breadcrumbs={[
          { label: 'Dashboard', href: '/broker/dashboard' },
          { label: 'Reporting', href: '/broker/reporting' },
          { label: 'Book of Business' },
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
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Export Report
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
              Add Group
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

BookOfBusinessPage.displayName = 'BookOfBusinessPage'

export { BookOfBusinessPage }
