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
        default: '300px'
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

        this.chart.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              var tar
              if (params[1].value !== '-') {
                tar = params[1]
              } else {
                tar = params[0]
              }
              return tar.name + '<br/>' + tar.seriesName
            }
          },
          legend: {
            data: ['', '']
          },
          grid: {
            left: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            splitLine: { },
            data: ['关注度', '接纳', '养育环境', '学习材料', '参与', '生活丰富多样性', '总分'],
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                normal: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
                }
              },
              data: this.barData.a1
            },
            {
              name: '',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                normal: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'red'
                },
                emphasis: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'red'
                }
              },
              label: {},
              data: this.barData.a2
            },
            {
              name: '',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                normal: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'green'
                },
                emphasis: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'green'
                }
              },
              label: {},
              data: this.barData.a3
            }
          ]
        })
      }
    }
  }
</script>
