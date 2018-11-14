<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
export default {
  props: {
      barData: {
        type: Object
      },
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '90%'
      },
      height: {
        type: String,
        default: '350px'
      }
  },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      setTimeout(() => {
        this.initChart()
      }, 2000)
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        const value = this.barData.a / 150
        let valueColor = ''
        if (value <= 0.47) {
          valueColor = 'red'
        } else if (value <= 0.57) {
          valueColor = 'orange'
        } else if (value <= 0.77) {
          valueColor = 'blue'
        } else if (value <= 0.87) {
          valueColor = 'green'
        } else if (value >= 0.87) {
          valueColor = 'green'
        }

        this.chart.setOption({
          backgroundColor: '#ffffff',
          series: [{
            name: '刻度',
            type: 'gauge',
            radius: '100%',
            min: 0,
            max: 150,
            splitNumber: 5, // 刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, 'rgba(0,0,0,0)']]
              }
            }, // 仪表盘轴线
            axisLabel: {
              show: true,
              color: '#000',
              distance: 30
            }, // 刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                color: '#fff',
                width: 1
              },
              length: -8
            }, // 刻度样式
            splitLine: {
              show: true,
              length: -35,
              lineStyle: {
                color: '#fff'
              }
            }, // 分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {

            type: 'gauge',
            radius: '90%',
            center: ['50%', '50%'],
            splitNumber: 0, // 刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 50,
                color: [
                  [
                    value, new echarts.graphic.LinearGradient(
                      0, 0, 1, 0, [{
                        offset: 0,
                        color: valueColor
                      },
                      {
                        offset: 1,
                        color: valueColor
                      }
                      ]
                    )
                  ],
                  [
                    1, 'rgb(238, 238, 238)'
                  ]
                ]
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, '-20%'], // x, y，单位px
              textStyle: {
                color: '#ddd',
                fontSize: 15
              }
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, 0],
              color: '#000',
              formatter: function(params) {
                return params
              },
              textStyle: {
                fontSize: 20
              }
            },
            data: [{
              name: '能力商',
              value: this.barData.a
            }]
          }]
        })
      }
    }
  }
</script>
