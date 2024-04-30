jQuery.fn.DMenu=function(showobj,timeout,speed){
	timeout=timeout?timeout:300;
	speed=speed?speed:200;
	var button=$(this);
	var timer=null;
	var hideDiv=$("<div></div>");
	var Conbox=$("<div id=\"Conbox\"></div>");
	Conbox.hide();
	hideDiv.append(Conbox);
	var jqShowObj=$(showobj);
	jqShowObj.hide();
	var display=false;
	var offset=button.offset();
	var height=jqShowObj.height();
	var width=jqShowObj.width();
	var btnHeight=button.height();
	var btnWidth=button.width();
	$(document.body).prepend(hideDiv);
	//Conbox.append(jqShowObj);

	var showMenu=function(){
		if (display)
		{
			return false;
		}
		Conbox.css({
			margin:"0 auto",
			width:btnWidth+"px",
			height:btnHeight+"px"
		});
		hideDiv.css({
			position:"absolute",
			top:'210'+"px",
			left:($(window).width() - width)/2+"px",
			height:height+"px",
			width:width+"px"
		}).fadeIn();
		Conbox.css({
		});
		Conbox.animate({
			marginTop:btnHeight+4,
			height:height+4,
			width:width+4,
			opacity:'100'},speed,function(){
			jqShowObj.fadeIn();
			Conbox.append(jqShowObj);
			Conbox.css({
				border:"0px"
			});
			display=true;
			jqShowObj.mouseover(function(){
					clearTimeout(timer); 
			});
			jqShowObj.mouseout(function(){
				hideMenu();
			});
		});
	};
	var hideMenu=function(){
		clearTimeout(timer); 
		timer=setTimeout(function(){
		Conbox.css({
			
		});
		Conbox.empty();
		Conbox.animate({
			  width:btnWidth,height:btnHeight,marginTop:'0', opacity: '0'
			}, speed,function(){
			Conbox.fadeOut();
			hideDiv.fadeOut();
			display=false;
		});
		}, timeout); 
	};

	button.hover(function(e){
		clearTimeout(timer); 
		timer=setTimeout(function(){
			showMenu();
		}, timeout); 
	},function(){
		clearTimeout(timer); 
		if(display){
			timer=setTimeout(function(){
				hideMenu();
			},timeout);
		}
	});
};