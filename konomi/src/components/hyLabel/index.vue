<template>
    <div class="labelBox">
        <span class="title">标签：</span>
        <div :class="item.class?'labelActive':'labels'" v-for="(item,index) in labelShowArr" :key='index' @click="labelClick(item,index)">{{item.label}}</div>
        <span class="btn" v-if="!moreShow" @click="moreLabels(true)">更多</span>
        <span class="btn" v-else @click="moreLabels(false)">收起</span>
    </div>
</template>
<script>
export default {
    name: 'hyLabel',
    props: {
        labelArr: {
            type: Array,
            default: ()=> []
        },
        sliceNum: {
            type: Number,
            default: ()=> 1
        }
    },
    data() {
        return {
            moreShow: false,
            labelShowArr: [],
            labelSaveArr: []
        }
    },
    mounted() {
        this.labelArr.forEach(item => {
            this.labelSaveArr.push({label: item,class: false})
        });
        this.moreLabels(false)
    },
    methods: {
        moreLabels(val) {
            this.moreShow = val
            if(val){
                this.labelShowArr = this.labelSaveArr
            }else{
                this.labelShowArr = this.labelSaveArr.slice(0,this.sliceNum)
            }
        },
        labelClick(item,index) {
            let labelString = ''
            this.labelShowArr[index].class = !this.labelShowArr[index].class
            this.labelShowArr.forEach(item => {
                if(item.class) {
                    if(labelString.length){
                        labelString = labelString +','+ item.label
                    }else{
                        labelString = item.label
                    }
                }
            })
            this.$emit('changeLabels',labelString)
        }
    },
}
</script>
<style lang="stylus" scoped>
.labelBox {
    width: 100%;
    padding-bottom: 10px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;

    div {
        padding 5px 0;
        &:first-child {
            margin: 0 !important;
        }
    }

    .title {
        padding 5px 0;
        margin-left: 30px;
    }

    .labels {
        margin: 0 10px;
        cursor: pointer;
    }

    .labelActive {
        margin: 0 10px;
        cursor: pointer;
        color: #00CAFC;
    }

    .btn {
        padding 5px 0;
        margin-left: 20px;
        cursor: pointer;

        &:hover {
            color: #00CAFC;
        }
    }
}
</style>
