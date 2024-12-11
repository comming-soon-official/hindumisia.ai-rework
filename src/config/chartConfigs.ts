import { PieData, PortalData } from '../types/sentiment'

export const getBarChartConfig = (
    portalData: PortalData[],
    {
        showLegend = true,
        legendPosition = 'top',
        barWidth = 30,
        barGap = '10%',
        // labelPosition = "right",
        colors = [
            'hsl(0, 100%, 50%)',
            'hsl(0, 0%, 70%)',
            'hsl(120, 100%, 35%)'
        ],
        orientation = 'horizontal',
        zoom = true,
        isDivergent = false
    } = {}
) => ({
    backgroundColor: 'transparent',
    textStyle: {
        color: 'var(--foreground)'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            shadowStyle: {
                color: 'var(--accent)'
            }
        },
        backgroundColor: 'var(--card)',
        borderWidth: 1,
        borderColor: 'var(--border)',
        padding: [10, 15],
        textStyle: {
            color: 'var(--card-foreground)'
        },
        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);'
    },
    legend: showLegend
        ? {
              data: ['Negative', 'Neutral', 'Positive'],
              orient: legendPosition === 'top' ? 'horizontal' : 'vertical',
              [legendPosition]: '10%',
              textStyle: {
                  color: 'var(--foreground)'
              },
              selectedMode: true,
              selector: [
                  { type: 'all', title: 'All' },
                  { type: 'inverse', title: 'Inverse' }
              ]
          }
        : undefined,
    grid: {
        left: '5%',
        right: orientation === 'horizontal' ? '12%' : '6%',
        bottom: zoom ? '20%' : '5%',
        top: '20%',
        containLabel: true
    },
    toolbox: {
        feature: {
            restore: {
                title: 'Reset'
            },
            saveAsImage: {
                title: 'Save'
            },
            dataView: {
                title: 'Data View',
                lang: ['Data View', 'Close', 'Refresh']
            },
            magicType: {
                type: ['line', 'bar', 'stack'],
                title: {
                    line: 'Switch to Line',
                    bar: 'Switch to Bar',
                    stack: 'Stack'
                }
            },
            brush: {
                type: ['lineX', 'clear']
            }
        },
        right: '10%',
        top: '3%'
    },
    dataZoom: zoom
        ? [
              {
                  type: 'slider',
                  show: true,
                  [orientation === 'horizontal' ? 'yAxisIndex' : 'xAxisIndex']:
                      [0],
                  left: orientation === 'horizontal' ? '93%' : '10%',
                  start: 0,
                  end: 100,
                  zoomLock: false,
                  filterMode: 'empty',
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
                  [orientation === 'horizontal' ? 'yAxisIndex' : 'xAxisIndex']:
                      [0],
                  start: 0,
                  end: 100,
                  zoomLock: false,
                  filterMode: 'empty',
                  zoomOnMouseWheel: 'shift'
              }
          ]
        : [],
    [orientation === 'horizontal' ? 'xAxis' : 'yAxis']: {
        type: 'value',
        scale: true,
        splitLine: {
            lineStyle: {
                color: '#eee',
                type: 'dashed'
            }
        },
        axisLabel: {
            color: 'var(--foreground)',
            fontSize: 12,
            formatter: isDivergent
                ? (value: number) => `${Math.abs(value)}%`
                : undefined
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'var(--muted-foreground)'
            }
        },
        ...(isDivergent ? { max: 100, min: -100 } : {})
    },
    [orientation === 'horizontal' ? 'yAxis' : 'xAxis']: {
        type: 'category',
        data: portalData.map((item) => item.name),
        axisLabel: {
            interval: 0,
            rotate: orientation === 'horizontal' ? 0 : 45,
            color: 'var(--foreground)',
            fontSize: 12
        },
        axisLine: {
            lineStyle: {
                color: 'var(--muted-foreground)'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'var(--border)'
            }
        }
    },
    series: isDivergent
        ? [
              {
                  name: 'Negative',
                  type: 'bar',
                  stack: 'left',
                  barWidth: barWidth,
                  barGap: barGap,
                  label: {
                      show: true,
                      position: 'insideLeft',
                      fontSize: 12,
                      formatter: (params: any) => `${Math.abs(params.value)}%`,
                      color: '#fff',
                      textBorderColor: '#000',
                      textBorderWidth: 2,
                      distance: 10
                  },
                  emphasis: {
                      focus: 'series',
                      itemStyle: {
                          shadowBlur: 10,
                          shadowColor: 'rgba(0,0,0,0.3)'
                      }
                  },
                  data: portalData.map((item) => -item.negative),
                  itemStyle: {
                      color: colors[0],
                      borderRadius: [5, 0, 0, 5],
                      borderColor: '#fff',
                      borderWidth: 1
                  }
              },
              {
                  name: 'Neutral',
                  type: 'bar',
                  stack: 'right',
                  barWidth: barWidth,
                  barGap: barGap,
                  label: {
                      show: true,
                      position: 'inside',
                      fontSize: 12,
                      formatter: (params: any) => `${params.value}%`,
                      color: '#fff',
                      textBorderColor: '#000',
                      textBorderWidth: 2
                  },
                  emphasis: {
                      focus: 'series',
                      itemStyle: {
                          shadowBlur: 10,
                          shadowColor: 'rgba(0,0,0,0.3)'
                      }
                  },
                  data: portalData.map((item) => item.neutral),
                  itemStyle: {
                      color: colors[1],
                      borderRadius: [0, 0, 0, 0],
                      borderColor: '#fff',
                      borderWidth: 1
                  }
              },
              {
                  name: 'Positive',
                  type: 'bar',
                  stack: 'right',
                  barWidth: barWidth,
                  barGap: barGap,
                  label: {
                      show: true,
                      position: 'inside',
                      fontSize: 12,
                      formatter: (params: any) => `${params.value}%`,
                      color: '#fff',
                      textBorderColor: '#000',
                      textBorderWidth: 2
                  },
                  emphasis: {
                      focus: 'series',
                      itemStyle: {
                          shadowBlur: 10,
                          shadowColor: 'rgba(0,0,0,0.3)'
                      }
                  },
                  data: portalData.map((item) => item.positive),
                  itemStyle: {
                      color: colors[2],
                      borderRadius: [0, 5, 5, 0],
                      borderColor: '#fff',
                      borderWidth: 1
                  }
              }
          ]
        : [
              {
                  name: 'Negative',
                  type: 'bar',
                  stack: 'total',
                  barWidth: barWidth,
                  barGap: barGap,
                  label: {
                      show: true,
                      position: 'inside',
                      fontSize: 12,
                      color: '#fff',
                      textBorderColor: '#000',
                      textBorderWidth: 2
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: portalData.map((item) => item.negative),
                  itemStyle: {
                      color: colors[0],
                      borderRadius: [5, 5, 0, 0],
                      borderColor: '#fff',
                      borderWidth: 1
                  }
              },
              {
                  name: 'Neutral',
                  type: 'bar',
                  stack: 'total',
                  barWidth: barWidth,
                  barGap: barGap,
                  label: {
                      show: true,
                      position: 'inside',
                      fontSize: 12,
                      color: '#fff',
                      textBorderColor: '#000',
                      textBorderWidth: 2
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: portalData.map((item) => item.neutral),
                  itemStyle: {
                      color: colors[1],
                      borderColor: '#fff',
                      borderWidth: 1
                  }
              },
              {
                  name: 'Positive',
                  type: 'bar',
                  stack: 'total',
                  barWidth: barWidth,
                  barGap: barGap,
                  label: {
                      show: true,
                      position: 'inside',
                      fontSize: 12,
                      color: '#fff',
                      textBorderColor: '#000',
                      textBorderWidth: 2
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: portalData.map((item) => item.positive),
                  itemStyle: {
                      color: colors[2],
                      borderRadius: [0, 0, 5, 5],
                      borderColor: '#fff',
                      borderWidth: 1
                  }
              }
          ]
})

export const getPieChartConfig = (
    pieData: PieData[],
    {
        showLegend = true,
        legendPosition = 'top',
        radius = ['35%', '60%'],
        center = ['50%', '50%'],
        roseType = false,
        labelPosition = 'outside',
        colors = ['hsl(0, 100%, 50%)', 'hsl(0, 0%, 70%)', 'hsl(120, 100%, 35%)']
    } = {}
) => ({
    backgroundColor: 'transparent',
    textStyle: {
        color: 'var(--foreground)'
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'var(--card)',
        borderWidth: 1,
        borderColor: 'var(--border)',
        padding: [10, 15],
        textStyle: {
            color: 'var(--card-foreground)'
        },
        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);',
        formatter: (params: any) => {
            return `<div style="color: var(--card-foreground)">
        ${params.name}<br/>
        <span style="color:${params.color}">●</span> 
        Value: ${params.value}<br/>
        Percentage: ${params.percent}%
      </div>`
        }
    },
    legend: showLegend
        ? {
              orient:
                  legendPosition === 'top' || legendPosition === 'bottom'
                      ? 'horizontal'
                      : 'vertical',
              [legendPosition]: legendPosition === 'top' ? '0%' : '0%',
              left:
                  legendPosition === 'left' || legendPosition === 'right'
                      ? '10%'
                      : 'center',
              textStyle: {
                  color: 'var(--foreground)'
              },
              selectedMode: true,
              selector: [
                  { type: 'all', title: 'All' },
                  { type: 'inverse', title: 'Inverse' }
              ],
              emphasis: {
                  selectorLabel: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(0,0,0,0.3)'
                  }
              }
          }
        : undefined,
    toolbox: {
        feature: {
            restore: {
                title: 'Reset'
            },
            saveAsImage: {
                title: 'Save'
            },
            dataView: {
                title: 'Data View',
                lang: ['Data View', 'Close', 'Refresh']
            }
        },
        right: '10%',
        top: '3%'
    },
    series: [
        {
            name: 'Sentiment',
            type: 'pie',
            radius: radius,
            center: center,
            roseType: roseType ? 'radius' : false,
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.3)'
            },
            label: {
                show: true,
                position: labelPosition,
                formatter: '{b}: {d}%',
                fontSize: 12,
                color: '#333',
                textBorderColor: '#fff',
                textBorderWidth: 2
            },
            labelLine: {
                show: labelPosition === 'outside',
                length: 10,
                length2: 10,
                smooth: true,
                lineStyle: {
                    width: 2,
                    type: 'solid'
                }
            },
            emphasis: {
                scale: true,
                scaleSize: 10,
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            },
            data: pieData,
            color: colors,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200
            }
        }
    ]
})

