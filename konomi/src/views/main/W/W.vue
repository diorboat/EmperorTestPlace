<template>
  <div>
    {{a}}
    <el-button type="primary" @click="CLASS">CLASS</el-button>
  </div>
</template>

<script>
class BBB{
  constructor(param){
    this.a = param.sk
    this.k = null
  }
}
let bb = new BBB({sk:1})
console.log(bb)
const sk = {
  sl:'123',
  slf(){
    return this.sl
  }
}
console.log(sk,sk.slf())
export default {
  data(){
    return{
      a:0
    }
  },
  mounted(){
    
  },
  methods:{
    CLASS(){
      const sk = {
        sl:'123',
        slf(){
          return this.sl
        },
        arr:[],
        add(a=1){this.arr.push(a)},
        get sk(){
          return this.sl+'get!'
        }
      }
      sk.add(2)
      console.log(sk.arr)
      sk.add()
      console.log(sk.arr)
    }
  }
}
</script>

<style>

</style>