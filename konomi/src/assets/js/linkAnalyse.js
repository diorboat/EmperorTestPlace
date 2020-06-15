import error from './error.png'
import wait from './wait.png'
import finish from './finish.png'
import running from './running.png'
import node from './node.png'
var highlightedNodeColor='#FFFED5';
var highlightedLinkColor='#ff9800';
var nodeMovable=true;
var linkLineColor = {
	'-1' : '#cb6e6e',
	'0'  : '#bbbcbc',
	'1'  : '#62cedd',
	'2'	 : '#62dd8d'
};
var init,destroy
var maxHLevel = 0;

var linkLineState = {
	
};

var hideNodes = [];

var hideLinks = [];

var nodeObj = {},
	images = [
		error,
		wait,
		finish,
		running,
		node
	],
	names = [
		'error',
		'wait',
		'finish',
		'running',
		'node'
	];
import { config } from '@/utils/config';
const appUrl = config.baseApiHost;
// console.log(appUrl,1234444)
// var appUrl = 'http://localhost:8081';
// var appUrl = 'http://172.30.83.65:8084';
// var appUrl ='http://10.136.229.206:9095';
// var appUrl ='http://11.11.20.14:8081';

function regImage(network){
	$.each(images,function(index,url){
		Image.Util.registerImage(url,true,names[index]);
	});
}

twaver.Util.registerImage('test_vector', {		
	w: '<%=getClient("width")%>',
	h: 28,
	origin: { x: 0, y: 0 },
	lineWidth:1,
	lineColor: '#5FB1AF',	
	v: [{
		shape: 'rect',
		w: '100%',
		h: '100%',
		fill: function(data, view){
			if(data.getClient('highlighted')){
				return highlightedNodeColor;
			}
			if(data.getChildrenSize()>0){
				return '#FFE6D5';
			}
			return '#FFFCFA';
		},
		lineWidth:2,
	},{
		shape: 'rect',
		x: 7.5,
		y: 8.5,
		w: 12,
		h: 12,					
		visible: '<%=getChildrenSize()>0%>',
	},{
	  shape: 'line',
	  p1: { x: 13.5, y: 9 },
	  p2: { x: 13.5, y: 21, },
	  lineWidth:0.5,
	  visible: '<%=getChildrenSize()>0 && !isExpanded()%>',
	},{
	  shape: 'line',
	  p1: { x: 8, y: 14.5 },
	  p2: { x: 20, y: 14.5 },
	  lineWidth:0.5,		  
	  visible: '<%=getChildrenSize()>0%>',
	},{
		shape: 'vector',
		name: '<%=getClient("icon")%>',
		scale: { x: 0.85, y: 0.85 },
		x: 15,
		y: 8,
		lineWidth:0,
	}],
	onMouseEnter: function (data, view) {
		updateFocus(data, true);
	},
	onMouseLeave: function (data, view) {
		updateFocus(data, false);
	},
});

destroy = function(){
	linkLineState = {};
	nodeObj = {};
}

init = function(project,tableName) {
	twaver.Defaults.TOOLTIP_XOFFSET = 50;
	twaver.Defaults.TOOLTIP_YOFFSET = -30;
	var box = new twaver.ElementBox();
	var network = new twaver.vector.Network(box);

	var view = network.getView();
	view.style.background="#ebebeb";
	regImage(network);
	
	//document.body.appendChild(view);
	$('#link').append(view);
	// var cHeight = document.documentElement.clientHeight > document.body.clientHeight ?  document.documentElement.clientHeight : document.body.clientHeight,
	// 	cWidth = document.documentElement.clientWidth;
	network.adjustBounds({
		x:0,
		y:0,
		width: $('#link').width(),
		height: $('#link').height()
	});
	
//	network.adjustBounds({x:0,y:0,width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});
	network.setLinkPathFunction(createLinkPath);
	network.setMovableFunction(function (element) { return nodeMovable; });
	network.setToolTipEnabled(true);
	network.setDragToPan(true);//默认是true，设置成false 则画布无法拖动
	network.setScrollBarWidth(10);
	network.setScrollBarVisible(true);//隐藏滚动条
	network.getView().addEventListener('mousemove',function(e){		
		var element = network.getElementAt(e);
		highlightNode(network.getElementBox(), element);
	});
	network.addInteractionListener(function(e){
		 if(e.kind === 'clickElement' && e.element){
			 // 单击事件
			 if('MyGroup' === e.element.getClassName()){// 单击节点事件
				 var id = e.element.getClient('id');
				 var btn = e.element;
				 if(-1 != id.indexOf('moreBtn')){
					 if('true' == btn.getClient('hideFlag')){
						 createHideNodes(box,btn.getClient('hLevel'));
						 btn.setClient('hideFlag','false');
						 btn.setName('收起...');
					 }else{
						 btn.setClient('hideFlag','true');
						 btn.setName('更多...');
						 removeHideNodes(box,btn.getClient('hLevel'));
					 }
				 }
			 }
		 }
	});

	box.addDataPropertyChangeListener(function(e){
		if(e.property==='expanded'){
			var node=e.source;
			fixLocation(node);
		}
	});
			
	box.getLayerBox().add(new twaver.Layer('node'));
	box.getLayerBox().add(new twaver.Layer('link'));
	
	createLinkAnalyse(box,project,tableName);

	window.onresize = function (e) {
		var width = document.documentElement.clientWidth,
			height = document.documentElement.clientHeight > document.body.clientHeight ?  document.documentElement.clientHeight : document.body.clientHeight;
		network.adjustBounds({
			// x:10,
			// y:60,
			// width:cWidth - 220 ,
			// height:cHeight - 210
			x:0,
			y:0,
			width: $('#link').width(),
			height: $('#link').height()
		});

	};
}

