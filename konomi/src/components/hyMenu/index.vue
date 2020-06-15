<template>
	<!-- <el-menu :class="mode==='horizontal'?'hyMenu':'el-menu-vertical-demo'" @select='selectMenu' :default-active='defaultActive' :collapse="isCollapse" :router='router' :unique-opened='uniqueOpen' :mode="mode" :background-color='bgColor' :text-color='textColor' :active-text-color='activeTextColor'>
		<slot></slot>
		<el-menu-item :index="'/homePage'">
			<span slot='title'>首页</span>
		</el-menu-item>
		<el-menu-item :index="'/main/resourceHome'" style="position: absolute; left: 72.5px; top: 0px; padding-right: 40px;">
			<span :style="{color: $route.path == '/main/resourceHome' ? '#00cafc' : 'rgba(0,0,0,0)'}" slot='title'>数据资源中心</span>
		</el-menu-item>
		<Submenu v-for="item in menuData" :sunmenuData="item" :key="item.id">
		</Submenu>
	</el-menu> -->
	<ul class="menu_box">
		<li class="menu_box_item">
			<div class="title" :class="{active: $route.path=='/homePage'}" @click="routerFun({path: '/homePage'})">首页</div>
		</li>
		<li class="menu_box_item" v-for="item in menuData" :key="item.id">
			<div class="title" :class="{active : idList.indexOf(item.mark || item.id)>-1}" @click="routerFun(item)">{{item.title}}</div>
			<ul class="menu_box_two" v-if="item.children">
				<li class="menu_box_item menu_box_item_two" v-for="aitem in item.children" :key="aitem.id">
					<div class="title" :class="{active : idList.indexOf(aitem.mark || aitem.id)>-1}" @click="routerFun(aitem,item)">{{aitem.title}}</div>
					<ul class="menu_box_three" v-if="aitem.children">
						<li class="menu_box_item menu_box_item_three" v-for="bitem in aitem.children" :key="bitem.id">
							<div class="title" :class="{active : idList.indexOf(bitem.mark || bitem.id)>-1}" @click="routerFun(bitem,aitem,item)">{{bitem.title}}</div>
							<ul class="menu_box_four" v-if="bitem.children">
								<li class="menu_box_item menu_box_item_four" v-for="citem in bitem.children" :key="citem.id">
									<div class="title" :class="{active : idList.indexOf(citem.mark || citem.id)>-1}" @click="routerFun(citem,bitem,aitem,item)">{{citem.title}}</div>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
/**
 * @param {menuData} 导航数据，例：[{id:'',icon:'',path:'',title:''}],id:唯一id,icon:图标,path:对应路径,title:标题
 * @param {mode} 导航类型
 * @param {bgColor} 背景色
 * @param {textColor} 文字颜色
 * @param {activeTextColor} 选中字体颜色
 * @param {uniqueOpen} 最多同时展开一层
 * @param {router} 是否使用 vue-router 的模式
 * @param {isCollapse} 展开收缩
 * @param {defaultActive} 当前激活菜单的 index
 */
import Submenu from './Submenu'
import { mapMutations } from 'vuex'
export default {
	name: "hyMenu",
	data() {
		return {
			parentIdObj: {},
			idList:[]
		}
	},
	props: {
		menuData: {
			type: Array,
			default() {
				return []
			}
		},
		mode:{
			type: String,
			default() {
				return 'horizontal'
			}
		},
		bgColor: {
			type: String,
			default() {
				return ''
			}
		},
		textColor: {
			type: String,
			default() {
				return ''
			}
		},
		activeTextColor: {
			type: String,
			default() {
				return ''
			}
		},
		uniqueOpen: {
			type: Boolean,
			default() {
				return false
			}
		},
		router: {
			type: Boolean,
			default() {
				return false
			}
		},
		isCollapse: {
			type: Boolean,
			default() {
				return false
			}
		},
		defaultActive: {
			type: String,
			default() {
				return ''
			}
		}
	},
	components: {
		Submenu
	},
	watch:{
		$route(to, from){
			this.activeFun()
		}
	},
	mounted(){
		console.log(this.menuData, 118)
		this.menuData.forEach(element => {
			if(element.children){
				this.menuForFun(element.children, element.mark || element.id, this.parentIdObj)
			}
		});
		this.activeFun()
	},
	methods:{
		...mapMutations({
			setBreadcrumb: 'SET_BREADCRUMB'
		}),
		// 获取当前id与父id的对应关系对象
		menuForFun(array, val, obj){
			array.forEach(element => {
				obj[element.mark || element.id] = val
				if(element.children){
					this.menuForFun(element.children, element.mark || element.id, obj)
				}
			});
		},
		// selectMenu(index, indexPath) {
		// 	// console.log(index, indexPath, 87)
		// 	// this.$emit('selectMenu', index, indexPath)
		// },
		// 点击导航跳转路由
		routerFun(val,lastOne,lastTwo,lastThree){
			if(val.path && val.path!=this.$route.path){
				this.$router.push({path: val.path})
				let arr = [{
					name: val.title
				}]
				if(lastOne){
					arr.unshift(
						{
							name: lastOne.title,
							path: lastOne.path
						}
					)
				}
				if(lastTwo){
					arr.unshift(
						{
							name: lastTwo.title,
							path: lastTwo.path
						}
					)
				}
				if(lastThree){
					arr.unshift(
						{
							name: lastThree.title,
							path: lastThree.path
						}
					)
				}
				this.setBreadcrumb(arr)
			}
		},
		// 当前路由转id  并获取所有关联id
		activeFun(){
			let id = this.$route.path.replace("/main/", "")
			this.idList = []
			this.idList.push(id)
			this.idFun(id, this.idList)
		},
		// 根据当前id获取父id
		idFun(val, list){
			let id = this.parentIdObj[val]
			if(id){
				list.push(id)
				this.idFun(id, list)
			}
		}
	}
};
</script>
<style scoped>
/* @import './index.css'; */
</style>
<style lang="stylus">
.menu_box {
	display: flex;
	position: relative;
	z-index: 999;

	.menu_box_item {
		.title {
			height: 40px;
			display: flex;
			align-items: center;
			padding: 0 20px;
			color: #ffffff;
			white-space: nowrap;
			cursor: pointer;
			font-size: 16px;

			&.active {
				color: #00cafc;
			}

			&:hover {
				color: #00cafc;
			}
		}

		&:hover {
			.menu_box_two {
				display: block;
			}
		}

		&.menu_box_item_two {
			position: relative;

			.title {
				font-size: 14px;
			}

			&:hover {
				.menu_box_three {
					display: block;
				}
			}
		}

		&.menu_box_item_three {
			position: relative;
			.title {
				font-size: 12px;
			}
			&:hover {
				.menu_box_four {
					display: block;
				}
			}
		}

		&.menu_box_item_four {
			position: relative;
			.title {
				font-size: 12px;
			}
			&:hover {
				.menu_box_four {
					display: block;
				}
			}
		}

		.menu_box_two {
			position: absolute;
			background-color: #393d49;
			display: none;

			&:hover {
				display: block;
			}
		}

		.menu_box_three {
			display: none;
			position: absolute;
			left: 100%;
			top: 0;
			background-color: #393d49;

			&:hover {
				display: block;
			}
		}

		.menu_box_four {
			display: none;
			position: absolute;
			left: 100%;
			top: 0;
			background-color: #393d49;

			&:hover {
				display: block;
			}
		}
	}
}
</style>
