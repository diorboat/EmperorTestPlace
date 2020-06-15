<template>
  <div class="ToggoleImg" style="">
    <img :src="src" :class="imgclass" :alt="alt"  :title="title"  style="max-width:100%;max-height:100%" @click='imgToggle($event)'>
    <div :class="showShadow?'shadow':''"></div>
  </div>
</template>

<script>

/** @param {src} 图片地址/ 阴影无法超出iframe窗口....*/
export default {
  name:'hrImg',
  props:{
    src:{
      type:String,
      default:()=>'@/assets/process/gkbmzr.png'
    },
    needToggle:{
      type:Boolean,
      default:()=> false
    },
    imgclass:{
      type:String,
      default:()=>'@/assets/process/gkbmzr.png'
    },
    alt:{
      type:String,
      default:()=>'@/assets/process/gkbmzr.png'
    },
    title:{
      type:String,
      default:()=>'@/assets/process/gkbmzr.png'
    },
  },
  data(){
    return{
      showShadow:false,
      imgData:{}
    }
  },
  methods:{
    imgToggle(e){
      //空格必须严谨,img里的style不能用position;fixed属性,想用改下边的if,imgsrc尽量别重复
      console.log('点击生效')
      console.log(this.needToggle)
      if(!this.needToggle){return}
      let addStyle = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); max-height: 100%; max-width: 100%; height: auto; width: auto; z-index: 9;'
      let style = e.target.getAttribute('style') || ''
      let src = e.target.getAttribute('src') || ''
      let docWidth = document.body.clientWidth
      let docHeight = document.body.clientHeight
      let width = e.target.naturalWidth;
      let height = e.target.naturalHeight;
      let position = getComputedStyle(e.target,null)['position']
      if(width < docWidth*0.45 && height <docHeight*0.45){addStyle+=` width: ${width*2}px; height: ${height*2}px;` }
      console.log(addStyle)
      //全局属性，记录img
      //!window.oldSrcList && (window.oldSrcList = [])
      //没有放大s时点进
      if(position != 'fixed'){
          this.imgData = {src,style}
          style = style+addStyle
          this.showShadow = true
      }else{
        style = this.imgData.style
        this.showShadow = false
      }
      e.target.style.cssText=style;
    }
  }
}
</script>

<style lang="stylus" >
.ToggoleImg{
  display:inline-block;
  .shadow{
    position: fixed;
    background: #000;
    opacity: 0.3;
    z-index: 8;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}

</style>