function fixLocation(node){		
	if(node.isExpanded()){
		node.getChildren().forEach(function(child){
			child.setLocation(child.getClient('x'), child.getClient('y'));
			fixLocation(child);
		});
	}else{
		node.setLocation(node.getClient('x'), node.getClient('y'));
	}
}

function updateFocus(data, focus){
	if(data instanceof twaver.Node){
		var oldFocus=data.getClient('focus');
		if(oldFocus!=focus){
			data.setClient('focus', focus);	
		}
	}
}

function createNode(box, x, y, name, icon, parent){
	var node = new twaver.Node();			
	node.setClient('width', 130);	
	node.setClient('height', 40);
	node.setClient('x', x);
	node.setClient('y', y);
	node.setClient('id',name);
	box.add(node);		

	if(x && y){
		node.setLocation(x, y);
	}
	node.setWidth(130);
	node.setHeight(35);
	
	node.setStyle('body.type','default.vector');//节点类型
	node.setStyle('vector.shape','roundrect');//节点形状
	node.setStyle('vector.gradient','linear.east');//背景色填充方式
	node.setStyle('vector.fill.color','#5ab4e0');//背景色
	node.setStyle('vector.gradient.color','#4bcee1');//渐变色
	
	node.setStyle('label.color','#ffffff');//文字颜色
	node.setStyle('label.font','14px Arial');//文字字体
	node.setStyle('label.xoffset',10);//
	node.setStyle('label.yoffset',-28);//文字位置
	
	if(name){
		if(-1 != name.indexOf('odps.')){
			name = name.substr(5);
		}
		var length = getStringLength(name);
		if(length > 16){
			node.setName(getSubString(name,10) + '...');
		}else{
			node.setName(name);
		}
		node.setToolTip(name);
	}
	node.setImage(null);
	if(icon){
		node.setStyle('icons.names', [icon]);
		node.setStyle('icons.position','left');
		node.setStyle('icons.xoffset',15);
		node.setStyle('icons.yoffset',0);
	}

	return node;
}

function createLink(box, from, to, offset, pattern){
	var link = new twaver.Link(from, to);	
	if(offset){
		link.setClient('offset', offset);
	}
	link.setStyle('link.type', 'orthogonal.horizontal');
	link.setStyle('arrow.to', false);		
	
	if('-1' == linkLineState[from.getClient('id') + '=' + to.getClient('id')]){
		link.setStyle('icons.names','error');
	}else if('1' == linkLineState[from.getClient('id') + '=' + to.getClient('id')]){
		link.setStyle('icons.names',['running']);
	}else if('2' == linkLineState[from.getClient('id') + '=' + to.getClient('id')]){
		link.setStyle('icons.names',['finish']);
	}else{
		link.setStyle('icons.names',['wait']);
	}
	
	link.setStyle('icons.position','center');//线上图标位置
	
	if(pattern){
		link.setStyle('link.pattern', pattern);
	}
	link.setLayerId('link');
	highlightLink(from,to,link, false);
	box.add(link);
}

