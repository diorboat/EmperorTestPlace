<template>
	<el-submenu v-if="sunmenuData.children&&sunmenuData.children.length>0"
		:index="sunmenuData.path?sunmenuData.path:sunmenuData.id">
		<template slot="title">
			<span slot="title" :style="{color: (sunmenuData.title == '数据资源中心' && $route.path == '/main/resourceHome')? 'rgba(0,0,0,0)' : ''}" @click="selectedFun(sunmenuData)" >{{sunmenuData.title}}</span>
		</template>
		<Submenu 
			v-for="item in sunmenuData.children" 
			rank="three"
			:sunmenuData="item"
			:key="item.id" >
		</Submenu>
	</el-submenu>
	
	<el-menu-item
		v-else
		:index="sunmenuData.path?sunmenuData.path:sunmenuData.id"
		>
		<span slot='title'>{{ sunmenuData.title }}</span>
	</el-menu-item>

</template>
<script>
// 三级菜单
import selected from '../../assets/menuIcon/icon/select.png'
import unselected from '../../assets/menuIcon/icon/unselect.png'
// 二级菜单
// 对外服务
import sjzyml from '../../assets/menuIcon/unselected/sjzyml.png'
import sjzyml_nor from '../../assets/menuIcon/selected/sjzyml.png'
import sjjrcx from '../../assets/menuIcon/unselected/sjjrcx.png'
import sjjrcx_nor from '../../assets/menuIcon/selected/sjjrcx.png'
import sjsysq from '../../assets/menuIcon/unselected/sjsysq.png'
import sjsysq_nor from '../../assets/menuIcon/selected/sjsysq.png'
import sjfwsq from '../../assets/menuIcon/unselected/sjfwsq.png'
import sjfwsq_nor from '../../assets/menuIcon/selected/sjfwsq.png'
import ptzysq from '../../assets/menuIcon/unselected/ptzysq.png'
import ptzysq_nor from '../../assets/menuIcon/selected/ptzysq.png'
import wddb from '../../assets/menuIcon/unselected/wddb.png'
import wddb_nor from '../../assets/menuIcon/selected/wddb.png'
import sjwttb from '../../assets/menuIcon/unselected/sjwttb.png'
import sjwttb_nor from '../../assets/menuIcon/selected/sjwttb.png'
// 运营管理
import sjkfgfjh from '../../assets/menuIcon/unselected/sjkfgfjh.png'
import sjkfgfjh_nor from '../../assets/menuIcon/selected/sjkfgfjh.png'
import ptzhqxgl from '../../assets/menuIcon/unselected/ptzhqxgl.png'
import ptzhqxgl_nor from '../../assets/menuIcon/selected/ptzhqxgl.png'
import yyxmtzgl from '../../assets/menuIcon/unselected/yyxmtzgl.png'
import yyxmtzgl_nor from '../../assets/menuIcon/selected/yyxmtzgl.png'
import rdsSjzyml from '../../assets/menuIcon/unselected/rdsSjzyml.png'
import rdsSjzyml_nor from '../../assets/menuIcon/selected/rdsSjzyml.png'
import ywsjgl from '../../assets/menuIcon/unselected/ywsjgl.png'
import ywsjgl_nor from '../../assets/menuIcon/selected/ywsjgl.png'
// 运营监控
import basePtzybcjk from '../../assets/menuIcon/unselected/basePtzybcjk.png'
import basePtzybcjk_nor from '../../assets/menuIcon/selected/basePtzybcjk.png'
import rdsTbzyjk from '../../assets/menuIcon/unselected/rdsTbzyjk.png'
import rdsTbzyjk_nor from '../../assets/menuIcon/selected/rdsTbzyjk.png'
import oggYxjk from '../../assets/menuIcon/unselected/oggYxjk.png'
import oggYxjk_nor from '../../assets/menuIcon/selected/oggYxjk.png'
import ybjgbgjk from '../../assets/menuIcon/unselected/ybjgbgjk.png'
import ybjgbgjk_nor from '../../assets/menuIcon/selected/ybjgbgjk.png'
import rdsAccount from '../../assets/menuIcon/unselected/rdsAccount.png'
import rdsAccount_nor from '../../assets/menuIcon/selected/rdsAccount.png'
import baseMonitor from '../../assets/menuIcon/unselected/baseMonitor.png'
import baseMonitor_nor from '../../assets/menuIcon/selected/baseMonitor.png'
// 运维自动化
import odpsPljbExcel from '../../assets/menuIcon/unselected/odpsPljbExcel.png'
import odpsPljbExcel_nor from '../../assets/menuIcon/selected/odpsPljbExcel.png'
import odpsPzwjsc from '../../assets/menuIcon/unselected/odpsPzwjsc.png'
import odpsPzwjsc_nor from '../../assets/menuIcon/selected/odpsPzwjsc.png'
import odpsZlhbjb from '../../assets/menuIcon/unselected/odpsZlhbjb.png'
import odpsZlhbjb_nor from '../../assets/menuIcon/selected/odpsZlhbjb.png'
import odpsPljb from '../../assets/menuIcon/unselected/odpsPljb.png'
import odpsPljb_nor from '../../assets/menuIcon/selected/odpsPljb.png'
import odpsQlzzljb from '../../assets/menuIcon/unselected/odpsQlzzljb.png'
import odpsQlzzljb_nor from '../../assets/menuIcon/selected/odpsQlzzljb.png'
// 知识目录
import qwjs from '../../assets/menuIcon/unselected/qwjs.png'
import qwjs_nor from '../../assets/menuIcon/selected/qwjs.png'
import wjsc from '../../assets/menuIcon/unselected/wjsc.png'
import wjsc_nor from '../../assets/menuIcon/selected/wjsc.png'
// 定义中心
import user from '../../assets/menuIcon/unselected/user.png'
import user_nor from '../../assets/menuIcon/selected/user.png'
import role from '../../assets/menuIcon/unselected/role.png'
import role_nor from '../../assets/menuIcon/selected/role.png'
import menu from '../../assets/menuIcon/unselected/menu.png'
import menu_nor from '../../assets/menuIcon/selected/menu.png'
import page from '../../assets/menuIcon/unselected/page.png'
import page_nor from '../../assets/menuIcon/selected/page.png'
import constant from '../../assets/menuIcon/unselected/constant.png'
import constant_nor from '../../assets/menuIcon/selected/constant.png'
import userGroup from '../../assets/menuIcon/unselected/userGroup.png'
import userGroup_nor from '../../assets/menuIcon/selected/userGroup.png'
import organization from '../../assets/menuIcon/unselected/organization.png'
import organization_nor from '../../assets/menuIcon/selected/organization.png'
import apply from '../../assets/menuIcon/unselected/apply.png'
import apply_nor from '../../assets/menuIcon/selected/apply.png'
// 权限配置
import role_qx from '../../assets/menuIcon/unselected/role_qx.png'
import role_qx_nor from '../../assets/menuIcon/selected/role_qx.png'
import personal_qx from '../../assets/menuIcon/unselected/personal_qx.png'
import personal_qx_nor from '../../assets/menuIcon/selected/personal_qx.png'
//消息中心
import msgSend from '../../assets/menuIcon/unselected/msgSend.png'
import msgSend_nor from '../../assets/menuIcon/selected/msgSend.png'
import msgReceive from '../../assets/menuIcon/unselected/msgReceive.png'
import msgReceive_nor from '../../assets/menuIcon/selected/msgReceive.png'
// 配置中心
import dsrwgl from '../../assets/menuIcon/unselected/dsrwgl.png'
import dsrwgl_nor from '../../assets/menuIcon/selected/dsrwgl.png'
import dataConfig from '../../assets/menuIcon/unselected/dataConfig.png'
import dataConfig_nor from '../../assets/menuIcon/selected/dataConfig.png'
//审计中心
import loginAudit from '../../assets/menuIcon/unselected/loginAudit.png'
import loginAudit_nor from '../../assets/menuIcon/selected/loginAudit.png'
import errorLog from '../../assets/menuIcon/unselected/errorLog.png'
import errorLog_nor from '../../assets/menuIcon/selected/errorLog.png'

