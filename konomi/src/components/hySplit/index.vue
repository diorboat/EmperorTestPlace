<template>
    <div class="hySplit" ref="hySplit" @mousemove="mouseoverFun" @mouseup="mouseupFun" @click="mouseoverFun">
        <div class="left" ref="left" :style="{width: `${width}px`}">
            <slot name="left"></slot>
        </div>
        <div :class="{move: move}" class="move_box" @mousedown="mousedownFun" :style="{backgroundColor: color}"></div>
        <div class="right" ref="right" :style="{width: `calc(100% - ${width+10}px)`}">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'hySplit',
    props:{
        initialWidth:{
            type: Number,
			default: () => 330
        },
        move: {
			type: Boolean,
			default: () => false
        },
        minWidth:{
            type: Number,
			default: () => 100
        },
        maxWidth:{
            type: Number,
			default: () => 100
        },
        color:{
            type: String,
			default: () => ''
        }
    },
    data(){
        return{
            x: '',
            width: 0,
            oldWidth: '',
            left: 0,
            allWidth: 0
        }
    },
    mounted(){
        this.width = this.initialWidth
        this.allWidth = this.$refs.hySplit.clientWidth
        this.left = this.$refs.hySplit.getBoundingClientRect().left
        console.log(this.mouseoverFun)
    },
    methods:{
        mousedownFun(e){
            console.log('mousedownFun')
            this.oldWidth = this.width
            this.x = e.layerX - this.oldWidth
        },
        mouseupFun(){
            this.x = ''
            this.oldWidth = this.width
        },
        mouseoverFun(e){
            console.log(this.x && this.move)
            if(this.x && this.move){
                let add =  e.clientX - this.x - this.left 
                console.log(e.clientX, this.x, this.left, 63)
                if(add >= this.minWidth && (this.allWidth - add) >= this.maxWidth){
                    this.width = add
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.hySplit
    width 100%
    height 100%
    display flex
    position relative
    .left
        height 100%
    .right
        height 100%
    .move
        cursor col-resize
    .move_box
        width 10px
        height 100%
        min-height 25px;
        // background-color red
</style>