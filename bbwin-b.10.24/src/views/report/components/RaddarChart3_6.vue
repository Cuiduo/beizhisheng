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
        default: '100%'
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
                { name: '育儿观念', max: 1 },
                { name: '安全和居住环境', max: 1 },
                { name: '玩耍和娱乐', max: 1 },
                { name: '语言环境', max: 1 },
                { name: '学习环境', max: 1 },
                { name: '养育关系\n和沟通', max: 1 },
                { name: '规矩\n或自\n我调\n控能\n力', max: 1 },
                { name: '关注和接纳', max: 1 }
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
                  value: this.barData.b
                }
              ]
            }
          ]
        })
      }
    }
  }
</script>
