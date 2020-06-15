<template>
	<div class="hyTable_box">
		<div class="hyTable" >
			<el-table border :ref='tableRef' :data="formatData" stripe highlight-current-row :row-key="getRowKeys" @cell-click='cellClick' @cell-dblclick='cellDblClick' @sort-change='sortChange' @row-click='rowClick' :height='height' :max-height='maxHeight' @selection-change="handleSelectionChange" @expand-change="handleExpandChange" :row-style="showRow" v-bind="$attrs" :header-cell-style='headerCellStyle' :cell-style='cellStyle' :size='size' :style="tableStyle">
				<!-- 是否多选 -->
				<el-table-column type="selection" width="55" v-if="ifHaveCheckBox" :reserve-selection="true" align='center'>
				</el-table-column>
				<!-- 是否单选 -->
				<el-table-column lable='' width="55" v-if="ifHaveRadio">
					<template slot-scope='scope'>
						<el-radio @change.native="getRadio(scope.row)" :label="radioMethod(scope.$index)" v-model="radioNum">&nbsp;</el-radio>
					</template>
				</el-table-column>
				<!-- 是否显示序列 -->
				<el-table-column type="index" width="80" label="序号" v-if="ifHaveIndex" align='center' :index='pageIndexMethod'>
				</el-table-column>
				<!-- 是否展开 -->
				<el-table-column v-if="ifIsExpand&&expandCloumns.length===0" width="150">
					<template slot-scope="scope">
						<span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
						<span class="tree-ctrl" v-if="iconShow(0, scope.row)" @click="toggleExpanded(scope.$index)">
							<i v-if="!scope.row._expanded" class="el-icon-plus pointer"></i>
							<i v-else class="el-icon-minus pointer"></i>
						</span>
						{{scope.$index}}
					</template>
				</el-table-column>
				<!-- table数据 -->
				<el-table-column v-for='(item) in column' :key='item.key' :sortable='item.sortable' :label='item.label' :align='item.align' :width="item.width" :show-overflow-tooltip=true>
					<template slot-scope="scope">
						<template  v-if="item.type !='slot'">
							<span v-if="scope.row[item.key]===undefined||scope.row[item.key]===null||scope.row[item.key]===''||scope.row[item.key].toString().trim()==''">--</span>
							<el-popover placement="top" trigger="hover" v-else-if='scope.row[item.key].toString().trim().length>showLen&&showLen>0&&showLen!=0' :content="scope.row[item.key].toString()">
								<span slot="reference">{{ `${scope.row[item.key].toString().trim().slice(0,showLen)}...` }}</span>
							</el-popover>
							<span v-else>{{ scope.row[item.key] }}</span>
						</template>
						<template v-else>
							<span v-if="scope.row[item.key]===undefined||scope.row[item.key]===null||scope.row[item.key]===''||scope.row[item.key].toString().trim()==''">--</span>
							<template v-else>
								<i  v-if="scope.row[item.key] == '是'" class="el-icon-check" style="font-size: 20px;"></i>
								<span v-else style="color: #ff8e35;">
									{{ scope.row[item.key] }}
								</span>
							</template>
						</template>
					</template>
				</el-table-column>
				<slot></slot>
				<!-- 修改删除操作 -->
				<el-table-column label='操作' align='left' width='150' v-if='isHaveOds||isHaveDw||isHaveOpen||isHaveEdit||isHaveDelete||isHaveSuspend||isHaveRecovery||isHaveAdd||isHaveChangePass||isHaveRoad'>
					<template slot-scope="scope">
						<el-tooltip content="详情" placement="top">
							<span v-if='isHaveOpen' @click.stop='openHandle(scope)' class="click">
								<img class="imgCom" src="../../assets/accessCatalog/detail.png">
								<img class="imgSel" src="../../assets/accessCatalog/detail_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="ODS表详情" placement="top">
							<span v-if='isHaveOds&&scope.row.odps_buf' @click.stop='openOds(scope)' class="click">
								<img class="imgCom" src="../../assets/accessCatalog/ods.png">
								<img class="imgSel" src="../../assets/accessCatalog/ods_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="DW表详情" placement="top">
							<span v-if='isHaveDw&&scope.row.odps_ods' @click.stop='openDw(scope)' class="click">
								<img class="imgCom" src="../../assets/accessCatalog/dw.png">
								<img class="imgSel" src="../../assets/accessCatalog/dw_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="修改" placement="top" v-if='isHaveEdit'>
							<span @click.stop='editHandle(scope)' class="click">
								<img class="imgCom" src="../../assets/accessCatalog/edit.png">
								<img class="imgSel" src="../../assets/accessCatalog/edit_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="删除" placement="top" v-if='isHaveDelete'>
							<span @click.stop='deleteHandle(scope)' class="click">
								<img class="imgCom" src="../../assets/accessCatalog/delete.png">
								<img class="imgSel" src="../../assets/accessCatalog/delete_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="新增" placement="top" v-if='isHaveAdd&&!scope.row.closeAdd'>
							<span @click.stop='addHandle(scope)' class="click">
								<img class="imgCom" src="../../assets/tableIcon/addNew.png">
								<img class="imgSel" src="../../assets/tableIcon/addNew_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="密码修改" placement="top" v-if='isHaveChangePass'>
							<span @click.stop='changePassHandle(scope)' class="click">
								<img class="imgCom" src="../../assets/tableIcon/password.png">
								<img class="imgSel" src="../../assets/tableIcon/password_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="暂停" placement="top" v-if='isHaveSuspend&&!scope.row.ifZ'>
							<span @click.stop='suspendHandle(scope)' class="click">
								<img class="imgCom" src="../../assets/tableIcon/timeout.png">
								<img class="imgSel" src="../../assets/tableIcon/timeout_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="恢复" placement="top" v-if='isHaveRecovery&&scope.row.ifZ'>
							<span @click.stop='recoveryHandle(scope)' class="click">
								<img class="imgCom" src="../../assets/tableIcon/restore.png">
								<img class="imgSel" src="../../assets/tableIcon/restore_hover.png">
							</span>
						</el-tooltip>
						<el-tooltip content="链路" placement="top">
							<span class="click" v-if='isHaveRoad' @click.stop='openRoad(scope)'>
								<img class="imgCom" src="../../assets/tableIcon/lianlu.png">
								<img class="imgSel" src="../../assets/tableIcon/lianlu_hover.png">
							</span>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div  class="pagination" v-if="ifHavePagi">
			<el-pagination v-show="pageTotal > 0" layout="total, sizes,prev, pager, next, jumper" :page-sizes="pageSizes" :total="pageTotal" :page-size='pageSize' :current-page='pageIndex' @current-change='pagiCurrentChange' @size-change="pagiSizeChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
