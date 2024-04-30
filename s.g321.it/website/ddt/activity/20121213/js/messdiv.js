function BOX_show_main(id, btn, on) {
	this.btn = btn;
	this.obj = document.getElementById(id);
	var oWidth = parseInt(this.getStyle(this.obj, 'width')) + parseInt(this.getStyle(this.obj, 'paddingLeft')) + parseInt(this.getStyle(this.obj, 'paddingRight'));
	var oHeight = parseInt(this.getStyle(this.obj, 'height')) + parseInt(this.getStyle(this.obj, 'paddingTop')) + parseInt(this.getStyle(this.obj, 'paddingBottom'));
	var oLeft = parseInt((document.documentElement.clientWidth - oWidth) / 2);
	var oTop = parseInt((document.documentElement.clientHeight - oHeight) / 2) + document.documentElement.scrollTop;
	this.start(on).animate(this.bg, {
		height : oHeight,
		width : oWidth,
		left : oLeft,
		top : oTop
	});
}
BOX_show_main.prototype = {
	getStyle : function(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj,false)[attr];
		};
	},
	start : function(on) {
		this.obj.style.position = 'absolute';
		this.obj.style.zIndex = '999';
		this.oDiv = document.createElement('div');
		this.oDiv.id = 'BOX_overlay';
		this.position(this.oDiv);
		document.body.appendChild(this.oDiv);
		this.bg = document.createElement('div');
		this.bg.className = this.obj.className;
		this.bg.style.width = '0px';
		this.bg.style.height = '0px';
		document.body.appendChild(this.bg);
		this.bg.style.display = 'block';
		this.bg.style.position = 'absolute';
		this.bg.style.left = this.alloffset(this.btn, 'offsetLeft') + 'px';
		this.bg.style.top = this.alloffset(this.btn, 'offsetTop') + 'px';
		this.bg.style.zIndex = '998';
		var _this = this;
		window.onresize = function() {
			_this.position(document.getElementById('BOX_overlay'));
			_this.obj.style.top = MparseInt((document.documentElement.clientHeight - _this.obj.offsetHeight) / 2) + document.documentElement.scrollTop + 'px';
			_this.obj.style.left = (document.documentElement.clientWidth - _this.obj.offsetWidth) / 2 + 'px';
		};
		if (on) {
			window.onscroll = function() {
				_this.move();
			}
		};
		return this;
	},
	animate : function(obj, json) {
		var _this = this;
		clearInterval(obj.timer);
		var x = 0;
		var opac = true;
		if ( typeof this.oDiv.style.opacity == 'undefined') {
			this.oDiv.style.filter = 'alpha(opacity=80)';
			opac = false;
		}
		obj.timer = setInterval(function() {
			var stop = true;
			for (var attr in json) {
				var iCur = 0;
				iCur = parseInt(obj.style[attr]);
				var iSpeed = (json[attr] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if (iCur != json[attr]) {
					stop = false;
				}
				obj.style[attr] = iCur + iSpeed + 'px';
			};
			if (opac && x <= 80) {
				_this.oDiv.style.opacity = x / 100;
				x += 10;
			}
			if (stop) {
				clearInterval(obj.timer);
				_this.obj.style.left = json.left + 'px';
				_this.obj.style.top = json.top + 'px';
				_this.obj.style.display = 'block';
				document.body.removeChild(obj);
//				_this.oDiv.onclick = function() {
//					_this.end();
//				};
				var clo = _this.obj.getElementsByTagName("a");
				for (var i = 0; i < clo.length; i++) {
					if (clo[i].className == 'clo') {
						clo = clo[i];
						break;
					}
				};
				clo.onclick = function() {
					_this.end();
				};
				document.onkeyup = function(event) {
					var evt = window.event || event;
					var code = evt.keyCode ? evt.keyCode : evt.which;
					if (code == 27) {
						_this.end();
					}
				};
			};
		}, 20)
	},
	position : function(obj) {
		var hei = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
		obj.style.height = hei + "px";
		obj.style.width = document.documentElement.clientWidth + "px";
	},
	end : function() {
		this.obj.style.display = 'none';
		document.body.removeChild(document.getElementById('BOX_overlay'));
		document.onkeyup = null;
		window.onresize = null;
		window.onscroll = null;
	},
	move : function() {
		this.obj.style.position = 'fixed';
		window.onscroll = null;
	},
	alloffset : function(obj, attr) {
		var i = 0;
		while (obj.tagName.toUpperCase() != 'BODY') {
			i += obj[attr];
			obj = obj.parentNode;
		}
		return i;
	}
}

function BOX_show2(id) {
	return new BOX_show_main(id, this, false);
	//true为随屏滚动,false为不随屏滚动
}

/*不支持IE6*/
/*弹窗ID和style属性中禁止写入样式*/
/*关闭按钮样式一律为clo,且一个弹窗只能对应一个*/
/*在HTML中直接使用必须为BOX_show.call(this,ID)格式,其中ID为弹出层ID*/