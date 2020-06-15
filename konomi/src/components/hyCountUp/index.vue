<template>
    <div :id="aid"></div>
</template>
<script>
export default {
    name: 'hyCountUp',
    props:{
        aid: {
            type: String,
            default:()=>'small'
        },
        startVal:{
            type: Number,
            default:()=> 0
        },
        endVal:{
            type: Number,
            default:()=> 0
        },
        obj:{
            type: Object,
            default() {
                return {
                    options: {
                        useEasing: true,
                        useGrouping: true,
                        separator: '',
                        decimal: '.'
                    },
                    decimals: 0, // 小数点后几位
                    duration: 2 // 时长
                }
            }
        }
    },
    data(){
        return {
            hyCountUp: ''
        }
    },
    mounted(){
        this.$nextTick(function () {
            this.hyCountUpFun()
        })
    },
    watch:{
        endVal(){
            if(this.hyCountUp !=""){
                this.hyCountUp.update(this.endVal)
            }
        }
    },
    methods:{
        hyCountUpFun(){
            this.hyCountUp = new this.m_countUp(this.aid, this.startVal, this.endVal, this.obj.decimals, this.obj.duration, this.obj.options)
            this.hyCountUp.start()
        }
    }
}
</script>