function createLinkPath(linkUI, defaultPoints){
	var f = linkUI.getFromPoint();
	var t = linkUI.getToPoint();		
	var fromNode=linkUI.getElement().getFromAgent();
	var toNode=linkUI.getElement().getToAgent();

	var points = new twaver.List();
	var pFrom={x: f.x+fromNode.getWidth()/2+1, y: f.y};
	var pFromNext={x: f.x+fromNode.getWidth()/2+1+20, y: f.y};
	var pToNext2={x: t.x-toNode.getWidth()/2-2-20, y: t.y};
	var pToNext1={x: t.x-toNode.getWidth()/2-2-10, y: t.y};
	var pTo={x: t.x-toNode.getWidth()/2-2, y: t.y};

	points.add(pFrom);
	if(linkUI._element.getClient('offset')){
		var direction=t.x<f.x ? -1: 1;
		var controlY=linkUI._element.getClient('offset');
		var seg = new twaver.List();
		seg.add({x: f.x+fromNode.getWidth()/2+1+10, y: f.y});
		seg.add({x: f.x+fromNode.getWidth()/2+1+10, y: controlY});						
		seg.add({x: f.x+fromNode.getWidth()/2+1+50*direction, y: controlY});
		points.add(seg);
		points.add({x: t.x-toNode.getWidth()/2-2-50*direction, y: controlY});
		var seg = new twaver.List();
		seg.add({x: t.x-toNode.getWidth()/2-2-20, y: controlY});
		seg.add({x: t.x-toNode.getWidth()/2-2-20, y: t.y});
		seg.add({x: t.x-toNode.getWidth()/2-2-5, y: t.y});
		points.add(seg);
	}else{
		var seg = new twaver.List();	
		seg.add(pFromNext);
		seg.add(pToNext2);
		seg.add(pToNext1);			
		points.add(seg);
	}
	points.add(pTo);

	return points;
}

function highlightNode(box, element){		
	box.forEach(function(data){
		if(data instanceof twaver.Node){
			data.setClient('highlighted', false);		
			data.setStyle('group.fill.color', '#FFFCFA');
		}
		if(data instanceof twaver.Link){
			highlightLink(data, false);
		}
	});
	if(element){
		if(element instanceof twaver.Node){
			element.setClient('highlighted', true);
			element.setStyle('group.fill.color', highlightedNodeColor);
		}
		if(element instanceof twaver.Link){
			highlightLink(element, true);
		}
	}
	//highlight related links.
	if(element instanceof twaver.Node){
		var nodes=[];
		nodes.push(element);
		if(element.getChildrenSize()>0){
			nodes=nodes.concat(element.getChildren().toArray());
		}
		
		box.forEach(function(data){
			if(data instanceof twaver.Link){
				var link=data;
				var from=link.getFromAgent();
				var to=link.getToAgent();
				if(arrayContains(nodes, from, to)){
					highlightLink(link, true);
				}
			}
		});
	}		
}

function highlightLink(from,to,link, highlighted){
//	if(highlighted){
//		link.setStyle('link.color', highlightedLinkColor);
//		link.setStyle('link.width', 1);
//		link.setStyle('arrow.to.color', highlightedLinkColor);
//	}else{
	if(null != link && undefined != link){
		link.setStyle('link.color',linkLineColor[linkLineState[from.getClient('id') + '=' + to.getClient('id')]]);
		link.setStyle('link.width', 1);
		link.setStyle('arrow.to.color', linkLineColor[linkLineState[from.getClient('id') + '=' + to.getClient('id')]]);
	}
//	}
}

function arrayContains(array, object1, object2) {
	var i = array.length;
	while (i--) {
		if (array[i] === object1 || array[i] === object2) {
			return true;
		}
	}
	return false;
}

function createLinkAnalyse(box,project,tableName){
	console.log(project,tableName,332)
	$.ajax({
		async:true,//默认为true，即为异步请求
		type:'get',//post or get
		url: appUrl + 'linkAnalys/getLink?project=' + project +'&tableName=' + tableName,//***.action/method=**
		dataType:'jsonp',
		jsonp:'callback',
		beforeSend:function(request){
//			console.log(1);
		},
		success:function(data){
			geneLinkAnalyse(box,data);
			resetNodePosition();
		},
		error:function(data){
			console.log(data);
		}
	});
}

function resetNodePosition(){
//	vLevelLineObj = {};
//	for(var key in linkLineState){
//		var tbIds = key.split('='),
//			stcTable = tbIds[0],
//			destTable = tbIds[1];
//		
//	}
}

function geneLinkAnalyse(box,data){
	var rootNodes = data.rootTables;
	var linkLines = data.linkLine;
	
	$.each(rootNodes,function(index,rootNode){
		geneNode(box,rootNode)
	});
	
	$.each(linkLines,function(index,line){
		if(null == linkLineState[line.srcTable + '=' + line.destTable] || undefined == linkLineState[line.srcTable + '=' + line.destTable]){
			linkLineState[line.srcTable + '=' + line.destTable] = line.state;
//			console.log(line.srcTable + '   =   ' + line.destTable)
			// if('odps.data_process_prod.buf_pms20_scyw_t_sb_znyc_jgdy' == line.destTable){
			// 	console.log(nodeObj[line.destTable]);
			// }
			createLink(box,nodeObj[line.srcTable],nodeObj[line.destTable]);
		}
	});
}

