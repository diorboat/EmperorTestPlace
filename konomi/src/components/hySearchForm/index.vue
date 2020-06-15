<template>
	<div class="searchForm_box">
		<el-form ref="form" class="hySearchForm" :rules="rules" :model="formData" :size="size" :label-width="labelWidth" :disabled="disabled" @submit.native.prevent>
			<div class="searchForm_item" v-for="item in formConfig" :key="item.key + item.label"  :style="{'width':item.width}">
				<p  class="labelName" v-if="!item.notShow && item.label || item.placeholder">
					{{item.label || item.placeholder}}</p>
				<el-form-item  v-if="!item.notShow" :prop="item.key" style="width:100%;">
					<div :style="{'width': item.itemWidth ||'100%'}">
						<el-tooltip :disabled="!((item.tip || '').length>0)" :content="item.tip" placement="top" effect="dark">
							<div v-if="item.type === 'text'">{{formData[item.key]}}</div>
							<el-input v-if="item.type == 'input'" style="width:100%" v-model="formData[item.key]" placeholder="" :disabled="item.disabled" :type="item.kind" :clearable="item.clearable" @click.native="formSelectClick(item.key)" :readonly="item.readonly" @blur="inputBlur(item.key,formData[item.key])" @keyup.enter.native="inputChange" @clear="inputClear(item.key,formData[item.key])"></el-input>
							<!-- textarea -->
							<el-input v-if="item.type === 'textarea'" type="textarea" v-model.trim="formData[item.key]" placeholder="" :disabled="item.disabled" :rows="item.rows" style="width:100%" :readonly="item.readonly"></el-input>
							<!-- select -->
							<el-select style="width:100%" v-if="item.type == 'select'" class="elFormSelect" v-model="formData[item.key]" :multiple="item.multiple?item.multiple:false" :clearable="item.clearable" :disabled="item.disabled || item.readonly" placeholder="" @click.native="formSelectClick(item.key)" @change="formSelectchange(item.key,formData[item.key])">
								<el-option v-for="v in item.options" :key="v.value" :label="v.label" :value="v.value"></el-option>
							</el-select>
							<!-- selectgroup -->
							<el-select v-if="item.type==='selectgroup'" v-model="formData[item.key]" placeholder="" @click.native="formSelectClick(item.key)" style="width:100%">
								<el-option-group v-for="group in item.options" :key="group.label" :label="group.label">
									<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-option-group>
							</el-select>
							<!-- cascader -->
							<el-cascader style="width:100%" v-if="item.type == 'cascader'" change-on-select :show-all-levels="showAllLevels" :options="item.options" :props="item.props" :disabled="item.disabled || item.readonly" v-model="formData[item.key]" @click.native="formSelectClick(item.key)" @change="formcascchange"></el-cascader>

							<!-- transfer -->
							<el-transfer v-if="item.type == 'transfer'" filterable filter-placeholder="请输入搜索内容" v-model="formData[item.key]" :data="item.options" :titles="item.titles" :props="item.props" :style="{width:item.width}"></el-transfer>

							<!-- switch -->
							<el-switch v-if="item.type == 'switch'" v-model="formData[item.key]" :inactive-text="item.title"></el-switch>

							<!-- tree -->
							<el-scrollbar v-if=" item.type == 'tree' " :style="treeScrollStyle">
								<hyTree :treeData="item.options" :treeDefaultCheck="formData[item.key]" :treeDefaultExpand="formData[item.key]" :defaultTreeProps="item.props" :showTreeCheckBox="item.ifCheck" :checkStrictly="item.checkStrictly" @treeClick="treeClick" @treeSelect="treeSelect" @clickTreeBox="formSelectClick(item.key)"></hyTree>
							</el-scrollbar>
							<!-- datepicker -->
							<el-date-picker v-if="item.type == 'datepicker'" v-model="formData[item.key]" :type="item.dateType" placeholder="" :format="item.format" :value-format="item.valFormat" :readonly="item.readonly" :disabled="item.disabled" style="width:100%"></el-date-picker>
							<!-- daterange -->
							<el-date-picker v-if="item.type === 'daterange'" v-model="formData[item.key]" :default-time="item.defaultTime" type="daterange" :format="item.format" :value-format="item.valFormat" style="width:100%" :range-separator="item.separator || '-'" :start-placeholder="item.startPlaceholder || '开始日期'" :end-placeholder="item.endPlaceholder || '结束日期'" @change="dataPickerChange"></el-date-picker>
							<!-- radiobutton -->
							<el-radio-group v-if="item.type==='radiobutton'" v-model="formData[item.key]">
								<el-radio-button v-for="(v,index) in item.options" :size="item.size?item.size:'small'" :disabled="item.disabled || item.readonly" :controls-position="item.position?item.position:'right'" :key="index" :label="v.value">{{v.label}}</el-radio-button>
							</el-radio-group>
							<el-radio-group v-if="item.type==='radiobutton1'" v-model="formData[item.key]">
								<div v-for="(aitem,a) in item.options" :key="a" style="display: flex; height: 40px; line-height: 40px;font-size: 16px;">
									<p style="width: 50px;">{{aitem.label}}:</p>
									<div>
										<el-radio-button v-for="(v,index) in aitem.options" :size="item.size?item.size:'small'" :disabled="item.disabled || item.readonly" :controls-position="item.position?item.position:'right'" :key="index" :label="v.label">{{v.label}}</el-radio-button>
									</div>
								</div>
							</el-radio-group>
							<!-- radio -->
							<el-radio-group style="line-height: 34px;" v-if="item.type==='radio'" v-model="formData[item.key]" @change="radoiChange(item.key,formData[item.key])">
								<el-radio v-for="(v) in item.options" :key="v.value" :disabled="item.disabled || item.readonly" :label="v.value">{{v.label}}</el-radio>
							</el-radio-group>
							<!-- checkboxgroup -->
							<div v-if="item.type==='checkboxgroup'">
								<el-checkbox v-if="!item.notShowAll" style="margin-right: 30px;" :indeterminate="item.isIndeterminate" @change="checkGroupAllChange" v-model="formData[item.checkAll]" label="全部"></el-checkbox>
								<el-checkbox-group v-model="formData[item.key]" :disabled="item.disabled" @change="checkGroupChange">
									<el-checkbox v-for="v in item.options" :key="v.value" :label="v.label" :disabled="item.disabled || item.readonly"></el-checkbox>
								</el-checkbox-group>
							</div>
							<!-- button -->
							<span v-if="item.type==='button'" class="buttonStyle" @click="buttonSelectClick(item.key)">{{item.text}}</span>
							<!-- inputnumber -->
							<el-input-number v-if="item.type==='inputnumber'" style="width:100%" v-model="formData[item.key]" :min="item.min" :max="item.max" :controls="item.controls"></el-input-number>
							<!-- slider -->
							<el-slider v-if="item.type==='slider'" v-model="formData[item.key]" :min="item.min" :max="item.max" show-input style="width:100%"></el-slider>
							<div class="inputrange" v-if="item.type==='inputrange'">
								<el-input v-model.trim="formData[item.startKey]" :placeholder="item.startPlaceholder" :disabled="item.disabled" style="width:100%">
								</el-input> -
								<el-input v-model.trim="formData[item.endKey]" :placeholder="item.endPlaceholder" :disabled="item.disabled" style="width:100%">
								</el-input>{{item.slot}}
							</div>
							<!-- alert -->
							<div v-if="item.type==='alert'">
								<el-alert :closable="item.closable?item.closable:true" v-for="(v,index) in item.options" :key="v.id" :type="item.alertType" :description="v.description" @close="closeAlert(item.key,index)"></el-alert>
							</div>
							<slot v-if=" item.slotOther" :name="item.slotName"></slot>
						</el-tooltip>
					</div>
				</el-form-item>
			</div>
			<slot></slot>
			<div class="searchButton" v-if="searchButtonsConfig.length">
				<el-button v-for="item in searchButtonsConfig" v-show="!item.notShow" :size="size" :key="item.key" :type="item.type" @click="searchButtonClick(item.key)">{{item.text}}</el-button>
			</div>
			<div class="searchButton2" v-if="searchButtonsConfig2.length">
				<el-button v-for="item in searchButtonsConfig2" v-show="!item.notShow" :size="size" :key="item.key" :type="item.type" @click="searchButtonClick(item.key)" :icon="item.icon"  >{{item.text}}</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
