<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" v-if='dialogVisible' :width="width" :before-close="closeHandle" :top='modalTop'>
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if='ifCancle||ifSure'>
        <el-button @click="closeHandle" v-if='ifCancle'>取 消</el-button>
        <el-button type="primary" v-if='ifSure' @click="sureHandle">确 定</el-button>
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
export default {
  name: 'hyModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default:()=>false
    },
    ifCancle: {
      type: Boolean,
      default:()=>false
    },
    ifSure: {
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
  }
}
</script>

<style scoped>
</style>
