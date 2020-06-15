<template>
  <div id="app">
    <div class="rview">
      <router-view></router-view>
    </div>
    
    <div id="nav">
      <el-menu  mode="horizontal" >
        <el-menu-item index="9999">
          <template slot="title"><router-link to="/">Home</router-link> |</template>
          
        </el-menu-item>
      
        <el-menu-item v-for='(item,index) of menuMap' :key='index' index="index">
          <router-link :to="item.path">{{item.name}}</router-link>|
        </el-menu-item>
      </el-menu>
    </div>
    
  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this.$store.state.map.filter(item => !!item.meta || ( !!item.meta&&item.meta.level<3)))
  },
  computed:{
    menuMap(){
      return this.$store.state.map.filter(item => !!item.meta || ( !!item.meta&&item.meta.level<3))
    }
  }
}
</script>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body{
  padding: 0px;
  margin: 0px;
  height: 100%;
}
#nav {
  padding:0px;
  position: fixed;
  bottom: 0px;
  z-index: 999;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.rview{
  height: calc(100vh)
}
.el-menu{
  background-color: rgba(255, 255, 255, 0.1)
}
</style>
