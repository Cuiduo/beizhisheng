<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

var colors = ['#1f4e8b', '#f19c38']

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

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: colors,
        grid: {
          right: '20%'
        },
        toolbox: {},
        legend: {
          data: ['智龄', '发育商(DQ)']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['大运动', '精细动作', '适应能力', '语言', '社交行为']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '智龄',
            min: 0,
            max: 100,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            type: 'value',
            name: '发育商(DQ)',
            min: 0,
            max: 130,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          }
        ],
        series: [
          {
            name: '智龄',
            type: 'bar',
            data: this.barData.a
          },
          {
            name: '发育商(DQ)',
            type: 'bar',
            yAxisIndex: 1,
            data: this.barData.b
          }
        ]
      })
    }
  }
}
</script>
