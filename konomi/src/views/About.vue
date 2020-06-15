<template>
  <div class="mmap" style="max-width:700px;max-height:500px;border:1px solid #ccc">
    <baidu-map class="bmp" :center="center" :zoom="zoom" @ready="handler" style="height:500px" @click="getClickInfo" :scroll-wheel-zoom='true'>
    </baidu-map>
  </div>
    
</template>
<script>
console.log('fq')
export default {
  name: '地图',
  data () {
    return {
      center: {lng: 128.45744048529967, lat: 36.49771311230842},
      zoom: 10,
      maker_lng:[
        {name:'dddddeade', lng: 120.45744048529967, lat: 30.49771311230842},
        {name:'ddddeade', lng: 120.35744048529967, lat: 30.49771311230842},
        {name:'dddeade', lng: 120.25744048529967, lat: 30.49771311230842},
        {name:'ddeade', lng: 120.15744048529967, lat: 30.49771311230842}
      ]
    }

  },
  methods: {
    handler ({BMap, map}) {
      var point = new BMap.Point(120.19926175379778, 30.18449676862417)
      map.centerAndZoom(point, 10)
      var marker = new BMap.Marker(point)
      map.addOverlay(marker);
      this.maker_lng.forEach((i,index)=> {
        // var pt = new BMap.Point(120.19926175379778+index, 30.18449676862417)
        var pt = new BMap.Point(i.lng, i.lat)
        let icon = require('../assets/logo.png')
        var myIcon = new BMap.Icon(icon, new BMap.Size(52, 26))
        myIcon.infoWindowOffset = {width:'150px',height:'0px'}
        myIcon.imageSize = new BMap.Size(20, 20)
        var marker = new BMap.Marker(pt,{
          icon:myIcon
        })
        map.addOverlay(marker);
        marker.addEventListener('click',function(e){      
          var Option = {
            title:i.name,
            message:'fffffq',
            infoWindowOffset: {width:'150px',height:'0px'}
          }
          var _html =`<button style='color:#ef25c1'> ${i.name}</button>` 
          var infoWindow = new BMap.InfoWindow(_html,Option);
          map.openInfoWindow(infoWindow,pt)
        })
        
        
        var bdary = new BMap.Boundary()
        var pNW = { lat: 59.0, lng: 73.0 }
				var pNE = { lat: 59.0, lng: 136.0 }
				var pSE = { lat: 3.0, lng: 136.0 }
				var pSW = { lat: 3.0, lng: 73.0 }
				//向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
				var pArray = [];
				pArray.push(pNW);
				pArray.push(pSW);
				pArray.push(pSE);
				pArray.push(pNE);
        pArray.push(pNW);
        var pointArray = []
        bdary.get('杭州', function(res){
          var count = res.boundaries.length
          for (var j = 0; j< count  ; j++){
            var ply =new BMap.Polygon(res.boundaries[j],
              {strokeWeight: 2, strokeColor: "#F5533D",fillColor:'#F5533D',fillOpacity:0.01}
            )
            map.addOverlay(ply); //添加覆盖物
            var path = ply.getPath();
            pointArray = pointArray.concat(path);
            pArray.push(pArray[0]);
          }
          var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.5, strokeColor: "#fff", strokeWeight: 0.00001, fillColor: "#ffffff", fillOpacity: 0.8 }); //建立多边形覆盖物
          map.addOverlay(plyall);
        })
      })
    },
    getClickInfo (e) {
      // console.log(e.point.lng)
      // console.log(e.point.lat)
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    }
  }
}
</script>
<style >
  .anchorBL{ 
    display:none ;
  }
  .mmap{
    border-radius: 10px;
  }
 
</style>