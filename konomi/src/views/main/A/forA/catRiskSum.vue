<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="width"
    fullscreen
    :show-close='false'
    id='print'
    style=",border:1px solid #000"
    >
    <!--startprint-->
    <div ref="print">
      <el-row :gutter="10">
        <el-col :span="17">

        </el-col>
        <el-col :span="7" style="">
          
        </el-col>
      </el-row>
      <div style='display:flex'>
        <el-table
          :data="tableData"
          highlight-current-row
          ref="singleTable"
        
          style="width: 100%;flex:1">
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
          <el-table-column
            prop="supplyCode"
            label="物资编码"
            width="width">
            </el-table-column>
            <el-table-column
            prop="supplyName"
            label="物资名称"
            width="width">
            </el-table-column>
            <el-table-column
            prop="supplyNeedCount"
            label="物资需求量"
            width="width">
            </el-table-column>
            <el-table-column
            prop="supplyComeBack"
            label="供应行复产情况"
            width="width">
            </el-table-column>
            <el-table-column
            prop="supplyAdjustability"
            label="物资可调性"
            width="width">
            </el-table-column>
            <el-table-column
            prop="riskIndex"
            label="风险指数"
            width="width">
            
            </el-table-column>
            <el-table-column
            prop="warnLevel"
            label="预警"
            width="width">
              <template slot-scope="scope">
                <div :style="{display:'inline-block',background:markColor[scope.row.warnLevel],height:'14px',width:'14px',borderRadius:'50%'}"></div>
              </template>
            </el-table-column>
        </el-table>
        <div ref='k' style="width:300px;height:30vh" class="chart-box"></div>
      </div>
      
    </div>
    <!--endprint-->
    <!-- <div slot="title" v-if="false">
      <el-button media='screen' type="primary" @click="print">确 定</el-button>
      <el-button style="media:screen"  @click="dialogVisible = false">取 消</el-button>
      <el-button media='screen' type="primary" @click="dialogVisible = false">确 定</el-button>
      
    </div> -->
    <div slot="footer" v-show="!printing">
      <el-button media='screen' type="primary" @click="print">打 印</el-button>
      <el-button style="media:screen"  @click="dialogVisible = false">关 闭</el-button>
      <!-- <el-button media='screen' type="primary" @click="dialogVisible = false">确 定</el-button> -->
      
    </div>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return{
    printing:false,
     dialogVisible:false,
     markColor:['没有','red','yellow','green'],
     char1: null,
     levelSumList:[],tableData:[],
    }
  },
  props:{
   
    
  },
  activated(){
    if (this.char1) {
      this.char1.resize()
    }
  },
  methods:{
    init(id){
      this.dialogVisible =true
      this.getDataList()
      
      
    },
    getDataList(){
      this.$http({
        method:'get',
        url:this.$http.adornUrl('/supply/supplyRisk/queryList'),
        params:{'page':1,'limit':100000}
      }).then((data)=>{
        //data to use
        if(data.data && data.data.code == 0 ||data.data.code == 200){
          var  use = JSON.parse(JSON.stringify(data.data.page.list))
          console.log(use)
          this.tableData = use
          this.setCurrent(this.tableData[0])
          // this.pageIndex = data.data.page.currPage
          // this.pageSize = data.data.page.pageSize
          // this.totalPage = data.data.page.totalPage
        }else{
          this.$message({
            message:'项目物资列表获取失败：'+data.msg,
            type:'warn'
          })
        }

      })
      this.$http({
        method:'get',
        url:this.$http.adornUrl('/supply/supplyRisk/queryWarningStatistics'),
        params:{'page':1,'limit':100000}
      }).then((data)=>{
        //data to use
        if(data.data && data.data.code == 0 ||data.data.code == 200){
         
            this.levelSumList = data.data.listCount.map(item=>item['count(1)'])
            this.$nextTick(()=>{
              this.ininchartbar()
            })
        }else{
          this.$message({
            message:'项目物资列表获取失败：'+data.msg,
            type:'warn'
          })
        }

      })
    },
    print(){
      // this.printing = true
      this.printing = true  // 隐藏因素
      console.log(document.getElementsByClassName('is-fullscreen'))
      document.getElementsByClassName('chart-box')[0].style.display="none"
      setTimeout(() => {
        print()
        
        document.getElementsByClassName('chart-box')[0].style.display="block"
        document.getElementsByClassName('is-fullscreen')[0].style.overflowX="auto"
        this.printing = false // 显示元素
      }, 50)
      // this.printing = false
    },
    ininchartbar () {
      var option = {
        
        title:{
          //text:'13543464',
          top:-10,
          //textAlign :'center',
          //left:80,
           subtext:'物资风险统计',
        },
        
        xAxis: {
          type: 'category',
          data: ['绿', '黄', '红'],
          axisLine:{
            lineStyle:{
              color:'#ccc'
            }
          },
          
        },
        yAxis: {
          type: 'value',
          splitLine:{
            show:false
          },
          axisLine:{
            lineStyle:{
              color:'#ccc'
            }
          },
          minorSplitLine :{
            show:false
          },
          axisTick:{
            show:false
          }
          
        },
        // grid:{
        //   bottom:20,
        //   left:30,
        //   right:10,
        //   top:50
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          
        },
        grid:{
          top:40,
          bottom:20,
          right:10,
          left:30
        },
        
        
        series: [{
          
          data:this.levelSumList,
          type: 'bar',
           barWidth : 16,
          itemStyle:{
            
            normal: {
              barBorderRadius: 8,  
                
                label: {
                    show: true,
                    position: 'top',
                    color:'#555'
                },
                
                color:  (params)=> {
                  var colorList = [
                    '#40e563', '#fde619', '#ed382e', '#34cf34',
                    '#6497ef', '#85802b', '#D7504B', '#C6E579',
                    '#F4E001', '#F0805A', '#26C0C0'
                  ]
                   return colorList[params.dataIndex]
                  // if(this.chosen2 == params.dataIndex){
                    
                  // }
                  // return '#666'
                }
            }
          }
        }]
      }
      this.char1 = this.$echarts.init(this.$refs.k)
      this.char1.setOption(option)
      window.addEventListener('resize', () => {
        this.char1.resize()
      })
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
  },

}
</script>

<style>
#print .el-dialog__header{
  padding: 0;
}
</style>