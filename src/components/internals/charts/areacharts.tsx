import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'

import useUniversalStore from '@/store/useUniversalStore'

const TrendsChart = () => {
    const { csvData, rangeFromDate, rangeToDate } = useUniversalStore()

    const chartData = useMemo(() => {
        if (!rangeFromDate || !rangeToDate)
            return {
                dates: [],
                negative: [],
                neutral: [],
                positive: [],
                total: []
            }

        // Create array of all dates in range
        const dates: string[] = []
        const currentDate = new Date(rangeFromDate)
        const endDate = new Date(rangeToDate)

        while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().split('T')[0])
            currentDate.setDate(currentDate.getDate() + 1)
        }

        // Initialize data map with all dates
        const dailyData = new Map<
            string,
            {
                negative: number
                neutral: number
                positive: number
                total: number
            }
        >()

        // Initialize all dates with zero counts
        dates.forEach((date) => {
            dailyData.set(date, {
                negative: 0,
                neutral: 0,
                positive: 0,
                total: 0
            })
        })

        // Process each data point
        csvData.forEach((item) => {
            if (!item.publishedDate) return

            // Convert DD-MM-YYYY to YYYY-MM-DD
            const [day, month, year] = item.publishedDate.split('-')
            const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(
                2,
                '0'
            )}`

            const itemDate = new Date(dateStr)
            itemDate.setHours(0, 0, 0, 0)

            if (itemDate >= rangeFromDate && itemDate <= rangeToDate) {
                const current = dailyData.get(dateStr) || {
                    negative: 0,
                    neutral: 0,
                    positive: 0,
                    total: 0
                }

                switch (item.sentiment.toLowerCase()) {
                    case 'negative':
                        current.negative++
                        break
                    case 'neutral':
                        current.neutral++
                        break
                    case 'positive':
                        current.positive++
                        break
                }
                current.total++
                dailyData.set(dateStr, current)
            }
        })

        // Convert map to arrays, maintaining date order
        return {
            dates: dates,
            negative: dates.map((date) => dailyData.get(date)?.negative || 0),
            neutral: dates.map((date) => dailyData.get(date)?.neutral || 0),
            positive: dates.map((date) => dailyData.get(date)?.positive || 0),
            total: dates.map((date) => dailyData.get(date)?.total || 0)
        }
    }, [csvData, rangeFromDate, rangeToDate])

    const option = {
        backgroundColor: 'transparent',
        textStyle: {
            color: 'var(--foreground)'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'var(--accent)'
                }
            },
            backgroundColor: 'var(--card)',
            borderWidth: 1,
            borderColor: 'var(--border)',
            padding: [10, 15],
            textStyle: {
                color: 'var(--card-foreground)'
            },
            formatter: function (params: any) {
                let tooltip = `<div style="color: var(--card-foreground)">
                    ${params[0].axisValue}<br/>`
                params.forEach((param: any) => {
                    tooltip += `${param.marker} ${param.seriesName}: ${param.value}<br/>`
                })
                tooltip += '</div>'
                return tooltip
            }
        },
        legend: {
            data: ['Total', 'Negative', 'Neutral', 'Positive'],
            textStyle: {
                color: 'var(--foreground)'
            },
            top: 0,
            selected: {
                Total: true,
                Negative: true,
                Neutral: true,
                Positive: true
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: { title: 'Save' },
                dataView: {
                    title: 'Data View',
                    lang: ['Data View', 'Close', 'Refresh']
                },
                restore: { title: 'Restore' },
                dataZoom: { title: 'Zoom' },
                magicType: {
                    type: ['line', 'bar', 'stack'],
                    title: {
                        line: 'Switch to Line',
                        bar: 'Switch to Bar',
                        stack: 'Stack'
                    }
                }
            },
            right: '10%',
            top: '3%'
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100,
                borderColor: 'transparent',
                backgroundColor: '#f5f5f5',
                fillerColor: 'rgba(26, 115, 232, 0.2)',
                handleStyle: {
                    color: '#1a73e8'
                },
                textStyle: {
                    color: '#666'
                }
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100,
                zoomOnMouseWheel: 'shift'
            }
        ],
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartData.dates,
            axisLabel: {
                color: 'var(--foreground)',
                formatter: (value: string) => {
                    const date = new Date(value)
                    return date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short'
                    })
                },
                rotate: 45
            },
            axisLine: {
                lineStyle: {
                    color: 'var(--muted-foreground)'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'var(--border)',
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: 'var(--foreground)'
            },
            axisLine: {
                lineStyle: {
                    color: 'var(--muted-foreground)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'var(--border)',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: 'Total',
                type: 'line',
                data: chartData.total,
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { width: 3, color: '#1a73e8' },
                itemStyle: {
                    color: '#1a73e8',
                    borderWidth: 2,
                    borderColor: '#fff'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(26, 115, 232, 0.3)' },
                            { offset: 1, color: 'rgba(26, 115, 232, 0.1)' }
                        ]
                    }
                }
            },
            {
                name: 'Negative',
                type: 'line',
                data: chartData.negative,
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { width: 3, color: 'hsl(0, 100%, 50%)' },
                itemStyle: {
                    color: 'hsl(0, 100%, 50%)',
                    borderWidth: 2,
                    borderColor: '#fff'
                }
            },
            {
                name: 'Neutral',
                type: 'line',
                data: chartData.neutral,
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { width: 3, color: 'hsl(0, 0%, 70%)' },
                itemStyle: {
                    color: 'hsl(0, 0%, 70%)',
                    borderWidth: 2,
                    borderColor: '#fff'
                }
            },
            {
                name: 'Positive',
                type: 'line',
                data: chartData.positive,
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { width: 3, color: 'hsl(120, 100%, 35%)' },
                itemStyle: {
                    color: 'hsl(120, 100%, 35%)',
                    borderWidth: 2,
                    borderColor: '#fff'
                }
            }
        ],
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut'
    }

    return (
        <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
        />
    )
}

export default TrendsChart
