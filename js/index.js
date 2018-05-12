// index
$(function(){
	var liNum = 5*5*5;//暂时定为125
	init();
	function init(){
		for(var i=0;i<liNum;i++){
		var $li = $('<li></li>');//$('<li></li>')->创建一个li节点，把这个节点变成jq对象  var oLi = document.createElement('li');$li = $(oLi);
		var x =(Math.random()-0.5)*5000;//Math.random() [0,1]
		var y =(Math.random()-0.5)*5000;//Math.random() [0,1]
		var z =(Math.random()-0.5)*5000;//Math.random() [0,1]
		$li.css({
			'transform':'translate3d('+x+'px,'+y+'px,'+z+'px)',
		});
		$('#main').append($li);
	}
	setTimeout(function(){
		$('#btn').css({
			transform: 'scale(1)',
			opacity: 1,
			transition: '2s ease-in-out'
		});
		Grid();
	},300);
	$('#btn li').each(function(i){
		$(this).click(function(){
			var index = $(this).index();
			switch(index) {
				case 0:

				break;
				case 1:
				Sphere();
				break;
				case 2:
				Helix();
				break;
				case 3:
				Grid();
				break;
			}
		});
		// $('#btn').css({
		// 	transform: 'scale(1)',
		// 	opacity: 1,
		// 	transition: '2s ease-in-out'
		// });
	});
}	
function Grid(){
		var tX = 500,tY = 500,tZ = 800;//水平 垂直间隔
		var firstX = -2*tX;//第一个li水平偏移距离
		var firstY = -2*tY;//第一个li垂直偏移距离
		var firstZ = -2*tZ;;//第一个li z轴偏移距离
		$('#main li').each(function(i){
			var iX = (i%25)%5;//x方向，要增加的倍数
			var iY = parseInt((i%25)/5);//y方向，要增加的倍数
			var iZ = parseInt(i/25);//z方向，要增加的倍数
			$(this).css({
				'transform':'translate3d('+(firstX+iX*tX)+'px,'+(firstY+iY*tY)+'px,'+(firstZ+iZ*tZ)+'px)',
				'transition':'4s ease-in-out'
			});
		});
	}
	function Helix(){
		var roY = 10,tY = 10;
		var midLi = Math.floor($('#main li').length/2);//除不尽向下取整
		var firstY = -10*midLi;
		$('#main li').each(function(i){
			$(this).css({
				'transform':'rotateY('+10*i+'deg) translateY('+(firstY+tY*i)+'px) translateZ(1000px) '
			});
		});
	}
	function Sphere(){
		/*
		var tZ = 800;
		var firstRox = 0;
		var firstRoy = 0;
		var roX = 360/17,roY = 360/(liNum/18);
		$('#main li').each(function(i){
			var iY = Math.floor(i/18);
			$(this).html('fly');
			var z = 0;
			var x = (firstRox+i*roX)%360;
			if(x>90 && x<270){
				z = 180;
			}
			$(this).css({
				'transform':'rotateY('+((firstRoy+iY*roY)%360)+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ('+tZ+'px) '
			});
		});
		*/
		var len = 5,arr =[],roX;
		// for(var x=0;x<10000;x++){
		// 	var a = x*x+(x-1)*(x-1);
		// 	if(a>=125){
		// 		len = x;
		// 		break;
		// 	}
		// }
		for(var x=0;x<1000;x++){
			if((7*i+4)/2>=125){
				c = i;
				break;
			}
		}
		for(var i=1;i<=2*len;i++){
			if(i<=len){
				arr.push(2*i-1);
			}else{
				arr.push(2*(2*len-i)-1);
			}
		}
		var roX = 360/arr.length;
		var firstRox = 90;
		$('#main li').each(function(index){
			var sum = 0;
			var ceng ,ge;
			for(var i=0;i<arr.length;i++){
				sum+=arr[i];
				if(sum>=index+1){
					ceng = i;
					ge = arr[i]-(sum - index);
					break;
				}
			}
			var roY = 360/arr[ceng];
			var y = ge;
			var x = ceng%2?firstRox+ceng*roX:firstRox-ceng*roX;
			var z;
			if(x>90&&x<270){
				z = 180;
			}
			$(this).css({
				'transform':'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ(0deg) translateZ(800px)'
			});
		});

	}


	//拖拽滚轮
	(function(){
		var nowX,lastX,minusX = 0,nowY,lastY,minusY = 0;
		var roY = 0,roX = 0,tZ = -2000;
		var timer1,timer2;
		$(document).mousedown(function(ev){
			ev = ev || window.event;
			lastX = ev.clientX;
			lastY = ev.clientY;
			clearInterval(timer1);
			$(this).on('mousemove',function(ev){
				ev = ev || window.event;
				nowY = ev.clientY;
				nowX = ev.clientX;
				minusX = nowX - lastX;//两者差值
				minusY = nowY - lastY;//两者差值
				roY += minusX*0.2;
				roX -= minusY*0.2;
				$('#main').css({
					'transform':'translateZ('+tZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
				});
				lastX = nowX;//存放前一点的坐标
				lastY = nowY;//存放前一点的坐标
				
			});
			return false;
		}).mouseup(function(event) {
			$(this).off('mousemove');
			timer1 = setInterval(function(){
				minusX *= 0.9;
				minusY *= 0.9;
				if(Math.abs(minusX)<0.5 &&Math.abs(minusY)<0.5){
					clearInterval(timer1);
				}
				roY =+ minusX*0.2;
				roX =- minusY*0.2;
				$('#main').css({
					'transform':'translateZ('+tZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
				});
			},13);

		}).mousewheel(function(e,d){//滚轮事件
			// var d = arguments[1]; //实参的几何
			// console.log(d);
			tZ += d*50;
			tZ = Math.min(0,tZ);
			tZ = Math.max(-8000,tZ);
			$('#main').css({
				'transform':'translateZ('+tZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
			});
			timer2 = setInterval(function(){
				d *= 0.8;
				tZ += d*50;
				if(Math.abs(minusX)<0.01){
					clearInterval(timer2);
				}				
				tZ = Math.min(0,tZ);
				tZ = Math.max(-8000,tZ);
				$('#main').css({
					'transform':'translateZ('+tZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
				});

			},13);
		});
	})()




});