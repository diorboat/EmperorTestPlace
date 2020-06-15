<template>
  <div class="mod-demo-echarts" id='nothing'>

        <div>
          whaT?
        </div>
        <div ref='k' style="width:100%;float:left;background-color:#ccc;height:500px" class="chart-box"></div>
    
    
        <div style="display:flex;flex-wrap:wrap;width:100vw;">
            <button style="width:10vw;height:59px" @mouseenter="chosen=i,ininchartbar()" v-for="i in list" :key='i'>{{i}}</button>
        </div>
      {{chosen}}
  </div>
  
</template>

<script>
import echarts from 'echarts'
import zhejiang from 'echarts/map/json/province/zhejiang.json'
export default {
  data () {
    return {
      char1: null,
      char2: null,
      chosen: -1,
      list:[0,1,2,3,4,5,6],
      t1:null,
    }
  },
  activated () {
    if (this.char1) {
      this.char1.resize()
    }

    // if (this.char2) {
    //   this.char2.resize()
    // }
  },
  mounted () {
    this.ininchartbar()
    // this.t1 = setInterval(() => {
    //   this.chosen++
    //   if(this.chosen == 7){
    //     this.chosen = 0
    //   }
    //   this.ininchartbar()
    // }, 50);
    // this.initchartmap()
  },
  methods: {
    ininchartbar () {
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        title:{
          text:'13543464'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (v) {
            return '智商' + v[0].value + '</br><img style="width:50px" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1753866946,2964754080&fm=26&gp=0.jpg" alt="3158">'
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          itemStyle:{
            normal: {
                label: {
                    show: true,

                    position: 'top'
                },
                color:  (params)=> {
                  var colorList = [
                    '#ff7e50', '#97d3f9', '#dd70d9', '#34cf34',
                    '#6497ef', '#85802b', '#D7504B', '#C6E579',
                    '#F4E001', '#F0805A', '#26C0C0'
                  ]
                  if(this.chosen == params.dataIndex){
                    return colorList[this.chosen]
                  }
                  return '#666'
                }
            }
        }
        }]
      }
      this.char1 = echarts.init(this.$refs.k)
      this.char1.setOption(option)
      window.addEventListener('resize', () => {
        this.char1.resize()
      })
    }
  }
}
</script>

<style>

</style>