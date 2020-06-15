import resetImg from '../../assets/reset.png'
import searchImg from '../../assets/search.png'
export const innerFormConfig = [
    {type: 'input', readonly: false, key: 'search', kind: "text", placeholder: "查询技术名", width: '350px' , clearable: true }
]

export const innerSearchButtonsConfig = [
    { key: 0, type: 'primary', src: searchImg, text: '搜索' },
    { key: 1, type: 'primary',text: '重置' , src: resetImg}
]

export const innerTableConfig = [
    {key:'techName',label:'技术名称', align: 'center'}
  ]