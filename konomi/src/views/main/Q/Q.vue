<template>
  <div class="blakboad" @mousedown.stop='mousedown' @mouseup.stop='mouseup' @mouseleave="mouseout"  @mousemove.stop="mousemove" >
    <div>
      {{SP}}
    </div>
    <div class="blakboad2" :style="{'cursor':'url('+imgUrl+') auto','background':'url('+imgUrl+') no-repeat right','border':'0px'}">
      <el-form ref="form" :model="config" label-width="80px" style="width:150px;backgroundColor:rgba(151, 151, 151, 0.7);">
        <el-row :gutter="1">
          <el-col :span="8">
            点转
            <el-input-number size="mini" :controls="false" v-model="config.clickR" :min="0" :max="10" label="点转"></el-input-number>
          </el-col>  
          <el-col :span="8">
            滑转
            <el-input-number size="mini" :controls="false" v-model="config.moveR" :min="0" :max="10" label="滑转"></el-input-number>
          </el-col>
          <el-col :span="8">
            转速
            <el-input-number disabled="" size="mini" :controls="false" v-model="config.rolSpeed" :min="0" :max="10" label="滑转"></el-input-number>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="8">
            round
            <el-input-number size="mini" :controls="false" v-model="config.roundlength" :min="0" :max="500" label="点转"></el-input-number>
          </el-col>  
        </el-row>
        <el-row>
          {{allDamage}}//DPS:{{DPS}}
        </el-row>
        <el-row>MAX:{{maxDPS}}
          <el-button type="primary" size="mini" @click="maxDPS = 0">归零</el-button>
        </el-row>
      </el-form>
      <img class="nonDraggableImage" :src="require('@/assets/img/包子.png')" alt="" :style="baoziS">
      <div class="nonDraggableImage" v-for="item in damageList" :class="item.class" :key='item.id' :style="{'left':item.x+'px','top':item.y+'px','color':item.rgb}">{{item.damage}}</div>
      <img class="nonDraggableImage" v-for="(sword,index) in 无名" :key="index" :src="require('@/assets/img/sword.png')" :style="SP[index]" :alt='sword'>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      damageList:[],
      targetP:{
        x:0,
        y:0,
      },
      clickP:{
        x:0,
        y:0,
      },
      swordP:{
        x:0,
        y:0,
        r:0,
        rx:0,
        ry:0,
        tx:0,
        txR:0,
      },
      baozi:{
        x:200,
        y:200,
      },
      swordPList:[],
      SCS:{
        x:0,
        y:0,
        tx:0,
      },
      config:{
        clickR:18,
        moveR:0,
        rolSpeed:0,
        txRSpeed:0,
        roundlength:150,
      },
      down:false,
      t:null,
      stop:false,
      overzhen:10,
      overzhenStart:0,//没用，专门计数的
      startToRound:100,
      powerover:200,
      
      inpower:0,

      无名:[1,2,3,4,5,6,7,8,9,10],
      moveSecends:0,
      allDamage:0,
      adddamageLsit:[],
      DPS:0,
      maxDPS:0,
      imgUrl:require("@/assets/img/noone.png"),
      
    }
  },
  mounted(){
    console.log('尼格',new Date())
    const that = this
    window.t = null
    window.t = setInterval(() => {
      this.adddamageLsit.unshift(this.allDamage)
      this.DPS = this.adddamageLsit[0]-this.adddamageLsit[2]
      this.maxDPS = this.maxDPS<this.DPS ?this.DPS:this.maxDPS
    }, 500);
    
    this.run()
  },
  methods:{
    adddamage(x,y,index,damage){
      this.allDamage = this.allDamage + damage
      let obj = {
        damage:damage,
        num:this.overzhenStart++,
        id:'damage'+this.overzhenStart,
        x:x,
        y:y,
        show:false,
        rgb:this.Rcolor(),
        class:'damage',
        damagefrom:index,
        //盒子，秒内不会再次触发
        t:setTimeout(() => {
          this.damageList.pop()
        }, 800)
      }

      this.damageList.unshift(obj)
    },
    mousedown(e){
      this.down = true
      this.moveSecends = 0
      if(!window.t){
        this.run()
      }
      this.targetP.x = e.pageX
      this.targetP.y = e.pageY
      this.clickP.x = e.pageX
      this.clickP.y = e.pageY
      this.SCS.x = this.targetP.x - this.swordP.x
      this.SCS.y = this.targetP.y - this.swordP.y
      
      this.SCS.yx = 0
      this.config.rolSpeed = this.config.clickR
    },
    mouseup(e){
      this.down = false
      console.log('downfalseUP')
      this.SCS.tx = -1 
    },
    mouseout(){
      this.down = false
      console.log('downfalsebyOUT')
    },
    mousemove(e){
      if(!this.down){return}
      this.targetP.x = e.pageX
      this.targetP.y = e.pageY
      this.SCS.x = this.targetP.x - this.swordP.x
      this.SCS.y = this.targetP.y - this.swordP.y
      this.SCS.yx = 0
      if(this.moveSecends == 10){this.config.rolSpeed = this.config.moveR;}
      this.moveSecends++
    },
    run(){
      window.t = setInterval(() => {
        let swordP = JSON.parse(JSON.stringify(this.swordP))
        swordP.x =  parseFloat((swordP.x + this.SCS.x/40).toFixed(1))
        swordP.y =  parseFloat((swordP.y +this.SCS.y/40).toFixed(1))
        //旋转角度
        swordP.r += this.config.rolSpeed
        //坐标角度
        swordP.txR += this.config.txR
        //偏离位置
        if(swordP.tx == 0 && this.SCS.tx == -1){
          //回归时 停止
          this.SCS.tx = 0
          this.config.txR = 0
          swordP.txR = 0
          swordP.tx = 0
        }else if(swordP.tx > this.config.roundlength && this.down == true){
          this.SCS.tx = 0
        }else{
          swordP.tx = swordP.tx + this.SCS.tx
        }
        
        if(swordP.tx && swordP.txR){
          swordP.rx = swordP.tx*Math.round(Math.cos((swordP.txR * Math.PI/180)) * 1000000) / 1000000;
          swordP.ry = swordP.tx*Math.round(Math.sin((swordP.txR* Math.PI/180)) * 1000000) / 1000000;
        }
        this.swordP = swordP
        if( this.swordPList.length != (this.无名.length*this.overzhen+10)){
          this.swordPList.unshift(swordP)
        }else{
          this.swordPList.pop()
          this.swordPList.unshift(swordP)
        }
      
      }, 17);
    },
    Rcolor(){
      let r =  parseInt(Math.random()*155)+100
      let g =  parseInt(Math.random()*255)
      let b =  parseInt(Math.random()*255)
      return 'rgb('+r+', '+g+','+b+')'
    },
    doNothing(){}
    
  },
  computed:{
    SP(){
      let p = this.无名.map((s,index)=>{
        if(this.swordPList[index*this.overzhen]){
          // let transltate = ''
          // if(this.swordPList[index*this.overzhen].tx){
          //   transltate = 'translate('+this.swordPList[index*this.overzhen].tx+'px)'
          // }
          let a = this.swordPList[index*this.overzhen]
          let x = a.x + a.rx
          let y = a.y + a.ry
          let r = a.r 
          //帧数判断，位置判断，速度判断(与上一帧做比较)
          if( !this.damageList.find(item=>item.damagefrom == index)){  
            if(  this.baozi.x-20 <x && this.baozi.x+20>x && this.baozi.y-20<y && this.baozi.y+20>y){
              let b = this.swordPList[index*this.overzhen +1]
              let run = false
              for(var key in a){
                if(a[key] != b[key]){
                  run = true
                  break
                }
              }
              if(run){
                let damage = 0    
                damage += parseFloat(Math.abs(x - (b.x + b.rx)).toFixed(1))*10
                damage += parseFloat(Math.abs(y - (b.y + b.ry)).toFixed(1))*10
                damage += parseFloat(Math.abs(r - b.r).toFixed(1))*10
                
                this.adddamage(x,y,index,damage)
              }
            }
            
          }
          return {'position':'absolute',
          'left':x+'px',
          'top':y+'px',
          'transform':'translate(-50%,-50%) rotate('+r+'deg)',
          }
        }else{
          return {}
        }
        
        
        //return {'position':'absolute','left':(this.swordP.x -s)+'px','top':this.swordP.y+'px','transform':'rotate('+this.swordP.r+'deg)'}
      })
      return p
    },
    baoziS(){
      return {'position':'absolute',
        'left':this.baozi.x+'px',
        'top':this.baozi.y+'px',  
      }
    }
    
  },
  watch:{
    'swordP':{
      handler(val,oval){
        // if(val.x == this.targetP.x || val.x==oval.x){this.SCS.x = 0}
        // if(val.y == this.targetP.y || val.y==oval.y){this.SCS.y = 0}
        if(val.x == this.targetP.x || (this.targetP.x-val.x)*(this.targetP.x-oval.x) <0){this.SCS.x = 0;this.stop = true}
        if(val.y == this.targetP.y || (this.targetP.y-val.y)*(this.targetP.y-oval.y) <0){this.SCS.y = 0;this.stop = true}
        if(!this.down  && val.r%360 > 129 && val.r%360 < 141){this.config.rolSpeed =0;val.r = 135;console.log(this.down,'down了么')}
        if(val.y-oval.y==0 &&  val.x-oval.x==0 && this.down ==true){
          //按住并且不动时候 启动 单次触发
          //console.log(this.SCS.tx)
          if(this.inpower == this.powerover){
            this.SCS.tx = 1
            //txR的暂停在run里
            this.config.txR = parseFloat((360/(this.overzhen*this.无名.length)).toFixed(1))
            this.inpower = 0
          }else{
            this.inpower++
          }
        }else if(this.down == false){
          this.inpower = this.inpower!=0?this.inpower--:0
        }
        
        // if((this.targetP.x-val.x)*(this.targetP.x-oval.x) <0 && (this.targetP.y-val.y)*(this.targetP.y-oval.y)){
        //   clearInterval(t);t=null
        // }
        //  if( this.SP[this.SP.length-1] == this.SP[0]){
        //    clearInterval(t);t=null
        //  }
      },
      deep:true
    },
  }
}
</script>

<style scoped>
.blakboad{
  background:#777;
  width: 100%;
  height: 100%;
  position:relative;
  overflow: hidden;
}
.nonDraggableImage{
  z-index: -1;
  -webkit-user-drag: none;
  transform-origin: 70% 30%;
  transform:translate(-50%,-50%)
}
.blakboad2{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  
}
.inputnumber{
  width: 35px;
}
.el-input-number--mini{
  width: 100%;
}
.damage{
  width: 20px;
  height: 20px;
  position: absolute;
  color: #fff;
  left: 100px;
  top: 100px;
  opacity: 0;
  animation:mymove 0.5s ease-in 1;
}
@keyframes mymove{
  0% {transform: translate(-10px,10px);opacity: 0;}
  50% {transform: translate(10px,-50px);opacity:2;}
  100% {transform: translate(30px,-10px);opacity: 0;}
}
</style>
<style >
.el-input-number.is-without-controls .el-input__inner{
  padding: 0;
}
</style>