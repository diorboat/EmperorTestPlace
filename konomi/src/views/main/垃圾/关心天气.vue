<template>
    <div id= 'nothing' style="display: flex;">
      <div style="width:55vw">
        <div class="k">
          <div class="nothing" :style="style">
            <div style="position:absolute">
              <div class='pol' >
                <div class="circle"></div>
                <div class="circle c1"></div>
                <div class="circle c2"></div>
                <div class="circle c3"></div> 
              </div>
            </div>
          </div>
        </div>
        <div class="k" style="top:5px;left:0px;">
          <div class="nothing" @mousedown="mouse" :style="style2">
            <div style="position:absolute">
              <div class='pol' >
                <div class="circle"></div>
                <div class="circle c1"></div>
                <div class="circle c2"></div>
                <div class="circle c3"></div> 
              </div>
            </div>
          </div>
          <div class="kedu"></div>
        </div>
      </div>
      <div style="flex1">
        <div>
          <span>{{Math.floor(now*100000/hell)/1000}}--{{now2}}</span>
        </div>
    
        <div style="margin-top:20px">
          
          <el-tag width='80px' type="success">{{now3}}</el-tag>
          <span>{{hell}}</span>
        </div>
      </div>
      <div style="z-index:-1">
        <iframe scrolling='no' src='https://tianqi.qq.com/index.htm' width="1200" height="65" style="position:absolute;top:0px;right:0px"></iframe>
        <iframe scrolling='no' src='https://tianqi.qq.com/index.htm' width="1200" height="1300" style="position:absolute;top:-473px;right:0px"></iframe>
      </div>
      
      
    </div>
</template>
<script>
export default {
  data(){
    return{
      // style:[{left:'calc('+44+'vw - 30px)'}],
      // style2:[{left:'calc('+44+'vw - 30px)'}],
      date: new Date(),
      hell:9*5*60*60,
      now:0,
      now2:0,
      now3:0,
      t:null,
      t1:null,
      style:[],
      style2:[],
      ssssk:null,
      kkk:null,
    }    
  },
  mounted () {
    var k = Math.floor(5693/7)/10

    for (let index = 0; index < 100; index++) {
      k-=100

    }
    this.t = setInterval(() => {
      var n = new Date()
      var d = n.getDay() - 1
      var h = n.getHours() - 9
      var m = n.getMinutes()
      var s= n.getSeconds()
      var w = 5*9*60*60
      this.now = d*9*60*60 + h*60*60 +m*60 + s
      var a2 = h*60*60 +m*60 + s
      this.now3 = Math.floor(a2/3.24)/100
      this.style = [{left:'calc('+(Math.floor(this.now*10000/this.hell)/200)+'vw - 42px)'}]
      this.style2 = [{left:'calc('+(Math.floor(this.now3*100/2))/100+'vw - 42px)'}]

    }, 1000)
    this.t1 = setInterval(() => {
      
      
      this.now2 = 5*9*60*60 - this.now
    }, 1000);
  },
  methods:{
    show(){
      console.log(this.ssssk == this.kkk)
      this.ssssk = null
    },
    mouse(e){
      console.log(e)
    }
  },
  computed:{
    // style(){

    //   var all = 540*5;
      
    //   let now2 = (this.date.getDay()-1)/5
    //   let now = (this.date.getHours() - 9)*60 + this.date.getMinutes()      
      
    //   return [{left:'calc('+(now2+(now/all/5))*50+'vw - 52px)'}]
    // },
    // style2(){
    //   var all = 540;
    //   let now = (this.date.getHours() - 9)*60 + this.date.getMinutes()
    //   return [{left:'calc('+now*50/all+'vw - 52px)'}]
    // }
  }
}
</script>

<style scoped>

  .pol{
    transform:translateY(-35px) rotate(90deg);
    position:relative;
    width:50px;
    height:100px;
    background-color:#FF2;
    background-image: linear-gradient(180deg,#FF2, #1f9);
    overflow:hidden;
    width:calc
  }
  .circle{
    border-radius:40% 35%;
    background: #ccc;
    position: absolute;
    width: 150px;
    height: 150px;
    top: -120px;
    left: -60px;
    animation:round 4.2s infinite linear;
    opacity:0.8 ;
  }
  :root{
    --ani-time:5s
  }
  .c1{
    animation:round 2s infinite linear;
    opacity: 0.3
  }
  .c1{
    animation:round 4.5s infinite linear;
    opacity: 0.3
  }
  .c1{
    animation:round 3.5s infinite linear;
    opacity: 0.3
  }
  .c1{
    animation:round 3.8s 1s infinite linear;
    opacity: 0.3
  }
  @keyframes round{
    0%{
      transform:  rotate(0deg)
    }
    100%{
      transform: rotate(359deg)
    }
  }
  .k{
    position: relative;
    border-radius: 3px;
    left: 0vw;
    top:0px;
    z-index: 5;
    height:30px;
    width: 50vw;
    background: #1f9;
    overflow: hidden
  }
 
  .nothing{
    position: absolute;
    left: 30vw;
    height: 100%;
    width: calc(50vw + 52px);
    top: 0px;
    background: #ccc
  }
  .kedu{
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 2px;
    background: #f2a10f;
    box-shadow: 0px 0px 15px 1px #F2A10F;
    left: 33%
  }
</style>