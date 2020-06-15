<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" v-if='dialogVisible' :width="width" :before-close="closeHandle" :top='modalTop'>
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if='ifButtons'>
        <hyNewButtons :buttonsData="buttonsConfig" @selectButtons="selectButtons"></hyNewButtons>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 必填
 * @param { dialogVisible } 弹窗是否显示
 * @function closeHandle 关闭事件
 * @function sureHandle 确定事件
 */
/**
 * 选填
 * @param { title } 标题
*/
import hyNewButtons from '../hyNewButtons'
export default {
  name: 'hyNewModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default:()=>false
    },
    ifButtons: {
      type: Boolean,
      default:()=>false
    },
    title: {
      type: String,
      default:()=>''
    },
    modalTop: {
      type: String,
      default: ()=>'90px'
    },
    width: {
      type: String,
      default: ()=> '600px'
    },
    buttonsConfig:{
      type: Array,
      default: ()=> []
    }
  },
  data() {
    return {}
  },
  methods: {
    closeHandle() {
      this.$emit('closeHandle')
    },
    sureHandle() {
      this.$emit('sureHandle')
    },
    selectButtons(e) {
      this.mySelectId = e.id
      this.$emit('selectButtons', e)
    }
  },
  components: {
    hyNewButtons
  }
}
</script>

<style scoped>
</style>
