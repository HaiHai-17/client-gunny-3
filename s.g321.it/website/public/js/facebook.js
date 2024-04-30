$(function(){
	$("#fb-button, #google-button, #yahoo-button").click(function(){		
		if($(this).attr('id') == 'fb-button'){
			var oauthUrl = "http://passport.game321.com/?mod=passport&file=index&method=facebook_login";
		}
		else if($(this).attr('id') == 'google-button'){
			var oauthUrl = "http://passport.game321.com/?mod=passport&file=index&method=google_login";
		}
		else if($(this).attr('id') == 'yahoo-button'){
			var oauthUrl = "http://passport.game321.com/?mod=passport&file=index&method=yahoo_login";
		}
		var Oauth_Window = window.open(oauthUrl,  'newwindow', 'height=400, width=700, top=' +(screen.height-400)/2+ ', left=' +(screen.width-700)/2+ ', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=yes, status=no');
		
		var oauth_callback_value = 1;
		window.onfocus = function () {
			if(oauth_callback_value){
				$.getJSON("http://passport.game321.com/?mod=passport&file=index&method=facebook_login&get_oauth_msg=json&jsoncallback=?", function(json){				
					if(json.title && json.msg) dialog.alert(json.title, json.msg, function(){ ajax_login(); oauth_callback_value = 0; });

				});	
			}
		}				
		
	});	
});