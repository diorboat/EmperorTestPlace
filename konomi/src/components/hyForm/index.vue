<template>
  <el-form ref='form' class="form" :rules='rules' :inline="ifInLine" :model="formData" :size='size' :label-position="labelPosition" :label-width="labelWidth">

    <el-form-item v-for='item in formConfig' :key='item.key' :label="item.label" :prop='item.key' v-show='!item.notShow'>
      <!-- input -->
      <el-input v-if="item.type == 'input'" v-model="formData[item.key]" :placeholder="item.placeholder" :disabled='item.disabled' :type='item.kind' @click.native='formSelectClick(item.key)'></el-input>
      <!-- select -->
      <el-select v-if="item.type == 'select'" class='elFormSelect' v-model="formData[item.key]" :multiple='item.multiple?item.multiple:false' :disabled='item.disabled' :placeholder="item.placeholder" @click.native='formSelectClick(item.key)' @change='formSelectchange'>
        <el-option v-for="v in item.options" :key="v.value" :label="v.label" :value="v.value">
        </el-option>
      </el-select>
      <!-- cascader -->
      <el-cascader v-if="item.type == 'cascader'" change-on-select :show-all-levels="showAllLevels" :options="item.options" :props="item.props" :disabled='item.disabled' v-model="formData[item.key]" @click.native='formSelectClick(item.key)' @change="formcascchange">
      </el-cascader>

      <!-- transfer -->
      <el-transfer v-if="item.type == 'transfer'" filterable filter-placeholder="请输入搜索内容" v-model="formData[item.key]" :data="item.options" :titles='item.titles' :props='item.props'>
      </el-transfer>

      <!-- switch -->
      <el-switch v-if="item.type == 'switch'" v-model="formData[item.key]" :inactive-text="item.title">
      </el-switch>

      <!-- tree -->
      <el-scrollbar v-if=" item.type == 'tree' " :style='treeScrollStyle'>
        <hyTree :treeData="item.options" :treeDefaultCheck="formData[item.key]" :treeDefaultExpand="formData[item.key]" :defaultTreeProps='item.props' :showTreeCheckBox='item.ifCheck' :checkStrictly='item.checkStrictly' @treeClick='treeClick' @treeSelect='treeSelect' @clickTreeBox='formSelectClick(item.key)'>
        </hyTree>
      </el-scrollbar>

      <!-- datepicker -->
      <el-date-picker v-if="item.type == 'datepicker' " v-model="formData[item.key]" :type="item.dateType" :placeholder="item.placeholder" :format="item.format" :value-format="item.valFormat">
      </el-date-picker>

    </el-form-item>

    <slot></slot>
    <!-- submit -->
    <el-form-item :class="{
      submitBox: ifSearch1||ifSearch2||ifSearch3,
      [submitAlign]: true
    }">
      <el-button v-if='ifSearch1' type="primary" icon="el-icon-search" @click="onSubmit"></el-button>
      <el-button v-if='ifSearch2' type="primary" @click="onSubmit">确定</el-button>
      <el-button v-if='ifSearch2' class="cancel" @click="onCancle">取消</el-button>
      <el-button v-if='ifSearch3' type="primary" @click="onSubmit">{{btnText}}</el-button>
    </el-form-item>
  </el-form>
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
import hyTree from '../hyTree'
export default {
  name: 'hyForm',
  props: {
    size:{
      type: String,
      default:()=>'small'
    },
    submitAlign: {
      type: String,
      default:'center'
    },
    ifInLine:{
      type: Boolean,
      default:()=>true
    },
    ifSearch1:{
      type: Boolean,
      default:()=>false
    },
    ifSearch2:{
      type: Boolean,
      default:()=>false
    },
    ifSearch3:{
      type: Boolean,
      default:()=>false
    },
    btnText: {
      type: String,
      default: () => '确定'
    },
    labelPosition: {
      type: String,
      default:()=>'top'
    },
    labelWidth: {
      type: String,
      default:()=>'80px'
    },
    rules: {
      type: Object,
      default:()=>{}
    },
    clearAll: {
      type: Boolean,
      default:()=>true
    },
    showAllLevels: {
      type: Boolean,
      default:()=>false
    },
    formConfig:{
      type: Array,
      default() {
        return []
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    treeScrollStyle: {
      type: Object,
      default: () => {
        return { }
      }
    }
  },
  data() {
    return {
      selectFormItem: ''
    }
  },
  components: {
    hyTree
  },
  created() {
    this.selectFormItem = ''
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.formData)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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
    onCancle() {
      this.$emit('onCancle')
    },
    formSelectClick(e) {
      this.selectFormItem = e
    },
    formSelectchange(e) {
      this.$emit('formSelectchange', e, this.selectFormItem)
    },
    formcascchange(e) {
      this.$emit('formcascchange', e, this.selectFormItem)
    },
    treeSelect(e, keys) {
      this.formData[this.selectFormItem] = keys
    },
    treeClick(e, node) {
      this.$emit('treeClick', e, node, this.selectFormItem)
    }
  },
  watch: {
    clearAll(val){
      if(!val) {
        this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
      }
      this.selectFormItem = ''
    },
    'formData.password'(val) {
      const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
      if(reg.test(val)) this.formData.checkPassword&&this.$nextTick(()=>this.$refs.form.validateField('checkPassword'))
    }
  }
}
</script>

<style scoped>
.form .elFormSelect {
  width: 100%;
}
.form .submitBox {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.left {
  text-align: left;
  display: flex;
  justify-content: flex-start !important;
}
.right {
  text-align: right;
  display: flex;
  justify-content: flex-end !important;
}
.center {
  display: flex;
  justify-content: center !important;
  text-align: center;
}
/* .form {
  background: #ffffff;
  width: 100%;
} */
</style>