function geneNode(box,nodeData){console.log(nodeData,'nodeData')
	var locationX = nodeData.hLevel  * 200 + 30,
		locationY = nodeData.vLevel  * 50  + 50;
	
	if(null == nodeObj[nodeData.tableName] || undefined == nodeObj[nodeData.tableName]){
		var node = createNode(box, locationX, locationY, nodeData.tableName, 'node');//icon_apple	wlmx
		nodeObj[nodeData.tableName] = node;
	}
	else{
//		nodeObj[nodeData.tableName].setLocation(locationX,locationY);
	}
	
	var children = nodeData.children;
	if(null != children && children.length > 0){
		$.each(children,function(index,child){
//			if(child.vLevel <=8){
				geneNode(box,child);
//			}else{
//				hideNodes.push(child);
//				hideLinks.push({
//					src:nodeData.tableName,
//					dest:child.tableName
//				});
//				if(9 == child.vLevel){
//					var moreBtnData = {
//							vLevel:9,
//							id:'moreBtn_' + child.hLevel,
//							tableName:'更多...',
//							hLevel:child.hLevel
//					};
//					var moreBtnNode = createMoreNode(box,moreBtnData, 'node');
//					createMoreLink(box,nodeObj[nodeData.tableName],moreBtnNode);
//				}
//			}
		});
	}
}

function createMoreLink(box, from, to,offset,pattern){
	var link = new twaver.Link(from, to);	
	if(offset){
		link.setClient('offset', offset);
	}
	link.setStyle('link.type', 'orthogonal.horizontal');
	link.setStyle('arrow.to', true);		
	link.setStyle('arrow.to.height', 6);
	link.setStyle('arrow.to.width', 8);
	link.setStyle('arrow.to.xoffset', -3);
	if(pattern){
		link.setStyle('link.pattern', pattern);
	}
	link.setLayerId('link');
	highlightLink(from,to,link, false);
	box.add(link);
}


function createMoreNode(box, moreBtnData,icon){
	var node = new twaver.Node();
	var x = (moreBtnData.hLevel > 0 ? (moreBtnData.hLevel - 1) : 0 ) * 200 + 30,
		y = (moreBtnData.vLevel > 0 ? (moreBtnData.vLevel - 1) : 0 ) * 50  + 50;
	
	node.setClient('width', 130);	
	node.setClient('height', 45);
	node.setClient('x', x);
	node.setClient('y', y);
	node.setClient('id',moreBtnData.id);
	node.setClient('hLevel',moreBtnData.hLevel);
	node.setClient('vLevel',moreBtnData.vLevel);
	node.setClient('hideFlag','true');

	if(x && y){
		node.setLocation(x, y);
	}
	
	node.setStyle('label.xoffset',35);
	node.setStyle('label.yoffset',25);
	node.setName(moreBtnData.tableName);
	
	if(icon){
		node.setClient('icon', icon);
		node.setStyle('icons.position','center');
		node.setStyle('icons.xoffset',10);
		node.setStyle('icons.yoffset',10);
	}
	box.add(node);		

	return node;
}

function createHideNodes(box,hLevel){
	$.each(hideNodes,function(index,nodeData){
		if(hLevel == nodeData.hLevel){
			geneMorChildNode(box,nodeData);
		}
	});
}

function geneMorChildNode(box,nodeData){
	var locationX = (nodeData.hLevel > 0 ? (nodeData.hLevel - 1) : 0 ) * 200 + 30,
		locationY = (nodeData.vLevel > 0 ? nodeData.vLevel : 0 ) * 50  + 50;

	var node = createNode(box, locationX, locationY, nodeData.tableName, 'node');//icon_apple	wlmx
	nodeObj[nodeData.tableName] = node;
	createHideLinks(box,nodeData.tableName);
	var children = nodeData.children;
	if(null != children && children.length > 0){
		$.each(children,function(index,child){
			geneNode(box,child);
			createLink(box,nodeObj[nodeData.tableName],nodeObj[child.tableName]);
		});
	}
}

function createHideLinks(box,destTableName){
	$.each(hideLinks,function(index,linkObj){
		if(linkObj['dest'] == destTableName){
			createLink(box,nodeObj[linkObj['src']],nodeObj[destTableName]);
		}
	})
}

function removeHideNodes(box,hLevel){
	$.each(hideNodes,function(index,nodeData){
		if(hLevel == nodeData.hLevel){
			box.forEach(function(data){
				if(data instanceof twaver.Node){
					if(data.getClient('id') == nodeData.tableName){
						box.remove(data);
					}
				}
				if(data instanceof twaver.Link){
					var from = data.getFromAgent(),
						to   = data.getToAgent();
					if(to.getClient('id') == nodeData.tableName){
						box.remove(data);
					}
				}
			});
		}
	});
	
}
export {init,destroy}