interface TrendsData {
    dates: string[]
    negative: number[]
    neutral: number[]
    positive: number[]
    total: number[]
}

export const generateTrendsData = (): TrendsData => {
    const dates = []
    const negative = []
    const neutral = []
    const positive = []
    const total = []

    let negativeVal = 45
    let neutralVal = 70
    let positiveVal = 10

    for (let i = 1; i <= 11; i++) {
        const date = `${i.toString().padStart(2, '0')} Nov 2024`
        dates.push(date)

        negativeVal += Math.random() * 8 - 4
        neutralVal += Math.random() * 10 - 5
        positiveVal += Math.random() * 4 - 2

        negativeVal = Math.max(30, Math.min(70, negativeVal))
        neutralVal = Math.max(60, Math.min(100, neutralVal))
        positiveVal = Math.max(5, Math.min(20, positiveVal))

        negative.push(Math.round(negativeVal))
        neutral.push(Math.round(neutralVal))
        positive.push(Math.round(positiveVal))
        total.push(Math.round(negativeVal + neutralVal + positiveVal))
    }

    return { dates, negative, neutral, positive, total }
}

export const getTrendsChartConfig = (data: TrendsData) => ({
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: [10, 15],
        textStyle: { color: '#333' },
        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);',
        formatter: (params: any[]) => {
            let result = `<div style="font-weight: bold; margin-bottom: 5px;">${params[0].axisValue}</div>`
            const colors = {
                Total: '#1a73e8',
                Negative: '#ff4444',
                Neutral: '#666666',
                Positive: '#4CAF50'
            }
            params.forEach((param) => {
                const color = colors[param.seriesName as keyof typeof colors]
                result += `<div style="color: ${color}; display: flex; justify-content: space-between; padding: 3px 0;">
                    <span style="margin-right: 15px;">${param.seriesName}:</span>
                    <span style="font-weight: bold;">${param.value}</span>
                  </div>`
            })
            return result
        }
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none',
                title: {
                    zoom: 'Zoom',
                    back: 'Reset Zoom'
                }
            },
            restore: {
                title: 'Reset'
            },
            dataView: {
                title: 'Data View',
                lang: ['Data View', 'Close', 'Refresh']
            },
            saveAsImage: {
                title: 'Save'
            },
            magicType: {
                type: ['line', 'bar', 'stack'],
                title: {
                    line: 'Switch to Line',
                    bar: 'Switch to Bar',
                    stack: 'Stack'
                }
            },
            brush: {
                type: ['lineX', 'clear']
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
            height: 20,
            bottom: 0,
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
            zoomLock: false,
            zoomOnMouseWheel: 'shift'
        }
    ],
    legend: {
        data: ['Total', 'Negative', 'Neutral', 'Positive'],
        bottom: '40px',
        textStyle: { color: 'var(--foreground)' },
        selectedMode: true,
        selector: [
            { type: 'all', title: 'All' },
            { type: 'inverse', title: 'Inverse' }
        ],
        emphasis: {
            selectorLabel: {
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.3)'
            }
        }
    },
    grid: {
        left: '5%',
        right: '6%',
        bottom: '120px',
        top: '80px',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.dates,
        axisLine: { lineStyle: { color: '#999', width: 2 } },
        axisLabel: {
            color: 'var(--foreground)',
            rotate: 45,
            formatter: (value: string) => value.split(' ')[0],
            fontSize: 12
        }
    },
    yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#eee', type: 'dashed' } },
        axisLabel: { color: '#666', fontSize: 12 },
        axisLine: { show: true, lineStyle: { color: '#999' } }
    },
    series: [
        {
            name: 'Total',
            type: 'line',
            data: data.total,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: { width: 3, color: '#1a73e8' },
            itemStyle: {
                color: '#1a73e8',
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: 'rgba(26, 115, 232, 0.3)',
                shadowBlur: 10
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
            data: data.negative,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: { width: 3, color: '#ff4444' },
            itemStyle: {
                color: '#ff4444',
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: 'rgba(255, 68, 68, 0.3)',
                shadowBlur: 10
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(255, 68, 68, 0.3)' },
                        { offset: 1, color: 'rgba(255, 68, 68, 0.1)' }
                    ]
                }
            }
        },
        {
            name: 'Neutral',
            type: 'line',
            data: data.neutral,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: { width: 3, color: '#666666' },
            itemStyle: {
                color: '#666666',
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: 'rgba(102, 102, 102, 0.3)',
                shadowBlur: 10
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(102, 102, 102, 0.3)' },
                        { offset: 1, color: 'rgba(102, 102, 102, 0.1)' }
                    ]
                }
            }
        },
        {
            name: 'Positive',
            type: 'line',
            data: data.positive,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: { width: 3, color: '#4CAF50' },
            itemStyle: {
                color: '#4CAF50',
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: 'rgba(76, 175, 80, 0.3)',
                shadowBlur: 10
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(76, 175, 80, 0.3)' },
                        { offset: 1, color: 'rgba(76, 175, 80, 0.1)' }
                    ]
                }
            }
        }
    ]
})
