<template>
    <div class="treeBox">
        <div class="head" @click="onClickNode({})">
            <div class="treeShowTitle">全部数据</div>
            <div class="total">{{nodeTotal}}</div>
        </div>
        <div class="body">
            <div class="firstLevel" v-for="(item,index) in levelData" :key="index">
                <div class="levelContain">
                    <div class="top" @mouseenter="enterArea" @mouseleave="leaveArea">
                        <scroll-lock class="rightArea1" v-if="item.name=='缓冲区（BUF）'&&areaShow">
                            <div class="nodeContain">
                                <div class="right_top" v-for="(ele, el) in item.children" :key="el" @click="onClickNode(ele)">
                                    <div class="items">
                                        {{ele.name}}<span class="countNum">{{ele.count}}</span>
                                    </div>
                                </div>
                            </div>
                        </scroll-lock>
                        <scroll-lock class="rightArea" v-if="item.name!='缓冲区（BUF）'&&areaShow" :style="{height: viewHeight+'px'}" :class="positionTop?'rightAreaTop':'rightAreaDown'">
                            <div class="itemsArea" v-for="(ele, el) in item.children" :key="el">
                                <div class="right_top" @click="onClickNode(ele)">{{ele.name}}</div>
                                <div class="right_bottom">
                                    <div class="items">
                                        <div
                                            class="item"
                                            @click="onClickNode(i,item.name)"
                                            v-for="(i,j) in ele.children"
                                            :key="j"
                                        >{{i.name}}<span class="countNum2" @click.stop="onClickNode(i,item.name)">{{i.count}}</span></div>
                                    </div>
                                </div>
                            </div>
                        </scroll-lock>
                        <div class="levelName" @click="onClickNode(item)">{{item.name}}</div>
                        <div class="total">{{item.count}}</div>
                    </div>
                    <div class="bottom" v-if="item.name!='缓冲区（BUF）'">
                        <div
                            class="bottom_item"
                            v-for="(ele, el) in item.children"
                            :key="el"
                            @click="onClickNode(ele)"
                            @mouseenter="enterArea"
                            @mouseleave="leaveArea"
                        >
                            <div class="treeShowTitle">
                                <span>{{ele.name}}</span>
                                <span class="countNum">{{ele.count}}</span>
                            </div>
                            <div class="rightArea2" v-if="ele.children&&areaShow" :style="{maxHeight: viewHeight+'px'}" :class="positionTop?'rightAreaTop':'rightAreaDown'">
                                <div class="nodeContain">
                                    <div class="right_top" v-for="(i,j) in ele.children" :key="j" @click.stop="onClickNode(i,item.name)">
                                        <div class="items">
                                            <span>{{i.name}}</span>
                                            <span class="countNum">{{i.count}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hyTreeShow',
    props: {
        // 总数
        nodeTotal: {
            type: Number,
            default: ()=> 0
        },
        // 树data数据
        levelData: {
            type: Array,
            default: ()=> []
        },
        // 判断页面
        type: {
            type: String,
            default: ()=> ''
        }
    },
    data() {
        return {
            // 可视区域高度
            viewHeight: 0,
            // hover框位置判断
            positionTop: true,
            // 重新渲染参数
            areaShow: false,
        }
    },
    mounted() {
        this.viewHeight = (document.body.clientHeight - 150)/2
    },
    methods: {
        // 点击树节点触发
		onClickNode(node,pname) {
            // console.log(pname,'pname')
            if(this.type == 'resource') {
                let nodeId = ''
                // 父节点id
                let nodePid = node.parentId
                let nodeTitle = ''
                if (node.id) {
                    nodeId = node.id;
                    // if(node.pcategory_name) {
                    //     if(pname) {
                    //         nodeTitle = pname + ' - ' + node.pcategory_name + ' - ' + node.name;
                    //     }else{
                    //         nodeTitle = node.pcategory_name + ' - ' + node.name;
                    //     }
                    // }else{
                    //     nodeTitle = node.name;
                    // }
                    nodeTitle = node.parentNames
                } else {
                    nodeId = "";
                    nodeTitle = "全部数据";
                }
                this.$emit('onClickNode',nodeId,nodeTitle,nodePid)
            }
        },
        enterArea(e) {
            let top = e.pageY - 150
            if(top>this.viewHeight) {
                this.positionTop = false
            }else{
                this.positionTop = true
            }
            this.areaShow = true
        },
        leaveArea() {
            this.areaShow = false
        }
    },
}
</script>

