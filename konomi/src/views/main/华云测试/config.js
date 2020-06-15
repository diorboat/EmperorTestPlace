export const table = {
  tableData:[
    {ruleName:123},
  ],
  tableConfig: [
    { key: 'ruleName', label: '规则名称' },
    { key: 'ruleDesc', label: '规则说明' },
    { key: 'ruleTypeName', label: '规则类型' },
    { key: 'implementWay', label: '实现方式' },
    { key: 'creator', label: '责任人' },
    { key: 'tel', label: '联系方式' },
    { key: 'createTime', label: '创建时间', sortable: true },
    { key: 'lastEditTime', label: '最近修改时间', sortable: true }
  ]
}
export const searchForm ={
  searchFormConfig: [
      {
          type: 'select',
          disabled: false,
          key: 'negativeBusiArea',
          kind: 'text',
          clearable: true,
          placeholder: '归属专业部门',
          width: '200px',
          options: []
      },
      {
          type: 'select',
          disabled: false,
          key: 'negativeRuleType',
          kind: 'text',
          clearable: true,
          placeholder: '责任人',
          width: '200px',
          options: [
              {value: 'P', label: '预设'},
              {value: 'M', label: '高级模式'}
          ]
      },
      {
          type: 'input',
          disabled: false,
          key: 'keyWord',
          kind: 'text',
          clearable: true,
          placeholder: '关键词',
          width: '250px'
      }
  ],
  searchFormData:{
    keyWord: '', // 关键字
    negativeBusiArea: '', // 适用业务域
    negativeRuleType: '', // 规则匹配类型
    ruleState: '', // 状态
  },
  searchButtonsConfig: [
      { key: 1, type: 'primary', text: '查询' },
        // { key: 2, type: 'info', text: '重置' },
        { key: 3, type: '', text: '新增规则配置', icon: 'el-icon-plus' }
  ]
}

export const countConfig = {
  
}
export const chartOptions = {
  title: {
    show: true,
    textStyle: {
      fontSize: 14,
      color: "#333",
      fontWeight: 400
    },
    top: 10,
    left: 20,
    text: "服务调用(次)"
  },
  color: [
    "rgba(104, 165, 245, 1)",
    "rgba(143, 139, 255, 1)",
    "#61a0a8",
    "#d48265",
    "#91c7ae",
    "#749f83",
    "#ca8622",
    "#bda29a",
    "#6e7074",
    "#546570",
    "#c4ccd3"
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  grid: {
    left: 30,
    right: 20,
    bottom: 10,
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["2020.02.01", "2020.02.02"],
      splitLine: {
        show: false
      },
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        color: "rgba(67, 66, 93, .5)"
      },
      axisLine: {
        lineStyle: {
          color: "rgba(234, 240, 244, 1)"
        }
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        onZero: true,
        formatter: "{value}",
        color: "rgba(67, 66, 93, .5)"
      },
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(234, 240, 244, 1)"
        }
      }
    }
  ],
  series: [
    {
      type: "line",
      smooth: true,
      symbol: "none",
      areaStyle: {
        opacity: 0.1
      },
      data: [0.63, 0.85]
    }
  ]
};
