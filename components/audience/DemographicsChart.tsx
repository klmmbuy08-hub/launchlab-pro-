interface DemographicsChartProps {
  demographics?: {
    age_ranges: { range: string; percentage: number }[]
    gender: { male: number; female: number; other: number }
    top_locations: { city: string; country: string; percentage: number }[]
  }
}

export function DemographicsChart({ demographics }: DemographicsChartProps) {
  if (!demographics) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">Demographics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Age Ranges */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Age Ranges</h4>
          <div className="space-y-3">
            {demographics.age_ranges.map((age, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">{age.range}</span>
                  <span className="text-sm font-semibold text-gray-900">{age.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${age.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Gender Distribution</h4>
          <div className="space-y-3">
            {[
              { label: 'Male', value: demographics.gender.male, color: 'bg-blue-500' },
              { label: 'Female', value: demographics.gender.female, color: 'bg-pink-500' },
              { label: 'Other', value: demographics.gender.other, color: 'bg-purple-500' },
            ].map((item, idx) => {
              const total = demographics.gender.male + demographics.gender.female + demographics.gender.other
              const percentage = total > 0 ? (item.value / total) * 100 : 0
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Top Locations</h4>
        <div className="space-y-2">
          {demographics.top_locations.slice(0, 5).map((location, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">{location.city}, {location.country}</span>
              <span className="text-sm font-semibold text-gray-900">{location.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}