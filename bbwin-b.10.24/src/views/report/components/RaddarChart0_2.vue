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
      window.addEventListener('resize', this.__resizeHanlder);
      console.log(this.barData)
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
                { name: '关注度', max: 1 },
                { name: '生活的丰富多样性', max: 1 },
                { name: '参与', max: 1 },
                { name: '学习材料', max: 1 },
                { name: '养育\n环境', max: 1 },
                { name: '接纳', max: 1 }
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
          ]/*
          tooltip: {
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          title: {
            text: ''
          },
          legend: {
            data: ['']
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '关注度', max: 1 },
              { name: '生活的丰富多样性', max: 1 },
              { name: '参与', max: 1 },
              { name: '学习材料', max: 1 },
              { name: '养育环境', max: 1 },
              { name: '接纳', max: 1 }
            ]
          },
          series: [{
            name: '',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: this.barData.b
              }
            ]
          }]*/
        })
      }
    }
  }
</script>
