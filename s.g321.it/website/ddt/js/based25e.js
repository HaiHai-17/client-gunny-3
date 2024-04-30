$(function(){
	//// Scrollable
	$("#scrollable-1-trigger").switchable("#scrollable-1-panel > ul > li", {
		effect: "scroll",
		steps: 4,
		visible: 4
	}).carousel();
	$("#scrollable-2-trigger").switchable("#scrollable-2-panel > ul > li", {
		effect: "scroll",
		steps: 4,
		visible: 4
	}).carousel();
	$("#scrollable-3-trigger").switchable("#scrollable-3-panel > ul > li", {
		effect: "scroll",
		steps: 4,
		visible: 4
	}).carousel();
	$(".prev").click(function(){
        $(this).prev().switchable().prev();
        return false;
    });
    $(".next").click(function(){
    $(this).prev().prev().switchable().next();
        return false;
    });	
	// Tabs
	$(".tabs-2-trigger").switchable(".tabs-2-panel", { triggers: "li" });
		
	$.fn.Slide=function(options){
		var opts = $.extend({},$.fn.Slide.deflunt,options);
		var index=1;
		var targetLi = $("." + opts.claNav + " li", $(this));
		var clickNext = $("." + opts.claNav + " .next", $(this));
		var clickPrev = $("." + opts.claNav + " .prev", $(this));
		var ContentBox = $("." + opts.claCon , $(this));
		var ContentBoxNum=ContentBox.children().size();
		var slideH=ContentBox.children().first().height();
		var slideW=ContentBox.children().first().width();
		var autoPlay;
		var slideWH;
		if(opts.effect=="scroolY"||opts.effect=="scroolTxt"){
			slideWH=slideH;
		}else if(opts.effect=="scroolX"||opts.effect=="scroolLoop"){
			ContentBox.css("width",ContentBoxNum*slideW);
			slideWH=slideW;
		}else if(opts.effect=="fade"){
			ContentBox.children().first().css("z-index","1");
		}
		
		return this.each(function() {
			var $this=$(this);
			//Scroll
			var doPlay=function(){
				$.fn.Slide.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);
				index++;
				if (index*opts.steps >= ContentBoxNum) {
					index = 0;
				}
			};
			clickNext.click(function(event){
				$.fn.Slide.effectLoop.scroolLeft(ContentBox, targetLi, index, slideWH, opts,function(){
					for(var i=0;i<opts.steps;i++){
	                    ContentBox.find("li:first",$this).appendTo(ContentBox);
	                }
	                ContentBox.css({"left":"0"});
				});
				event.preventDefault();
			});
			clickPrev.click(function(event){
				for(var i=0;i<opts.steps;i++){
	                ContentBox.find("li:last").prependTo(ContentBox);
	            }
	          	ContentBox.css({"left":-index*opts.steps*slideW});
				$.fn.Slide.effectLoop.scroolRight(ContentBox, targetLi, index, slideWH, opts);
				event.preventDefault();
			});
			//Autoplay
			if (opts.autoPlay) {
				autoPlay = setInterval(doPlay, opts.timer);
				ContentBox.hover(function(){
					if(autoPlay){
						clearInterval(autoPlay);
					}
				},function(){
					if(autoPlay){
						clearInterval(autoPlay);
					}
					autoPlay=setInterval(doPlay, opts.timer);
				});
			}
			
			//Target Event
			targetLi.hover(function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				index=targetLi.index(this);
				window.setTimeout(function(){$.fn.Slide.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);},200);
				
			},function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			});
    	});
	};
	$.fn.Slide.deflunt={
		effect : "scroolY",
		autoPlay:true,
		speed : "normal",
		timer : 1000,
		defIndex : 0,
		claNav:"JQ-slide-nav",
		claCon:"JQ-slide-content",
		steps:1
	};
	$.fn.Slide.effectLoop={
		scroolLeft:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		
		scroolRight:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":0},opts.speed,callback);
			
		}
	}
	$.fn.Slide.effect={
		fade:function(contentObj,navObj,i,slideW,opts){
			contentObj.children().eq(i).stop().animate({opacity:1},opts.speed).css({"z-index": "1"}).siblings().animate({opacity: 0},opts.speed).css({"z-index":"0"});
			navObj.eq(i).addClass("on").siblings().removeClass("on");
		},
		scroolTxt:function(contentObj,undefined,i,slideH,opts){
			//alert(i*opts.steps*slideH);
			contentObj.animate({"margin-top":-opts.steps*slideH},opts.speed,function(){
                for( var j=0;j<opts.steps;j++){
                	contentObj.find("li:first").appendTo(contentObj);
                }
                contentObj.css({"margin-top":"0"});
            });
		},
		scroolX:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		scroolY:function(contentObj,navObj,i,slideH,opts){
			contentObj.stop().animate({"top":-i*opts.steps*slideH},opts.speed);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		}
	};

	$("#content-flow").Slide({
		effect : "scroolTxt",
    	speed : "normal",
		timer : 3000,
		steps:1
	});
	
	$("#slide_box").Slide({
	    effect : "scroolY",
	    speed : "normal",
	    timer : 3000
	});
	
	$(function(){
		$("#main_menu > li").DMenu("#sub_nav");
	});

    $(".tab").hide();
	$(".tab:first").show();
	$("#select").change(function() {
		//var index = $(this).children(":selected").index();
		//$("#data").children().hide().eq(index).show();
	    var index =  $(this).attr('selectedIndex');
	    $("#data").children('').hide().eq(index).show();
	});
	$(".ad ul li:last").addClass("nomargin");
	
	//菜单Open
	if(window.location.href.indexOf('http://ddt.game321.com/guides/newbie_guide/') === 0){
		$('.n_newbie').parent().parent().addClass('open');
	}
	else if(window.location.href.indexOf('http://ddt.game321.com/guides/') === 0){
		$('.n_guide').parent().parent().addClass('open');
	}
});
	
function popUp(URL) {
	day = new Date();
	id = day.getTime();
	eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=600,height=500,left = 500,top = 200');");
}