/**
 * 必填
 * @param {tableData} 表格数据
 * @param {column} 表格头数据{key:'',label:''} key代表唯一ID值,label代表名称
 */

/**
 * 选填
 * @param {showLen} 表格内容显示多长(超过改长度的显示...)
 * @param {isHaveEdit} 是否有修改
 * @function editHandle(scope) 修改事件,scope为修改行数据
 * @param {isHaveDelete} 是否有删除
 * @function deleteHandle(scope) 删除事件,scope为删除行数据
 * @param {isHaveAdd} 是否有添加
 * @function addHandle(scope) 添加事件,scope为添加行数据
 * @param {isHaveChangePass} 是否有修改密码
 * @function changePassHandle(scope) 修改密码事件,scope为添加行数据
 * @param {isHaveSuspend} 是否有暂停
 * @function suspendHandle(scope) 暂停事件,scope为暂停行数据
 * @param {isHaveSuspend} 是否有恢复
 * @function recoveryHandle(scope) 恢复事件,scope为恢复行数据
 * @param {ifHaveCheckBox} 是否显示多选
 * @function handleSelectionChange(val) 多选事件 val为选中项数据
 * @param {ifHaveRadio} 是否显示单选
 * @function getRadio(row) 单选时间 row为选中数据
 * @param {ifIsExpand} 是否展示tableTree
 * @function handleExpandChange(val) 展开事件 val为展开项数据
 * @param {ifHaveIndex} 是否显示序列号
 */
