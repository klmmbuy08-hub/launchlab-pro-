interface BudgetSummaryProps {
  totalBudget: number
  totalSpent: number
  activeCount: number
  averageROAS: number
}

export function BudgetSummary({ totalBudget, totalSpent, activeCount, averageROAS }: BudgetSummaryProps) {
  const remaining = totalBudget - totalSpent
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-blue-700 mb-1">Total Budget</p>
          <p className="text-2xl font-bold text-blue-900">${totalBudget.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-xs text-blue-700 mb-1">Spent</p>
          <p className="text-2xl font-bold text-blue-900">${totalSpent.toFixed(0)}</p>
          <div className="w-full bg-blue-300 rounded-full h-1 mt-2">
            <div
              className="bg-blue-700 h-1 rounded-full"
              style={{ width: `${Math.min(spentPercentage, 100)}%` }}
            />
          </div>
        </div>
        <div>
          <p className="text-xs text-blue-700 mb-1">Remaining</p>
          <p className="text-2xl font-bold text-green-600">${remaining.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-xs text-blue-700 mb-1">Avg ROAS</p>
          <p className="text-2xl font-bold text-purple-600">{averageROAS.toFixed(2)}x</p>
        </div>
      </div>
    </div>
  )
}