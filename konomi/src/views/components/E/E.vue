<template>
  <div class="page">
    <div class="tools">
      <a
        v-for="(btn, i) in item.children"
        :key="i"
        :title="btn.name"
        :draggable="btn.data"
        @dragstart="onDrag($event, btn)">
        <i :class="`iconfont ${btn.icon}`"></i>
      </a>
    </div>
    <div id='topology-canvas' class="full">
    </div>
    <div class="props">
        <CanvasProps :props.sync="props" @change="onUpdateProps"></CanvasProps>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
          // 左侧工具栏
      tools: Tools,
            // 图形库
      canvas: {},
            // 图形库选项：https://www.yuque.com/alsmile/topology/canvas#hOupV
      canvasOptions: {
        rotateCursor: '/img/rotate.cur'
      },
            // 右侧属性栏数据
      props: {
        node: null,
        line: null,
        multi: false
      }
    }
  },
  created() {
    canvasRegister()
  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-canvas', this.canvasOptions)
  },
  methods: {
    onDrag(event, node) {
      event.dataTransfer.setData('Text', JSON.stringify(node.data))
    },
    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node)
    }
  },
  components:{
    CanvasProps
  }
}
</script>

<style>
</style>