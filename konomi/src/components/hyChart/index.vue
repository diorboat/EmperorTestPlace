<template>
	<div class="echartBox" :id="aid" v-resize="redraw"></div>
</template>
<script>
const echarts = require("echarts");
export default {
	name: 'hyChart',
	props: ["aid", "data"],
	data() {
		return {
			chart: ""
		};
	},
	mounted() {
		this.$nextTick(function() {
			this.chartCreat();
		});
	},
	watch: {
		data: {
			deep: true,
			handler: function(newVal, oldVal) {
				this.chartCreat();
			}
		}
	},
	methods: {
		redraw() {
			if (this.chart) {
				this.chart.resize();
			}
		},
		chartCreat() {
			if (this.data) {
				if (this.chart != "" && this.chart != undefined) {
					this.chart.dispose();
					this.chart = "";
				}
				if (document.getElementById(this.aid)) {
					// debugger
					console.log(this.data, 41)
					this.chart = echarts.init(document.getElementById(this.aid));
					this.chart.setOption(this.data);
					// this.chart.on("click", this.onclick);
					// if (this.aid == "sankeychart") {
					// 	let chart = this.chart;
					// 	let data = this.data;
					// 	this.xuanFun(chart, data);
					// }
				}
			}
		},
		// onclick(val) {
		// 	this.$emit("onclick", val);
		// },
		// xuanFun(myChart) {
		// 	let currentIndex = 0;
		// 	let list = [1, 0, 5, 2, 6, 4, 3];
		// 	var dataLen = list.length;
		// 	select();
		// 	clearInterval(this.timer);
		// 	this.timer = setInterval(function() {
		// 		select();
		// 	}, 3000);

		// 	function select() {
		// 		// 取消之前高亮的图形
		// 		myChart.dispatchAction({
		// 			type: "focusNodeAdjacency",
		// 			seriesIndex: 0,
		// 			dataIndex: list[currentIndex]
		// 		});
		// 		currentIndex = (currentIndex + 1) % dataLen;
		// 		// 高亮当前图形
		// 	}
		// }
	},
	beforeDestroy() {
		clearInterval(this.timer);
	}
};
</script>
<style lang="stylus" scoped>
.echartBox
	width 100%
	height 100%
</style>
