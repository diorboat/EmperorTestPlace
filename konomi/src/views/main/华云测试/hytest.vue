<template>
  <el-scrollbar style="height:100%" :noresize= 'true'>
      <h2>{{$store.getters.nmsl}}</h2>
      <hySearchForm  ref="formDataRef" :formConfig="searchFormConfig" :formData="searchFormData" :ifInLine="true" :clearAll="clearToolBar" :searchButtonsConfig2="searchButtonsConfig" @searchButtonClick="toolBarBtnClick">
        </hySearchForm>
      <hyNewTable
          ref="passTable"
          :tableData='tableData'
          :column='tableConfig'
          >
      </hyNewTable>
      <hyCountUp aid='countup' :startVal='5' :endVal='chartheight'></hyCountUp>
      <el-input-number v-model="chartheight"  :min="1" :max="1000" label="这是数字"></el-input-number>
      <img src="" alt=""  >
      
      <div>
        <hySplit :initialWidth="550" :move="true" color="#f5fafd">
          <div class="chart-body" :style="{'height':chartheight+'px'}" slot="left">
            <hyChart aid="call-statistic" :data="chartOptions"></hyChart>
          </div>
          <div class="nothing1" slot="right">background</div>
        </hySplit>
      </div>
      
    </el-scrollbar>
</template>

<script>
function AVue({methods}){
    for(let key in methods){
        this[key] = methods[key];
    }
}
function sk2(){
  this.FUCK = function (){console.log(123)}
  
}
sk2.prototype.$fq = function(){console.log('这里是fq')}
let sk = new sk2()
sk.$fq()
sk.FUCK()

import {table,searchForm,chartOptions} from './config.js'
//import func from '../../../../vue-temp/vue-editor-bridge';
const {tableConfig, tableData} =  table
const {searchFormConfig, searchFormData, searchButtonsConfig} =  searchForm
export default {
  data(){
    return{
      tableData,tableConfig,searchFormConfig, searchFormData, searchButtonsConfig,
      clearToolBar:true,
      chartheight:100,
      chartOptions: chartOptions,
    }
  },
  methods:{
    toolBarBtnClick(key){
      console.log(key)
    },
    test(){
      let l1 = [1,2]
      let l2 = [{num:1,mak:[1,2,3]},{num:1,mak:[1,3]},{num:1,mak:[1,2,3]},{num:1,mak:[1,2,3]}]
      l2.forEach(item=>item.list=[])
      l1.forEach(n=>{
        l2.forEach(item=>{
          for (var i = 0; i < item.mak.length; i++) {
            if(item.mak[i] == n){
              item.list = [n,...item.list]
            }
          }
        })
      })
      console.log(l2)
    }
  },
  mounted(){
    console.log(this.$store)
    this.test()
  }
}
</script>

<style lang="stylus" scoped>
.chart-body {
  width: calc(100% -140px);
  height: 320px
  
}
.nothing1 {
    line-height: 30px
    background-color:aqua
  }
</style>