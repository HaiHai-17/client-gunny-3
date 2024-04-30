function setCookie(c_name, value, expiredays) {//设置cookies函数
	var exdate = new Date();
	var domain = '.game321.com';
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value)
			+ ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()+ ";path=/;domain=" + domain);
}

function getCookie(c_name)// 读取称为c_name的cookies函数
{
	var arr = document.cookie.match(new RegExp("(^| )" + c_name
			+ "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;
}

function delCookie(c_name) {  //删除名称为c_name的Cookie 
    var exp = new Date();   
    exp.setTime (exp.getTime() - 1);   
    var cval = getCookie(c_name);   
    document.cookie = c_name + "=" + cval + "; expires=" + exp.toGMTString(); 
}  

function checkCookie() {//注册设置表单
	if(getCookie('utm_source') != null && getCookie('utm_source') != ''){
		document.form.utm_source.value = getCookie('utm_source');
		document.form.from_url.value = getCookie('from_url');
	}
}

function setAdInfo() {//设置广告信息
	var url = document.referrer;
	var utm_source, from_url;
	if(getParameter('utm_source') != null && getParameter('utm_source') !=''){
		delCookie('utm_source');
		delCookie('from_url');
		setCookie('utm_source',getParameter('utm_source'), 3600);
		setCookie('from_url',url, 3600);
	}
	// var b = getCookie(utm_source);
	// alert(b);

}
function delAdInfo(){//删除广告信息
	delCookie('utm_source');
	delCookie('from_url');
}
function getParameter(varName) {//得到广告链接的来源get参数
	var query = location.search;
	if (query != null || query != "") {
		query = query.replace(/^\?+/, "");
		var qArray = query.split("&");
		var len = qArray.length;
		if (len > 0) {
			for ( var i = 0; i < len; i++) {
				var sArray = qArray[i].split("=", 2);
				if (sArray[0] && sArray[1] && sArray[0] == varName) {
					return unescape(sArray[1]);
				}
			}
		}
	}
	return null;
}