/**
 * 必填
 * @param {formData} 表单显示数据
 * @param {formConfig} 表单配置
 * @param {size} 大小类型
 * @param {ifInLine} 是否行内表单
 * @param {ifSearch1} 搜索图标
 * @param {ifSearch3} 自定义搜索文本
 * @param {labelPosition} 标题位置
 * @param {labelWidth} 标题宽度
 * @param {rules} 验证规则
 */
/**
 * formConfig
 * 通用配置
 * @param {key} 表单formData中对应key值
 * @param {label} 表单标题
 * @param {notShow} 对应表单是否显示
 * @param {placeholder} 输入框占位文本
 * @param {disabled} 是否禁用
 * @param {type} 表单类型 input、select、cascader、transfer、switch、tree、datepicker
 * input
 * @param {kind} input框类型 	text、textarea、password等
 * select
 * @function formSelectchange(val, key) val为对应id, key为表单formData中对应key值
 * @param {options} 例：[{label: 'a', value: 1}] label为值, value为唯一ID
 * @param {multiple} 是否多选
 * cascader
 * @function formcascchange(val, key) val为对应id集合, key为表单formData中对应key值
 * @param showAllLevels 输入框中是否显示选中值的完整路径
 * @param options 可选项数据源，键名可通过 props 属性配置
 * @param props {value: 'a', lable: 'b', children: [], disabled: false} value:指定选项的值为选项对象的某个属性值, label: 指定选项标签为选项对象的某个属性值, children: 指定选项的子选项为选项对象的某个属性值, disabled: 指定选项的禁用为选项对象的某个属性值
 * transfer
 * @param {options} Transfer 的数据源
 * @param {titles} 	自定义列表标题
 * @param {props} 数据源的字段别名
 * switch
 * @param {title} switch关闭时的文字描述
 * tree
 * @param {options} 树形结构数据
 * @param {props} 节点属性 {children: 'children', label: 'label'} children为子节点属性，label为该节点属性
 * @param {ifCheck} 是否可以多选(checkbox)
 * @param {checkStrictly} 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
 * @function treeClick(e, node) 点击节点事件，e为点击节点数据, node为点击的节点
 * datepicker
 * @param {dateType} 显示类型 year/month/date/dates/ week/datetime/datetimerange/daterange
 * @param {format} 显示在输入框中的格式 例： yyyy-MM-dd
 * @param {valFormat} 可选，绑定值的格式。不指定则绑定值为 Date 对象
 */
