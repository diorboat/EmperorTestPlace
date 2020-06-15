<template>
  <div class="black">
    <div  :style="style1"></div>
   
    <div v-for="(item,index) in box2" :key="index" :style="connect(style1,box2[index],backgroundColor[index])">
    </div>
   
  </div>
</template>

<script>
//编辑时候，是默认的upload选择文件时候直接上传文件，不会在保存时 filelist不能绑定在upload组件上
export default {
  data(){
    return{
      style1:{
        width:'80px',
        height:'80px',
        borderRadius:'50%',
        
        margin:'5px',
        boxShadow:"0px 0px 10px 2px #ffebb2",
      },
      box2:[
        {boxShadow:"0px 0px 10px 2px " + this.Rcolor()+' inset,'+"0px 0px 5px 2px " + this.Rcolor()},
      ],
      backgroundColor:[],
      
    }
  },
  methods:{
    connect (...needles) {
      needles = JSON.parse(JSON.stringify(needles))
      return needles.reduce((a={},item)=>{
        return Object.assign(a,item)
      })
    
    },
    Rcolor(){
      return 'rgb('+ Math.floor(Math.random()*256) + ',' +Math.floor(Math.random()*256) +',' +Math.floor(Math.random()*256) +')'
    }
  },
  mounted(){
    let arr = []
    for (let index = 0; index < 30; index++) {
      arr.push(this.Rcolor())
    }
    this.box2 = arr.map(item=>{
      return {boxShadow:"0px 0px 10px 2px " + item+' inset,'+"0px 0px 5px 2px " + item,border:'1px solid '+ item}
    })
    let n = 0
    this.t1 = setInterval(() => {
      n++
      n = n<30 ?n:0
      
      this.backgroundColor = arr.map((item,index)=>{
        if(n-10< index && index < n){
          console.log(item.replace(')',(' 0.'+(index-n+10)+')')))
          return {backgroundColor:item.replace(')',(', 0.'+(index-n+10)+')'))}
        }else{
          return {backgroundColor:'transparent'}
        }
      })
     
    }, 100);
  },
  beforeRouteLeave(to, form, next) {
    clearInterval(this.t1)
    this.t1 = null
    next()
  },
  computed:{
    

  },

}
</script>

<style >
.black{
  background-color: #000;
  height:calc(100% - 40px) ;
  width:calc(100% - 40px) ;
  display:flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content:left;
  align-content: flex-start
}
.black div{
  /* transition:all 0.2s ease-in; */
}
</style>