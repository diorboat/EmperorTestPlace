<template>
  <div>
		<el-dialog :close-on-click-modal="false" class="innerDialog" :visible.sync='searchFormVisible' title="多值查询" width="820px" @close='innerDialogClose'>
      <div class="dialog_box">
        <el-row :gutter='20'>
          <el-col :span='14'>
            <hyNewForm :formData="innerFormData" :formConfig="formConfig" @inputBlur='inputChange'></hyNewForm>
          </el-col>
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">1.输入技术名称，名与名之间用空格隔开。<br/>2.可以通过execl表格，复制一列，粘贴即可。</div>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-col>
          <el-col :span="8">
            <div class="moreSearchButton">
              <el-button class="search" size="small" type='primary' @click='innerSearchButtonClick(0)'>
								<img style="margin:0 5px 0 0" src="../../assets/search.png" width="12" height="12" />查询</el-button>
              <el-button class="reset" type='primary' size="small" @click="innerSearchButtonClick(1)">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <hyTable
					:tableData='innerTableDataItem'
					:ifHaveIndex='true'
					:column='column'
					:height='400'
					:pageIndexMethod="innerPageIndexMethod"
        ></hyTable>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import { innerFormConfig,innerTableConfig,innerSearchButtonsConfig } from './config'
export default {
	name: 'moreConditionSearch',
	props: {
		searchFormVisible: {
      type: Boolean,
      default:() => false
    },
	},
	data() {
		return{
			formConfig: innerFormConfig,
      column: innerTableConfig,
      innerButtonConfig: innerSearchButtonsConfig,
			innerTableDataItem: [],
			innerFormData: {
				search: ''
			}
		}
	},
	methods: {
		innerSearchButtonClick(id) {
      switch (id) {
        case 0:
          this.$emit('innerSearch',this.innerFormData.search)
          setTimeout(()=>{
            this.searchFormVisible = false
          },800)
          break;
        case 1:
          this.innerFormData.search = ''
          this.innerTableDataItem = []
          break;
      }
    },
    inputChange() {
      var arr = this.innerFormData.search.split(' ')
      this.innerTableDataItem = []
      this.moreCondition = ''
      for(let i=0;i<arr.length;i++) {
        if(arr[i]) {
          this.innerTableDataItem.push({techName: arr[i]})
          this.moreCondition += arr[i] + ','
        }
      }
		},
		innerDialogClose() {
      this.searchFormVisible = false
      this.innerFormData.search = ''
			this.innerTableDataItem = []
			this.$emit('innerClose')
		},
		innerPageIndexMethod(index) {
      return index + 1
    },
	}
}
</script>

<style>
	.innerDialog .item {
    margin-top: 25px;
  }
</style>
