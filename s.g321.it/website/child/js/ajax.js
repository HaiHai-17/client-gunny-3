//åŒåŸŸåŒæ­¥ç™»é™†
/**
function ajax_submit()
{  	
    var url = "http://passport.game321.com/?mod=passport&file=index&method=is_login"; 
    var postData = "";
	var ajax = InitAjax();
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send(postData);
    ajax.onreadystatechange = function() 
    {
        if (ajax.readyState == 4 && ajax.status == 200) 
        {
    		alert(ajax.responseText);
			return false;
        } 
    } 
	

	return true;
}
function InitAjax() {
    var http_request = false;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    } if (!http_request) {
        alert('Cannot create an XMLHTTP instance');
        return false;
    }
    return http_request;
}
**/           
function ajax_login(){
	//å¾—åˆ°å½“å‰åœ°å€
	var client = new PHPRPC_Client('http://passport.game321.com/api/rpc_server.php', ['is_login']);
	client.is_login(function (result, args, output, warning) {  
		if(!result){
			document.getElementById("ul_logout").style.display = ""; 
			document.getElementById("login_status").style.display = "none"; 
			document.getElementById("ul_login").style.display = "none";         
		}else{
			document.getElementById("login_status").style.display = ""; 
			document.getElementById("username").innerHTML = result;
			document.getElementById("ul_login").style.display = "";     
			document.getElementById("ul_logout").style.display = "none"; 
		}
	}, true); 
}
function check_username(usernamereg){	
//	return usernamereg;
	//å¾—åˆ°å½“å‰åœ°å€	
	var client = new PHPRPC_Client('http://passport.game321.com/api/rpc_server.php',['check_username']);
	client.check_username(usernamereg,function (result, args, output, warning) {
		switch (result){
		case 1:
			document.getElementById("passportmsg").innerHTML = "Please enter a Passport ID, Passport ID can not be empty."; 
			document.getElementById("prompt01").className = 'ts_x_b';
			document.getElementById("passportmsg").style.color = '#F59173';
			break;
		case 2:
			document.getElementById("passportmsg").innerHTML = "Player account is not formatted correctly!";
			document.getElementById("prompt01").className = 'ts_x_b';
			document.getElementById("passportmsg").style.color = '#F59173';
			break;
		case 3:
			document.getElementById("passportmsg").innerHTML = "Player account is not formatted correctly!";
			document.getElementById("prompt01").className = 'ts_x_b';
			document.getElementById("passportmsg").style.color = '#F59173';
			break;
		case 4:
			document.getElementById("passportmsg").innerHTML = "Player account is not formatted correctly!";
			document.getElementById("prompt01").className = 'ts_x_b';
			document.getElementById("passportmsg").style.color = '#F59173';
			break;
		case 5:
			document.getElementById("passportmsg").innerHTML = "the passport "+usernamereg+" is already in use!";
			document.getElementById("prompt01").className = 'ts_x_b';
			document.getElementById("passportmsg").style.color = '#F59173';
			break;
		case 6:
			document.getElementById("passportmsg").innerHTML = "you can use the Passport ID!";
			document.getElementById("prompt01").className = 'ts_o_b';
			document.getElementById("passportmsg").style.color = '#14C50B';
			break;
		default:
			document.getElementById("passportmsg").innerHTML = "Please enter your passport ID, 4-14 characters are allowed."; 
			document.getElementById("passportmsg").style.color = '#7F7F00';
		}
		document.getElementById("checkusername").value = result;
	}, true); 
}
function check_email(email){
	//å¾—åˆ°å½“å‰åœ°å€
	var client = new PHPRPC_Client('http://passport.game321.com/api/rpc_server.php',['check_email']);
	client.check_email(email,function (result, args, output, warning) {
		switch (result){
		case 1:
			document.getElementById("emailmsg").innerHTML = 'E-mail address can not be empty.'; 
			document.getElementById("prompt04").className = 'ts_x_b';
			document.getElementById("emailmsg").style.color = '#F59173';
			break;
		case 2:
			document.getElementById("emailmsg").innerHTML = 'The email address you entered is wrong, please enter it again.';
			document.getElementById("prompt04").className = 'ts_x_b';
			document.getElementById("emailmsg").style.color = '#F59173';
			break;
		case 3:
			document.getElementById("emailmsg").innerHTML = 'Email already exists!';
			document.getElementById("prompt04").className = 'ts_x_b';
			document.getElementById("emailmsg").style.color = '#F59173';
			break;
		case 4:
			document.getElementById("emailmsg").innerHTML = "You can use the E-mail.";
			document.getElementById("prompt04").className = 'ts_o_b';
			document.getElementById("emailmsg").style.color = '#14C50B';
			break;
		}
		document.getElementById("emailmsg").style.height = "50px";
		document.getElementById("checkusermail").value = result;
	}); 
}