import treeToArray from './eval'
export default {
	name: 'hyTable',
	props: {
		tableData: {
			type: Array,
			default:() => []
		},
		tableRef: {
			type: String,
			default:() => 'tableRef'
		},
		column: {
			type: Array,
			default:() => []
		},
		size:{
			type: String,
			default:()=>'mini'
		},
		tableStyle:{
			type: String,
			default:()=>'width: 100%'
		},
		expandCloumns: {
			type: Array,
			default: () => [{width: '100'}]
		},
		pageIndexMethod: {
			type: Function,
			default: () => {}
		}, 
		isHaveOpen: {
			type: Boolean,
			default:() => false
		},
		isHaveDw: {
			type: Boolean,
			default:() => false
		},
		isHaveOds: {
			type: Boolean,
			default:() => false
		},
		isHaveEdit: {
			type: Boolean,
			default:() => false
		},
		isHaveDelete: {
			type: Boolean,
			default:() => false
		},
		isHaveAdd: {
			type: Boolean,
			default:() => false
		},
		isHaveChangePass: {
			type: Boolean,
			default:() => false
		},
		isHaveSuspend: {
			type: Boolean,
			default:() => false
		},
		isHaveRecovery: {
			type: Boolean,
			default:() => false
		},
		isHaveRoad: {
			type: Boolean,
			default:() => false
		},
		tableName: {
			type: String,
			default:() => ''
		},
		//菜单导航栏85px，页面导航栏52px，tablemargin 20px，hynewform高度64px
		maxHeight: {
			type: Number,
			// default:() => 610
		},
		height: {
			type: Number,
			// default:() => 610
		},
		showLen: {
			type: Number,
			default:() => 0
		},
		ifHaveCheckBox: {
			type: Boolean,
			default:() => false
		},
		ifHaveRadio: {
			type: Boolean,
			default:()=> false
		},
		ifIsExpand: {
			type: Boolean,
			default:() => false
		},
		ifHaveIndex: {
			type: Boolean,
			default:() => false
		},
		ifHavePagi: {
			type: Boolean,
			default:() => false
		},
		// tableLength: {
		//   type: Number,
		//   default:() => 0
		// },
		pageTotal: {
			type: Number,
			default:() => 0
		},
		pageSizes: {
			type:Array,
			default() {
				return [5, 10, 15, 20, 30, 50]
			}
		},
		pageSize: {
			type: Number,
			default:() => 15
		},
		pageIndex: {
			type: Number,
			default:() => 1
		},
		evalFunc: Function,
		evalArgs: Array,
		expandAll: {
			type: Boolean,
			default: false
		},
		radio: {
			type: Number,
			default:() => -1
		},
		rowId: {
			type: String,
			default:() => 'id'
		}
	},
	data() {
		return {
			radioNum: this.radio
		}
	},
	computed: {
		// 格式化数据源
		formatData: function() {
			if(this.ifIsExpand){
				let tmp
				if (!Array.isArray(this.tableData)) {
					tmp = [this.tableData]
				} else {
					tmp = this.tableData
				}
				const func = this.evalFunc || treeToArray
				const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
				return func.apply(null, args)
			}else{
				return this.tableData
			}
		}
	},
	watch: {
		radio() {
			this.radioNum = this.radio
			console.log(this.radioNum, 319)
		},
		height(){
			console.log(this.height, 319)
		}
	},
	methods: {
		cellClick(e, i) {
			this.$emit('cellClick', e, i)
		},
		cellDblClick(e, i) {
			this.$emit('cellDblClick', e, i)
		},
		sortChange(column, prop, order) {
			this.$emit('sortChange', column, prop, order)
		},
		rowClick(e, i) {
			this.$emit('rowClick', e, i)
		},
		openHandle(scope) {
			this.$emit('openHandle', scope.row)
		},
		openDw(scope) {
			this.$emit('openDw', scope.row)
		},
		openOds(scope) {
			this.$emit('openOds', scope.row)
		},
		editHandle(scope) {
			this.$emit('editHandle', scope.row)
		},
		deleteHandle(scope) {
			this.$confirm('是否删除?',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>this.$emit('deleteHandle', scope.row,scope.$index))
			.catch(()=>{ return })
		},
		addHandle(scope){
			this.$emit('addHandle', scope)
		},
		changePassHandle(scope) {
			this.$emit('changePassHandle', scope)
		},
		suspendHandle(scope) {
			this.$emit('suspendHandle', scope)
		},
		recoveryHandle(scope) {
			this.$emit('recoveryHandle', scope)
		},
		openRoad(scope) {
			this.$emit('openRoad', scope.row)
		},
		handleSelectionChange(val) {
			this.$emit('handleSelectionChange', val)
		},
		handleExpandChange(val) {
			this.$emit('handleExpandChange', val)
		},
		pagiCurrentChange(val) {
			this.$emit('pagiCurrentChange', val, this.tableName)
		},
		pagiSizeChange(val) {
			this.$emit('pagiSizeChange', val, this.tableName)
		},
		getRadio(row) {
			this.$emit('getRadio', row, this.radioNum)
		},
		getRowKeys(row) {
			return row[this.rowId]
		},
		radioMethod(index) {
			return this.pageSize*(this.pageIndex-1)+index+1
		},
		showRow: function(row) {
			const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
			row.row._show = show
			return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
		},
		// 切换下级是否展开
		toggleExpanded: function(trIndex) {
			const record = this.formatData[trIndex]
			record._expanded = !record._expanded
		},
		toggleTable(row) {
			if(row) {
				this.$refs['tableRef'].toggleRowSelection(row)
			}else{
				this.$refs['tableRef'].clearSelection();
			}
		},
		// 图标显示
		iconShow(index, record) {
			return (index === 0 && record.children && record.children.length > 0)
		},
		cellStyle(param) {
			if (param.columnIndex === 0) {
				return {
					'text-align': 'left'
				}
			}
			return {}
		},
		headerCellStyle(param) {
			if (param.columnIndex === 0) {
				return {
					'text-align': 'left',
					'font-size': '14px'
				}
			}
			return {
				'font-size': '14px'
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.hyTable_box
	height 100%
	.hyTable
		min-height calc(100% - 40px)
		padding 5px 10px
		background-color #fff
.pointer
	cursor pointer
	margin 0 6px
.text 
	color #409eff
.pagination 
	background #fff
	text-align center
	height 40px
	display flex
	justify-content center
	align-items center
.el-table 
	overflow-x hidden
.click
	cursor pointer
	margin 3px
</style>
<style>
.el-table__body tr.current-row>td {
  background-color: #F0F9FB !important
}
</style>
