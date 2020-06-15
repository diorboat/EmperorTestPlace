<template>
  <div>
    <el-button class='btn'
      v-for='(item, index) in buttonsData'
      :size='size'
      :key='index'
      :disabled="item.disabled"
      :type="item.type"
      @click='clickButtons(item)'>{{item.text}}
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "hyButtonsNew",
    props: {
      buttonsData: {
        type: Array,
        default: () => []
      },
      size: {
        type: String,
        default: () => 'small'
      }
    },
    methods: {
      clickButtons(e) {
        this.$emit('clickButtons', e)
      }
    },
  }
</script>

<style scoped>

</style>