export default {
	name: 'Submenu',
	props: {
		sunmenuData:{
			type: Object,
			default() {
				return {}
			}
		},
		rank:{
			type: String,
			default() {
				return ""
			}
		}
	},
	data(){
		return {
			select: false,
			// 三级菜单
			selected: selected,
			unselected: unselected,
			imgObj:{
				// 对外服务
				sjzyml: sjzyml,
				sjzyml_nor: sjzyml_nor,
				sjjrcx: sjjrcx,
				sjjrcx_nor: sjjrcx_nor,
				sjsysq: sjsysq,
				sjsysq_nor: sjsysq_nor,
				sjfwsq: sjfwsq,
				sjfwsq_nor: sjfwsq_nor,
				ptzysq: ptzysq,
				ptzysq_nor: ptzysq_nor,
				wddb: wddb,
				wddb_nor: wddb_nor,
				sjwttb: sjwttb,
				sjwttb_nor: sjwttb_nor,
				// 运营管理
				sjkfgfjh: sjkfgfjh,
				sjkfgfjh_nor: sjkfgfjh_nor,
				ptzhqxgl: ptzhqxgl,
				ptzhqxgl_nor: ptzhqxgl_nor,
				yyxmtzgl: yyxmtzgl,
				yyxmtzgl_nor: yyxmtzgl_nor,
				rdsSjzyml: rdsSjzyml,
				rdsSjzyml_nor: rdsSjzyml_nor,
				ywsjgl: ywsjgl,
				ywsjgl_nor: ywsjgl_nor,
				rdsAccount: rdsAccount,
				rdsAccount_nor: rdsAccount_nor,
				// 运营监控
				basePtzybcjk: basePtzybcjk,
				basePtzybcjk_nor: basePtzybcjk_nor,
				rdsTbzyjk: rdsTbzyjk,
				rdsTbzyjk_nor: rdsTbzyjk_nor,
				oggYxjk: oggYxjk,
				oggYxjk_nor: oggYxjk_nor,
				ybjgbgjk: ybjgbgjk,
				ybjgbgjk_nor: ybjgbgjk_nor,
				baseMonitor: baseMonitor,
				baseMonitor_nor: baseMonitor_nor,
				// 运维自动化
				odpsPljbExcel: odpsPljbExcel,
				odpsPljbExcel_nor: odpsPljbExcel_nor,
				odpsPzwjsc: odpsPzwjsc,
				odpsPzwjsc_nor: odpsPzwjsc_nor,
				odpsZlhbjb: odpsZlhbjb,
				odpsZlhbjb_nor: odpsZlhbjb_nor,
				odpsPljb: odpsPljb,
				odpsPljb_nor: odpsPljb_nor,
				odpsQlzzljb: odpsQlzzljb,
				odpsQlzzljb_nor: odpsQlzzljb_nor,
				// 知识目录
				qwjs: qwjs,
				qwjs_nor: qwjs_nor,
				wjsc: wjsc,
				wjsc_nor: wjsc_nor,
				// 定义中心
				user: user,
				user_nor: user_nor,
				role: role,
				role_nor: role_nor,
				menu: menu,
				menu_nor: menu_nor,
				page: page,
				page_nor: page_nor,
				constant: constant,
				constant_nor: constant_nor,
				userGroup: userGroup,
				userGroup_nor: userGroup_nor,
				organization: organization,
				organization_nor: organization_nor,
				apply: apply,
				apply_nor: apply_nor,
				// 权限配置
				role_qx: role_qx,
				role_qx_nor: role_qx_nor,
				personal_qx: personal_qx,
				personal_qx_nor: personal_qx_nor,
				//消息中心
				msgSend: msgSend,
				msgSend_nor: msgSend_nor,
				msgReceive: msgReceive,
				msgReceive_nor: msgReceive_nor,
				// 配置中心
				dsrwgl: dsrwgl,
				dsrwgl_nor: dsrwgl_nor,
				dataConfig: dataConfig,
				dataConfig_nor: dataConfig_nor,
				//审计中心
				loginAudit: loginAudit,
				loginAudit_nor: loginAudit_nor,
				errorLog: errorLog,
				errorLog_nor: errorLog_nor,
			}
		}
	},
	mounted(){
		this.active(this.$route.path)
	},
	methods: {
		active(val){
			if(val.indexOf(this.sunmenuData.mark) > -1){
				this.select = true
			}else{
				this.select = false
			}
		},
		selectedFun(val){
			if(val.mark){
			console.log(val, 263, this)
				this.$router.push({
					name: val.mark
				})
			}
		}
	},
	watch:{
		$route(to, from){
			this.active(to.path)
		}
	}
}
</script>

<style>
</style>