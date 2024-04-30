$(document).ready(function(){

	$("#red").treeview({
		animated: "fast",
		collapsed: true,
		unique: true,

		toggle: function() {
			window.console && console.log("%o was toggled", this);
		}
	});


var _leftheight = $(".treeview-red").height();
var _rightheight = $(".post").height();

$(".treeview-red li:has('ul')").click(function(){

if(_leftheight > _rightheight ) {
$(".post").height( _leftheight + 300);
}

else {
$(".post").height(_rightheight + 600);
}

	});

});