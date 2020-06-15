<template>
    <div>
        <el-button class='btn' v-for='(item, index) in buttonsData' size='small' :key='index' :disabled="item.disabled" :type="mySelectId==item.id?'primary':''" @click='selectButtons(item)'>{{item.text}}</el-button>
    </div>
</template>

<script>
/**
 * @param {buttonsData} 按钮组数据 {id:0,text:'content'} id为按钮唯一ID值 text为按钮显示文本(不区分选中按钮传相同的id值)
 * @param {selectId} 默认被选中按钮
 * @function selectButtons(e) 选择按钮事件 e为选择按钮数据
 */
export default {
  name: 'hyButtons',
  props: {
    buttonsData: {
      type: Array,
      default: ()=> []
    },
    selectId: {
      type: Number,
      default: ()=> 0
    }
  },
  data() {
    return {
      mySelectId: this.selectId
    }
  },
  created() {
    if (this.buttonsData.length > 0 && this.buttonsData[0].id !== undefined) {
      if (!isNaN(this.buttonsData[0].id)) {
        this.mySelectId = this.buttonsData[0].id
      }
    }
  },
  methods: {
    selectButtons(e) {
      this.mySelectId = e.id
      this.$emit('selectButtons', e)
    }
  },
  watch:{
    selectId(val) {
      this.mySelectId = val
    }
  }
}
</script>

<style scoped>
</style>