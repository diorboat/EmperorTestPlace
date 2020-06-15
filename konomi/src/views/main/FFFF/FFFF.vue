<template>
  <div >
    <div v-for="(i,index) in lt" :key="index" class="one_line" :num='i' >
      <div class="two_line" :style="i"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      all:24*60*60*1000,
      k2:0,
      k3:0,
      lt:[],
      style:[],
      style2:[],
      style3:[],
      t:0,
    }
  },
  mounted(){
    function rpg() {
      return 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')'
    }
    var t = setInterval(()=>{      
      var n = new Date()
      var s = n.getSeconds()
      // var ssss = n.getTime()%1000
      var ssss = n.getTime().toString()
      ssss = parseInt(ssss.substr(10,3))
      var kl = s*1000+ssss
      var k = Math.floor(kl/6)
      var lt = []
      for(var i = 0;i<100;i++){
        k-=100
        if(k>100){
          lt.push([{width:'0%'},{"background-color":'#ff0'}])
        }else if(0<k&& k<100){
          lt.push([{width:(100-k)+'%'}])
        }else{
          lt.push([{width:'100%'}])
        }
      }
      this.lt =lt
    },5)
  },
  methods:{
    // return(val){
    //   if(val<k2){
    //     return [{width:'0'}]
    //   }else if(val ==k2){
    //     return [{width:100-this.k3+'%'}]
    //   }else{
    //     return [{width:'100%'}]
    //   }
      
    // },
  }
}
</script>

<style scoped>
.one_line{
  /* background-color: #9c7df4; */
  background-image: linear-gradient(160deg,#9c7df4, #1f9);
  height:1vh;
  position: relative;
}
.two_line{
  position: absolute;
  height:1vh;
  right: 0px;
  width: 0%;
  background: #cccccc;
}
</style>