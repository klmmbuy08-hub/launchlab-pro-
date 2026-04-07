'use client'

import { useEffect, useState } from 'react'
import { useContentCalendar, useAccounts } from '@/lib/hooks/v2'
import { CalendarView } from './CalendarView'
import { ApprovalQueue } from './ApprovalQueue'
import { PlanningForm } from './PlanningForm'

interface ContentPlannerProps {
  accountId?: string
}

export function ContentPlanner({ accountId }: ContentPlannerProps) {
  const { entries, fetchCurrentMonthEntries, addCalendarEntry } = useContentCalendar()
  const { accounts, fetchAccounts } = useAccounts()
  const [selectedAccount, setSelectedAccount] = useState<string | null>(accountId || null)
  const [showPlanForm, setShowPlanForm] = useState(false)

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  useEffect(() => {
    if (selectedAccount) {
      fetchCurrentMonthEntries(selectedAccount)
    }
  }, [selectedAccount, fetchCurrentMonthEntries])

  const handleAddContent = async (data: any) => {
    if (!selectedAccount) return
    await addCalendarEntry({
      ...data,
      account_id: selectedAccount,
      user_id: '',
    } as any)
    setShowPlanForm(false)
  }

  const pendingApprovals = entries.filter(e => e.status === 'planned')
  const approvedContent = entries.filter(e => e.status === 'approved')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Content Planner</h2>
        <button
          onClick={() => setShowPlanForm(true)}
          disabled={!selectedAccount}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          + Plan Content
        </button>
      </div>

      {/* Account Selector */}
      {accounts.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition ${
                selectedAccount === account.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {account.username}
            </button>
          ))}
        </div>
      )}

      {selectedAccount ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <CalendarView entries={entries} />
          </div>

          {/* Queue & Stats */}
          <div className="space-y-6">
            <ApprovalQueue pending={pendingApprovals} />

            {/* Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Planning Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Scheduled</span>
                  <span className="font-bold text-gray-900">{entries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Approval</span>
                  <span className="font-bold text-yellow-600">{pendingApprovals.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approved</span>
                  <span className="font-bold text-green-600">{approvedContent.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Published</span>
                  <span className="font-bold text-blue-600">
                    {entries.filter(e => e.status === 'published').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">Select an account to start planning content</p>
        </div>
      )}

      {/* Planning Form Modal */}
      {showPlanForm && (
        <PlanningForm
          onClose={() => setShowPlanForm(false)}
          onSubmit={handleAddContent}
        />
      )}
    </div>
  )
}