import hyTree from "../hyTree";
export default {
	name: "hySearchForm",
	props: {
		disabled: {
			type: Boolean,
			default: () => false
		},
		size: {
			type: String,
			default: () => "small"
		},
		ifInLine: {
			type: Boolean,
			default: () => true
		},
		ifSearch1: {
			type: Boolean,
			default: () => false
		},
		ifSearch2: {
			type: Boolean,
			default: () => false
		},
		ifSearch3: {
			type: Boolean,
			default: () => false
		},
		btnText: {
			type: String,
			default: () => "确定"
		},
		labelPosition: {
			type: String,
			default: () => "left"
		},
		labelWidth: {
			type: String,
			default: () => "0px"
		},
		form: {
			type: String,
			default: () => "refForm"
		},
		rules: {
			type: Object,
			default: () => {}
		},
		clearAll: {
			type: Boolean,
			default: () => true
		},
		showAllLevels: {
			type: Boolean,
			default: () => false
		},
		formConfig: {
			type: Array,
			default() {
				return [];
			}
		},
		searchButtonsConfig: {
			type: Array,
			default() {
				return [];
			}
		},
		searchButtonsConfig2: {
			type: Array,
			default() {
				return [];
			}
		},
		formData: {
			type: Object,
			default() {
				return {};
			}
		},
		treeScrollStyle: {
			type: Object,
			default: () => {
				return { height: "400px" };
			}
		},
		inputWidth: {
			type: String,
			default: () => "200px"
		},
		formType: {
			type: String,
			default: () => ""
		}
	},
	data() {
		return {
			selectFormItem: ""
		};
	},
	components: {
		hyTree
	},
	created() {
		this.selectFormItem = "";
	},
	methods: {
		validateForm() {
			let aa;
			this.$refs["form"].validate(valid => {
				aa = valid;
				if (valid) {
					return true;
				} else {
					this.$message.error("请填写完整信息");
					return false;
				}
			});
			return aa;
		},
		clearFormValidate() {
			this.$refs["form"].clearValidate();
		},
		resetFieldsFun() {
			this.$refs["form"].resetFields();
		},
		onSubmit() {
			console.log(this.$refs);
			this.$refs["form"].validate(valid => {
				if (valid) {
					console.log("submitForm");
					this.$emit("onSubmit", this.formData);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		validata(success, error) {
			this.$refs["form"].validate(valid => {
				if (valid) {
					success();
				} else {
					error();
					return false;
				}
			});
		},
		onCancle() {
			this.$emit("onCancle");
		},
		radoiChange(key, value) {
			this.$emit("radoiChange", key, value);
		},
		formSelectClick(e) {
			this.selectFormItem = e;
		},
		//输入框失去焦点函数
		inputBlur(key, value) {
			this.$emit("inputBlur", key, value);
		},
		inputChange(e) {
			this.$emit("inputChange");
		},
		inputClear(key, value) {
			this.$emit("inputChange", key, value);
		},
		//按钮
		buttonSelectClick(e) {
			this.$emit("buttonSelectClick", e);
		},
		closeAlert(key, index) {
			this.$emit("closeAlert", key, index);
		},
		//多选框选中的值
		handleChange(value) {
			this.$emit("handleChange", value);
		},
		formSelectchange(key,value) {
			this.$emit("formSelectchange", value, key);
		},
		formcascchange(e) {
			this.$emit("formcascchange", e, this.selectFormItem);
		},
		dataPickerChange(e) {
			this.$emit("dataPickerChange", e, this.selectFormItem);
		},
		treeSelect(e, keys) {
			this.formData[this.selectFormItem] = keys;
		},
		treeClick(e, node) {
			this.$emit("treeClick", e, node, this.selectFormItem);
		},
		searchButtonClick(item) {
			this.$emit("searchButtonClick", item);
		},
		checkGroupAllChange(val) {
			this.$emit("checkGroupAllChange", val);
		},
		checkGroupChange(val) {
			this.$emit("checkGroupChange", val);
		},
	},
	watch: {
		clearAll(val) {
			if (!val) {
				this.$refs.form.resetFields();
				this.$refs.form.clearValidate();
			}
			this.selectFormItem = "";
		},
		"formData.password"(val) {
			const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
			if (reg.test(val))
				this.formData.checkPassword &&
					this.$nextTick(() => this.$refs.form.validateField("checkPassword"));
		}
	}
};
</script>
<style lang="stylus">
.searchForm_box {
	display: flex;
	background: #ffffff;
	align-items: center;
	padding-right: 50px;

	.el-form {
		width: 100%;
		display: flex;
		flex-wrap: wrap;

		.searchForm_item {
			display: flex;
			align-items: center;
			margin: 5px 30px 5px 0;
			border: 1px solid #c5d6e3;
			border-radius: 4px;
			padding-right: 5px;

			.el-range-separator{
				width:20px
			}

			.inputrange {
				.el-input {
					width: 50px !important;
				}
			}

			.labelName {
				padding: 0 10px;
				border-right: 1px solid rgba(102, 102, 102, 0.4);
				color: #666666;
				margin-right: 10px;
				font-size: 14px;
				flex-shrink: 0;
			}

			.el-form-item {
				margin: 0;

				.el-input__inner {
					border: none;
				}

				.el-tooltip {
					display: flex;
				}

				.el-checkbox {
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.searchButton {
		display: flex;
		align-items: center;
		margin: 5px 30px 5px 0;
		flex-shrink: 0;
		
		.el-button {
			&+.el-button {
				margin-left: 20px;
			}
			
		}
		
		.el-button--primary {
			background: linear-gradient(to right, #0075f6, #02c2fe);
			font-size: 14px;
			padding: 8px 15px;
			//border-radius: 0;
			border: 0
		}
		
		.el-button--info {
			border: 1px solid transparent;
			font-size: 14px;
			padding: 8px 15px;
			//border-radius: 0;
			border: 0
		}
	}
	.searchButton2 {
		display: flex;
		align-items: center;
		margin: 5px 30px 5px 0;
		flex-shrink: 0;
		flex: 1;
		position: relative;
		.el-button {
			&+.el-button {
				margin-left: 20px;
			}
			
		}
		
		[class$="el-button el-button--small"]:last-child{
			position:absolute
			right: -70px
			.el-icon-plus{
				color #29bf9d
			}
		}
		
		.el-button--primary {
			background: linear-gradient(to right, #0075f6, #02c2fe);
			font-size: 14px;
			padding: 8px 15px;
			//border-radius: 0;
			border: 0
		}
		
		.el-button--info {
			border: 1px solid transparent;
			font-size: 14px;
			padding: 8px 15px;
			//border-radius: 0;
			border: 0
		}
	}
}
</style>