<template>
    <!-- 流程状态 -->
    <div class="steps_box">
        <!-- <div class="title">审批流程</div> -->
        <el-steps :active="activeNum" align-center>
            <el-step class="steps" v-for="(item, i) in stepsColm" :key="i" :title="item.name">
                <template slot="icon">
                    <el-tooltip placement="top" v-if="(infoList[i] || []).length > 0">
                        <div v-for="(item,index) in infoList[i]" :key="index" slot="content">审批人：{{item.userName}}&nbsp;&nbsp;&nbsp;&nbsp;联系方式：{{item.tel}}&nbsp;&nbsp;&nbsp;&nbsp;状态：{{item.state}}<br/></div>
                        <div class="imgBox" v-if="i<activeNum" :style="{background:colorList[i]}">
                            <img :src="iconObj[item.icon]"  alt="">
                        </div>
                        <div class="imgBox" v-else style="background:#ccc">
                            <img :src="iconObj[item.icon]" alt="">
                        </div>
                    </el-tooltip>
                    <div v-else>
                        <div class="imgBox" v-if="i<activeNum" :style="{background:colorList[i]}">
                            <img :src="iconObj[item.icon]"  alt="">
                        </div>
                        <div class="imgBox" v-else style="background:#ccc">
                            <img :src="iconObj[item.icon]" alt="">
                        </div>
                    </div>
                </template>
            </el-step >
        </el-steps>
        <el-table border :data='approvalTableData' size="mini">
            <el-table-column v-for="(column) in approvalColmn" :prop="column.key" :key="column.key" :label="column.label" :width="column.width">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// 开始
import start from '@/assets/process/start.png'
// 科信部
import kxb from '@/assets/process/kxb.png'
// 责任部门
import sjgkbm from '@/assets/process/sjgkbm.png'
// 归口部门主任
import gkbmzr from '@/assets/process/gkbmzr.png'
// 中心技发部主任
import jsfzb from '@/assets/process/jsfzb.png'
// 数据组人员
import sjzry from '@/assets/process/sjzry.png'
// 需求方确认
import xqfqr from '@/assets/process/xqfqr.png'
// 信息中心专责归档
import xxzxzz from '@/assets/process/xxzxzz.png'  
// 需求部门
import xqbm from '@/assets/process/xqbm.png'
// 信息中心
import xxzx from '@/assets/process/xxzx.png'
// 执行人
import zxr from '@/assets/process/zxr.png'
// 结束
import end from '@/assets/process/end.png'
export default {
    name:'hyProcess',
    props:{
        active:{
            type: Number,
            default: () => 0
        },
        stepsColm:{
            type: Array,
            default() {
                return []
            }
        },
        infoList: {
            type: Array,
            default() {
                return []
            }
        },
        approvalColmn:{
            type: Array,
            default() {
                return [
                    {key:'stageCh',label: '阶段',width: '150px'},
                    {key:'approval_time_end',label: '审批时间',width: '200px'},
                    {key:'approval_user',label: '审批人'},
                    {key:'approval_tel',label: '联系方式'},
                    {key:'approval_conclusion',label: '审批结论'},
                    {key:'approval_opinion',label: '审批意见',width: '250px'}
                ]
            }
        },
        approvalTableData:{
            type: Array,
            default() {
                return []
            }
        }
    },
    mounted() {
        console.log(this.stepsColm,22)
    },
    data(){
        return{
            activeNum: 0,
            iconObj:{
                start: start,
                xqbm: xqbm,
                sjgkbm: sjgkbm,
                gkbmzr: gkbmzr,
                xxzx: xxzx,
                jsfzb: jsfzb,
                sjzry: sjzry,
                xqfqr: xqfqr,
                xxzxzz: xxzxzz,
                kxb: kxb,
                zxr: zxr,
                end: end,
            },
            colorList: [
                '#A8E6FF',
                '#FCBE56',
                '#F57F8D',
                '#A2CDFF',
                '#9DD77B',
                '#DD84EF',
                '#72DCD7',
                '#92A5F5',
                '#F3DC74',
                '#A8E6FF',
            ]
        }
    },
    watch:{
        active(){
            let len = this.stepsColm.length - 1
            this.activeNum = this.active
            console.log(len,this.active,312)
            if(this.active == len){
                this.activeNum = len +1
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.steps_box
    padding 10px 40px
    background-color #ffffff
    border-bottom 5px solid #f5fafd
</style>
<style>
.imgBox{
    border-radius: 50%;
    padding: 10px;
}
.imgBox img {
    width: 30px;
    height: 30px;
}
.el-step__main{
    margin-top: 20px;
}
.steps .is-text {
  border: 2px solid transparent !important;
}
</style>
