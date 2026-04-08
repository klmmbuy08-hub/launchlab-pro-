// ============================================
// Metrics Tracker
// Rastrea y compara métricas históricas
// ============================================

interface TimeSeriesData {
  date: string
  value: number
}

interface MetricComparison {
  current: number
  previous: number
  change: number
  change_percentage: number
  trend: 'up' | 'down' | 'stable'
}

export class MetricsTracker {
  compareMetrics(current: number, previous: number): MetricComparison {
    const change = current - previous
    const change_percentage = previous > 0 ? (change / previous) * 100 : 0

    let trend: 'up' | 'down' | 'stable' = 'stable'
    if (Math.abs(change_percentage) > 5) {
      trend = change_percentage > 0 ? 'up' : 'down'
    }

    return {
      current,
      previous,
      change,
      change_percentage,
      trend,
    }
  }

  calculateMovingAverage(data: TimeSeriesData[], window: number = 7): TimeSeriesData[] {
    if (data.length < window) return data

    const result: TimeSeriesData[] = []

    for (let i = window - 1; i < data.length; i++) {
      const windowData = data.slice(i - window + 1, i + 1)
      const average = windowData.reduce((sum, d) => sum + d.value, 0) / window

      result.push({
        date: data[i].date,
        value: average,
      })
    }

    return result
  }

  detectAnomalies(
    data: TimeSeriesData[],
    threshold: number = 2
  ): {
    date: string
    value: number
    deviation: number
  }[] {
    if (data.length < 3) return []

    const values = data.map((d) => d.value)
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)

    const anomalies: { date: string; value: number; deviation: number }[] = []

    data.forEach((point) => {
      const deviation = Math.abs(point.value - mean) / stdDev
      if (deviation > threshold) {
        anomalies.push({
          date: point.date,
          value: point.value,
          deviation,
        })
      }
    })

    return anomalies
  }

  predictNextValue(data: TimeSeriesData[]): number {
    if (data.length < 2) return data[data.length - 1]?.value || 0

    // Simple linear regression
    const n = data.length
    const x = data.map((_, i) => i)
    const y = data.map((d) => d.value)

    const sumX = x.reduce((sum, val) => sum + val, 0)
    const sumY = y.reduce((sum, val) => sum + val, 0)
    const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0)
    const sumX2 = x.reduce((sum, val) => sum + val * val, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    return slope * n + intercept
  }

  calculateGrowthRate(data: TimeSeriesData[]): number {
    if (data.length < 2) return 0

    const first = data[0].value
    const last = data[data.length - 1].value

    if (first === 0) return 0

    return ((last - first) / first) * 100
  }
}
