var dialog = {
	container: null,
	loading: function (callback) {
		$.modal.close();
		$.modal('<div style="z-index: 1002; position: fixed;" id="dialog-loading"><img alt="loading..." src="http://assets.game321.com/website/child/images/loading.gif"> Loading...</div>', {overlayId: 'dialog-overlay', containerId: 'loading-container', overlayClose: false});
		jQuery("#fairy_story_video").css('display', 'none');
	},
	alert: function (title, message, callback) {
		$.modal.close();
		$("#dialog-modal-title").html(title);
		$("#dialog-modal-message").html(message);
		$("#dialog-modal-buttons").html('<button class="simplemodal-close" onclick="show_hidden_video();">Close</button> <span>（Or Press Esc Key）</span>');
		$("#dialog-modal-content").modal({
			overlayId: 'dialog-overlay',
			containerId: 'dialog-container',
			closeHTML: null,
			minHeight: 80,
			opacity: 65, 
			position: ['0',],
			overlayClose: false,
			onOpen: dialog.open,
			onClose: function (d) {
				var self = this; // this = SimpleModal object
				d.container.animate(
					{top:"-" + (d.container.height() + 20)},
					200,
					function () {
						self.close(); // or $.modal.close();
						if(callback) callback(true);
					}
				);
			}
		});
		
	},
	confirm: function (title, message, callback, cancel, button) {
		$.modal.close();
		if (button == '') {
			button = 'Ok';
		}
		$("#dialog-modal-title").html(title);
		$("#dialog-modal-message").html(message);
		$("#dialog-modal-buttons").html('<button id="dialog-modal-ok">'+button+'</button> <button class="simplemodal-close">Cancel</button>');
		$("#dialog-modal-content").modal({
			overlayId: 'dialog-overlay',
			containerId: 'dialog-container',
			closeHTML: null,
			minHeight: 80,
			opacity: 65, 
			position: ['0',],
			overlayClose: false,
			onOpen: dialog.open,
			onClose: function (d) {
				var self = this; // this = SimpleModal object
				d.container.animate(
					{top:"-" + (d.container.height() + 20)},
					200,
					function () {
						self.close(); // or $.modal.close();
					}
				);
				if(cancel) cancel(true);
			}
		});

		$("#dialog-modal-ok").click(function(){
			$.modal.close();
			if(callback) callback(true);
		});
	},
	open: function (d) {
		var self = this;
		scroll(0,0);
		self.container = d.container[0];
		d.overlay.fadeIn('fast', function () {
			$("#dialog-modal-content", self.container).show();
			var title = $("#dialog-modal-title", self.container);
			title.show();
			d.container.slideDown('slow', function () {
				setTimeout(function () {
					var h = $("#dialog-modal-data", self.container).height()
						+ title.height()
						+ 20; // padding
					d.container.animate(
						{height: h}, 
						100,
						function () {
							$("#dialog-modal-content div.close", self.container).show();
							$("#dialog-modal-data", self.container).show();
						}
					);
				}, 20);
			});
		})
	},
	close: function (d) {
		var self = this; // this = SimpleModal object
		d.container.animate(
			{top:"-" + (d.container.height() + 20)},
			200,
			function () {
				self.close(); // or $.modal.close();
			}
		);
	}
};

$(document).ready(function(){
	var dialog_html  = '<div id="dialog-modal-content">';
		dialog_html += '<div id="dialog-modal-title"></div>';
		dialog_html += '<div class="close"><a href="#" class="simplemodal-close">x</a></div>';
		dialog_html += '<div id="dialog-modal-data">';
		dialog_html += '<p id="dialog-modal-message"></p>';
		dialog_html += '<div id="dialog-modal-buttons"></div>';
		dialog_html += '</div>';
		dialog_html += '</div>';
	$("body").append(dialog_html);
});