<style lang="stylus" scoped>
.treeBox
    .head
        height 38px
        display flex
        align-items center
        background #00A0FC
        .treeShowTitle
            margin 0 80px 0 20px
            color #fff
            font-size 16px
            cursor pointer
        .total
            background #0090e3
            border-radius 10px
            font-size 12px
            color #FEFEFE
            padding 5px 13px
    .firstLevel
        align-items center
        background #fff
        border-bottom 1px solid #EAEFF3
        .levelContain
            margin 10px 0
            .top
                padding 15px
                display flex
                justify-content space-between
                align-items center
                position relative
                .levelName
                    cursor pointer
                    font-size 14px
                .total
                    background #EAEFF3
                    border-radius 10px
                    font-size 12px
                    color #00A0FC
                    padding 2px 13px
                &:hover
                    background #E7F6FF
                    .total
                        background #fff
                    .rightArea
                        display block
                    .rightArea1
                        display block
            .bottom
                padding 0 15px
                display flex
                flex-wrap wrap
                .bottom_item
                    width 100px
                    cursor pointer
                    display flex
                    justify-content center
                    padding  3px 8px
                    margin 5px 0
                    font-size 14px
                    color #899297
                    border-right 1px solid #CAD2D8
                    position relative
                    .treeShowTitle
                        width 100%
                        display flex
                        justify-content space-between
                        .countNum
                            // width 40px
                            color #00a0fc
                            font-size 10px
                            line-height 12px
                            margin 3px
                            text-align right
                    &:nth-child(2n)
                        border none
                    &:last-child
                        border none
                    &:hover
                        background #E7F6FF
                        .rightArea2
                            display block
                    .rightArea2
                        border 1px solid #cad2d8
                        box-shadow 4px 4px 30px 0px rgba(0, 0, 0, 0.05)
                        z-index 999
                        background #fff
                        display none
                        position absolute
                        left 100%
                        width 400px
                        &.rightAreaTop
                            top 0
                        &.rightAreaDown
                            bottom 0
                        .nodeContain
                            display flex
                            flex-wrap wrap
                            .right_top
                                border-right 1px solid #cad2d8
                                margin 10px 0
                                cursor pointer
                                padding 0 15px 
                                font-weight 500
                                color #899297
                                font-size 14px
                                line-height 14px
                                &:nth-child(2n)
                                    border none
                                    .items
                                        width 160px
                                &:last-child
                                    border none
                                .items
                                    width 160px
                                .countNum
                                    // text-align right
                                    // width 40px
                                    color #00a0fc
                                    font-size 10px
                                    line-height 12px
                                    padding 3px 10px
            .rightArea
                // max-height 400px
                overflow-y auto
                border 1px solid #cad2d8
                box-shadow 4px 4px 30px 0px rgba(0, 0, 0, 0.05)
                z-index 999
                background #fff
                display none
                position absolute
                // top 0px
                left 240px
                &.rightAreaTop
                    top 0
                &.rightAreaDown
                    bottom 0
                .treeShowTitle
                    font-size 18px
                    margin 20px 0 10px 20px
                .itemsArea
                    padding 4px 15px
                    width 800px
                    .right_top
                        cursor pointer
                        padding 10px 15px 
                        font-weight 500
                        color #333
                        font-size 16px
                        line-height 16px
                    .right_bottom
                        padding 3px
                        .items
                            display flex
                            justify-content flex-start
                            flex-wrap wrap
                            white-space nowrap
                            .item
                                display flex
                                cursor pointer
                                padding 0 10px
                                margin-top 4px
                                color #899297
                                font-size 14px
                                border-right 1px solid #cad2d8
                                &:last-child
                                    border none
                        .countNum2
                            width 20px
                            color #00a0fc
                            font-size 10px
                            line-height 12px
                            margin 3px
                            text-align right
            .rightArea1
                border 1px solid #cad2d8
                box-shadow 4px 4px 30px 0px rgba(0, 0, 0, 0.05)
                z-index 999
                background #fff
                display none
                position absolute
                padding-left 15px
                max-height 600px
                width 800px
                overflow-y auto
                top 0px
                left 240px
                &.rightAreaTop
                    top 0
                &.rightAreaDown
                    bottom 0
                .treeShowTitle
                    font-size 18px
                    margin-top 20px
                .nodeContain
                    display flex
                    flex-wrap wrap
                    .right_top
                        border-right 1px solid #cad2d8
                        margin 10px 0
                        cursor pointer
                        padding 0 15px 
                        font-weight 500
                        color #899297
                        font-size 14px
                        line-height 14px
                        &:nth-child(4n)
                            border none
                        &:last-child
                            border none
                        .items
                            width 140px
                        .countNum
                            // text-align right
                            // width 40px
                            color #00a0fc
                            font-size 10px
                            line-height 12px
                            padding 3px 10px
</style>
