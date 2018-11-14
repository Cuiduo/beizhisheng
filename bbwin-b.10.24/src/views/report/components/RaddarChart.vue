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
      window.addEventListener('resize', this.__resizeHanlder);
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
      initChart(data) {
        this.chart = echarts.init(this.$el, 'macarons')          
        this.chart.setOption({
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {},
          toolbox: {
          },
          calculable: true,
          polar: [
            {
              indicator: [
                { name: '大运动', max: 130 },
                { name: '社交行为', max: 130 },
                { name: '语言', max: 130 },
                { name: '适应能力', max: 130 },
                { name: '精细\n动作', max: 130 }
              ],
              radius: 130
            }
          ],
          series: [
            {
              center: ['55%', '60%'],
              name: '',
              type: 'radar',
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default'
                  }
                }
              },
              data: [
                {
                  value: this.barData.c
                }
              ]
            }
          ]
        })
      }
    }
  }
</script>
