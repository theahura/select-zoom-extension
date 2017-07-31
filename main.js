(function() {

	var enabled = true;
	var maxLen = 60;

	function getSelectionText() {
		var text = "";
		var activeEl = document.activeElement;
		var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
		if (
			(activeElTagName == "textarea") || (activeElTagName == "input" &&
				/^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
			(typeof activeEl.selectionStart == "number")
		) {
			text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
		} else if (window.getSelection) {
			text = window.getSelection().toString();
		}
		return text;
	}

	$('body').append('<div id="selectZoomHover"></div>');
	$('#selectZoomHover').css('background-color', 'rgba(66, 134, 244, 0.9)');

	chrome.runtime.onMessage.addListener(function(request, sender) { 
		if (request.action && request.action === 'toggle') {
			if (enabled) 
				alert("Disabled vision zoom.");
			else 
				alert("Enabled vision zoom.");

			$('#selectZoomHover').toggle();
			enabled = !enabled;
		}
	});

	document.onmouseup = document.onkeyup = document.onselectionchange = function() {
		var selectedText = getSelectionText();
		if (selectedText) {
			if (selectedText.length > maxLen)
				selectedText = selectedText.substr(selectedText.length - maxLen);
			$('#selectZoomHover').html(selectedText);
			if (enabled)
				$('#selectZoomHover').show();
		} else {
			$('#selectZoomHover').hide();
		}
	};

})();
