interface ContentFiltersProps {
  onFilterChange: (filter: string) => void
  totalContent: number
  topContent: number
}

export function ContentFilters({ onFilterChange, totalContent, topContent }: ContentFiltersProps) {
  const filters = [
    { id: 'all', label: 'All', count: totalContent },
    { id: 'post', label: 'Posts', count: totalContent },
    { id: 'reel', label: 'Reels', count: topContent },
    { id: 'story', label: 'Stories', count: 0 },
    { id: 'video', label: 'Videos', count: 0 },
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-400 transition whitespace-nowrap text-sm font-medium"
        >
          {filter.label}
          {filter.count > 0 && (
            <span className="ml-2 text-xs text-gray-500">({filter.count})</span>
          )}
        </button>
      ))}
    </div>
  )
}